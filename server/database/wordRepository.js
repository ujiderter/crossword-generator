import { createConnection } from 'typeorm';
import { dbConfig } from '../config/database.js';
import { Word } from '../entities/Word.js';

const initialWords = [
    "javascript", "html", "css", "node", "express", "react",
    "angular", "vue", "database", "server", "client", "api",
    "json", "npm", "git", "github", "algorithm", "function",
    "variable", "object"
];

export async function initializeDatabase() {
    try {
        const connection = await createConnection(dbConfig);
        const wordRepository = connection.getRepository(Word);
        
        const wordCount = await wordRepository.count();
        if (wordCount === 0) {
            const wordEntities = initialWords.map(word => {
                const wordEntity = new Word();
                wordEntity.value = word;
                return wordEntity;
            });
            await wordRepository.save(wordEntities);
        }
        
        return wordRepository;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

export async function getRandomWords(size, limit = 10) {
    const wordRepository = await initializeDatabase();
    return wordRepository
        .createQueryBuilder('word')
        .where('LENGTH(word.value) <= :size', { size })
        .orderBy('RANDOM()')
        .limit(limit)
        .getMany();
}