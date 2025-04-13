import express from 'express';
import { getRandomWords } from '../database/wordRepository.js';
import { createUser, findUserById } from '../database/userRepository.js';
import { saveCrossword, getCrosswordsByUser } from '../database/crosswordRepository.js';
import { generateSimpleCrossword } from '../utils/crosswordGenerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { size = 10, username, email } = req.body;

        let user = await findUserById(1); // For demo, using userId 1; in production, use auth
        if (!user) {
            user = await createUser(username || 'default_user', email || 'user@example.com');
        }

        const words = await getRandomWords(size);
        const crosswordData = generateSimpleCrossword(
            words.map(w => w.value),
            size
        );

        const savedCrossword = await saveCrossword(crosswordData, size, user);

        res.json({
            id: savedCrossword.id,
            grid: savedCrossword.grid,
            words: savedCrossword.words,
            size: savedCrossword.size,
            userId: user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate crossword' });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const crosswords = await getCrosswordsByUser(parseInt(userId));
        res.json(crosswords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch crosswords' });
    }
});

export default router;