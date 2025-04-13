import express from 'express';
import cors from 'cors';
import crosswordRouter from './routes/crossword.js';
import { initializeDatabase } from './database/wordRepository.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/crossword', crosswordRouter);

async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();