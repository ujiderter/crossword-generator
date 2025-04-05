const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const wordsPath = path.join(__dirname, 'words.json');
const wordsData = JSON.parse(fs.readFileSync(wordsPath, 'utf8'));

app.get('/api/crossword', (req, res) => {
    const size = parseInt(req.query.size) || 10;
    const words = wordsData.words
        .filter(word => word.length <= size)
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
    const crossword = generateSimpleCrossword(words, size);
    res.json(crossword);
});

function generateSimpleCrossword(words, size) {
    const grid = Array(size).fill().map(() => Array(size).fill(''));
    const placedWords = [];
    
    words.forEach((word, i) => {
        if (i % 2 === 0 && word.length <= size) {
            // Горизонтальное слово
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * (size - word.length));
            for (let j = 0; j < word.length; j++) {
                grid[row][col + j] = word[j].toUpperCase();
            }
            placedWords.push({
                word: word,
                row: row,
                col: col,
                direction: 'across'
            });
        } else if (word.length <= size) {
            // Вертикальное слово
            const row = Math.floor(Math.random() * (size - word.length));
            const col = Math.floor(Math.random() * size);
            for (let j = 0; j < word.length; j++) {
                grid[row + j][col] = word[j].toUpperCase();
            }
            placedWords.push({
                word: word,
                row: row,
                col: col,
                direction: 'down'
            });
        }
    });
    
    return {
        grid: grid,
        words: placedWords
    };
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});