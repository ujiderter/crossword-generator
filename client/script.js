document.getElementById('generate').addEventListener('click', generateCrossword);

async function generateCrossword() {
    const size = document.getElementById('size').value;
    const response = await fetch(`http://localhost:3000/api/crossword?size=${size}`);
    const data = await response.json();
    
    renderCrossword(data.grid);
    renderWordList(data.words);
}

function renderCrossword(grid) {
    const container = document.getElementById('crossword');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${grid.length}, 32px)`;
    
    grid.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell) {
                cellElement.textContent = cell;
            } else {
                cellElement.classList.add('filled');
            }
            container.appendChild(cellElement);
        });
    });
}

function renderWordList(words) {
    const container = document.getElementById('word-list');
    container.innerHTML = '<h3>Words:</h3>';
    
    const acrossWords = words.filter(word => word.direction === 'across');
    const downWords = words.filter(word => word.direction === 'down');
    
    if (acrossWords.length > 0) {
        const acrossList = document.createElement('div');
        acrossList.innerHTML = '<h4>Across:</h4><ul>' + 
            acrossWords.map(word => `<li>${word.word}</li>`).join('') + '</ul>';
        container.appendChild(acrossList);
    }
    
    if (downWords.length > 0) {
        const downList = document.createElement('div');
        downList.innerHTML = '<h4>Down:</h4><ul>' + 
            downWords.map(word => `<li>${word.word}</li>`).join('') + '</ul>';
        container.appendChild(downList);
    }
}