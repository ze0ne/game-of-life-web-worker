function nextGeneration(grid, rows, cols) {
    const newGrid = grid.map(arr => [...arr]);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let liveNeighbors = 0;

            // Compte les voisins vivants
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const newRow = r + i;
                    const newCol = c + j;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        liveNeighbors += grid[newRow][newCol];
                    }
                }
            }

            // Appliquer les règles du jeu
            if (grid[r][c] === 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newGrid[r][c] = 0;
                }
            } else {
                if (liveNeighbors === 3) {
                    newGrid[r][c] = 1;
                }
            }
        }
    }

    return newGrid;
}

onmessage = function (e) {
    const { grid, rows, cols } = e.data;
    const newGrid = nextGeneration(grid, rows, cols);
    postMessage(newGrid);
};

