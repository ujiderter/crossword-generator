export function generateSimpleCrossword(words, size) {
    const grid = Array(size).fill().map(() => Array(size).fill(''));
    const placedWords = [];
    
    words.forEach((word, i) => {
        if (i % 2 === 0 && word.length <= size) {
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