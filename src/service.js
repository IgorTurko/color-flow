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
        let queue = [...tiles];
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

    getSiblings(tiles) {
        const siblings = [];

        for(const tile of tiles) {
            for(const move of this.movements()) {
                const row = tile.row + move[0];
                const column = tile.column + move[1]; 
                
                if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) {
                    const sibling = this.getTile(row, column);
                    if (!this.contains(siblings, sibling)) {
                        siblings.push(sibling);
                    }
                }
            }
        }

        return siblings;
    }

    nextMoves(tiles) {
        const steps = [];        

        for(const tile of tiles) {
            const pretenders = this.getSiblings([tile]);
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

    getBestSolution() {
        const example = new Board(this.rows, this.columns, this.colors);
        example.tiles = this.tiles.map(x => new Tile(x.row, x.column, x.color));

        const tile = example.getTile(0, 0);
        tile.setAsVisited();
        let visited = example.getVisited();
        let step = 0;

        do {
            const siblings = example.getSiblings(visited);  
            let bestArea = [];
            let bestSibling = {};
            for(const sibling of siblings) {
                if (sibling.isVisited()) {
                    continue;
                }
                const area = example.getAreaByColor([...visited, sibling], sibling.color);

                if (area && area.length > bestArea.length) {
                    bestArea = area;
                    bestSibling = sibling;
                }
            }

            for(const tile of bestArea) {
                tile.setAsVisited();
                tile.setColor(bestSibling.color);
            }

            visited = example.getVisited();
            step++;            
        }
        while (visited.length < example.rows * example.columns)

        return step;
    }
}