export default class Pang {
    constructor(boardSize) {
        this._boardSize = boardSize;
        this.board = Array(boardSize**2).fill(false);
        this.checkedItems = [];
        this.leaderItems = [];
        this.groupObject = {};
        this.maxGroupSize = 0;
    }
    
    get boardSize() {
        return this._boardSize;
    }

    set boardSize(num) {
        this._boardSize = num;
        this.board = Array(num**2).fill(false);
    }

    // Reset board empty
    createEmptyBoard(boardSize) {
        this.board = Array(boardSize**2).fill(false);
    }
    
    // Reset the board randomly
    createRandomBoard() {
        this.board = this.board.map((elem) => {
            return elem = Math.random() > 0.6;
        });
        this.calculateBoardLogic();
    }

    calculateBoardLogic() {
        // Reset objects for the case of restart
        this.checkedItems = [];
        this.leaderItems = Array(this.boardSize**2).fill(-1);
        this.groupObject = {};

        for (let i=0; i<this.boardSize**2; i++) {
            this.checkNeighbors(-1, i);
        }
        this.findMaxGroupSize();
    }

    // At first, calculate the group of balloons
    checkNeighbors(leader, target) {
        if (this.checkedItems.includes(target) || target < 0 || target >= this.boardSize**2 ) {
            return;
        } else {
            this.checkedItems.push(target);
            if (this.board[target]) {
                let newLeader = leader;
                if (leader !== -1) {
                    this.groupObject[leader].push(target);
                } else {
                    newLeader = target;
                    this.groupObject[newLeader] = [target];
                }
                this.leaderItems[target] = newLeader;
    
                if ((target+1) % this.boardSize !== 0) {
                    this.checkNeighbors(newLeader, target+1);
                }
                if (target % this.boardSize !== 0) {
                    this.checkNeighbors(newLeader, target-1);
                }
                this.checkNeighbors(newLeader, target-this.boardSize);
                this.checkNeighbors(newLeader, target+this.boardSize);
              }
        }
    }

    // Get maximum group size of current balloon groups
    findMaxGroupSize() {
        let tempMaxSize = 0;
        for (let leader in this.groupObject) {
            let size = this.groupObject[leader].length;
            if (size > tempMaxSize) {
                tempMaxSize = size;
            }
        }
        this.maxGroupSize = tempMaxSize;
    }

    // Shoot the balloon
    shootBalloon(idx, gameOver) {
        let leader = this.leaderItems[idx];
        if (leader !== -1) {
            let targetGroup = this.groupObject[leader];
            if (targetGroup.length === this.maxGroupSize) {
                // Remove the Balloons
                targetGroup.map(idx => {
                    this.board[idx] = false;
                    this.leaderItems[idx] = -1;
                });
                delete this.groupObject[leader];

                // Update max group size
                this.findMaxGroupSize();
                
                if (Object.keys(this.groupObject).length === 0) gameOver(true);
            } else {
                // Trigger game over callback
                gameOver(false);
            }
        }
    }
    
}