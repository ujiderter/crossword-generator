import { createConnection } from 'typeorm';
import { dbConfig } from '../config/database.js';
import { Crossword } from '../entities/Crossword.js';

export async function initializeCrosswordRepository() {
    try {
        const connection = await createConnection(dbConfig);
        return connection.getRepository(Crossword);
    } catch (error) {
        console.error('Crossword repository initialization error:', error);
        throw error;
    }
}

export async function saveCrossword(crosswordData, size, user) {
    const crosswordRepository = await initializeCrosswordRepository();
    const crossword = new Crossword();
    crossword.grid = crosswordData.grid;
    crossword.words = crosswordData.words;
    crossword.size = size;
    crossword.user = user;
    return await crosswordRepository.save(crossword);
}

export async function getCrosswordsByUser(userId) {
    const crosswordRepository = await initializeCrosswordRepository();
    return await crosswordRepository.find({ where: { user: { id: userId } } });
}