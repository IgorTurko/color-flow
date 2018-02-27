export class Tile {
    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.visited = false;
    }
    
    isVisited() {
        return this.visited;
    }

    setAsVisited() {
        this.visited = true;
    }

    setColor(color) {
        this.color = color;
    }
}

export class Board {
    constructor(rows, columns, colors) {
        this.rows = rows;
        this.columns = columns;
        this.colors = colors;
        this.tiles = this.generateTiles();
    }

    getTiles() {
        return this.tiles;
    }

    getTile(row, column) {
        for(const tile of this.tiles) {
            if (tile.row === row && tile.column === column) {
                return tile;
            }
        }

        return null
    }

    getVisited() {
        return this.tiles.filter(x => x.isVisited());
    }

    contains(tiles, tile) {
        const wrap = {
            tiles
        };

        return this.getTile.call(wrap, tile.row, tile.column);
    }

    movements() {
        return [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];
    }

    getAreaByColor(tiles, color) {
        let area = [];
        let queue = tiles.slice();
        let step = null;

        while((step = queue.pop()) !== undefined) {
            area.push(step);
            const moves = this.nextMoves([step]);
            for (const next of moves) {
                if (next.color === color && !this.contains(area, next)) {
                    queue.push(next);
                }
            }
        }
        return area;
    }

    nextMoves(tiles) {
        let steps = [];

        const fn = (tile) => {
            for(const move of this.movements()) {
                const row = tile.row + move[0];
                const column = tile.column + move[1]; 
                
                if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
                    steps.push(this.getTile(row, column));
                }
            }

            return steps;
        }

        for(const tile of tiles) {
            const pretenders = fn(tile);
            for (const pretender of pretenders) {
                if (!this.contains(steps, pretender)) {
                    steps.push(pretender);
                }
            }
        }

        return steps;
    }

    generateTiles() {
        let tiles = [];
        for(let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                tiles.push(new Tile(i, j, this.generateColor()));       
            }
        }

        return tiles;
    }

    generateColor(){
        return Math.floor(Math.random() * this.colors);
    }
}

// const field = new Field(4, 3, 2);
// const cell = field.getCell(0, 0);
// let bestArea = [];
// let visited = [cell];
// console.log(field.getCells());

// for(const step of field.getAvailableSteps(cell)) {
//     if (step.color !== cell.color) {
//         const area = field.getAreaByColor(step, step.color);
//         if (bestArea.length < area.length) {
//             bestArea = area;
//         }
//     }
// }


// for(let cell of bestArea) {
//     cell.color = cell.color;
// }


// //field.drawField();
// console.log(bestArea);