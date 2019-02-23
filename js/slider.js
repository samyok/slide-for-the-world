$(document).ready(function () {
    let testSlider = new Slider(5, "#app", "/img/flowers.jpg");
});
var $logger = beaver.Logger({

    // Url to send logs to
    url: '/api/logs',

    // Prefix to prepend to all events
    prefix: 'slider',

    // Log level to display in the browser console
    logLevel: beaver.LOG_LEVEL.DEBUG,

    // Interval to flush logs to server
    flushInterval: 60 * 1000
});

class Slider {
    /**
     * Create a new Slider - by move, we are talking about moving the BLANK space
     * @param size The size of the board (size x size)
     * @param parent The CSS element selector of the parent
     * @param imageURL The background image url
     * @returns {Slider}
     */
    constructor(size, parent, imageURL) {
        if ($(parent).length === 0) console.warn("Parent doesn't exist");
        /**
         * The size of the board
         * @type {number}
         */
        this.size = size;
        let tempboard = [];
        for (let x = 0; x < this.size; x++) {
            let temprow = [];
            for (let y = 0; y < this.size; y++) {
                let nextNum = (x * this.size) + y + 1;
                if (nextNum !== this.size ** 2)
                    temprow.push(nextNum);
                else
                    temprow.push(0); // 0 is blank
            }
            tempboard.push(temprow);
        }
        /**
         * The location of the blank tile, as indices - properties: x, y - **IMPORTANT**: the X coordinate is equivalent to the Y coordinate in the Cartesian Coordinate System! (do board[x][y] to find the blank element)
         * @type {{x: number, y: number}}
         */
        this.blank = {
            x: size - 1,
            y: size - 1
        };
        /**
         * The board as an array
         * @type {Array}
         */
        this.board = tempboard;
        this.imageURL = imageURL;
        this.element = $("<div/>").addClass("slider").appendTo(parent);
        this.html();
        return this;
    }

    html() {
        this.element.html("");
        let element = this.element; // do this because the .appendTo(this.element) would refer to the wrong 'this'
        let currentBoard = this;
        let imageURL = this.imageURL;
        let size = this.size;
        this.board.forEach((row, x) => {
            row.forEach((item, y) => {
                let tile = $("<div/>").addClass("tile")
                    .css("background-image", `url(${imageURL})`)
                    .css("background-size", `${size * 50 }px ${ size * 50 }px`)
                    .css("background-position", `${((item - 1)% size) * 51 }px ${ Math.floor((item -1 ) / size) * 51 }px`);
                if (item === 0) tile.addClass("blank").text("").appendTo(element).css("background-image", "");
                else tile.text(item).appendTo(element);
                if (currentBoard.blank.x === x && currentBoard.blank.y !== y) {
                    tile.addClass("clickable");
                    tile.click(function () {
                        if (currentBoard.blank.y < y) { // this tile is on the right of the blank
                            while (currentBoard.blank.y < y) {
                                currentBoard.move(1);
                            }
                        } else { // it's on the left of the blank
                            while (currentBoard.blank.y > y) {
                                currentBoard.move(3);
                            }
                        }
                    })
                } else if (currentBoard.blank.x !== x && currentBoard.blank.y === y) {
                    tile.addClass("clickable");
                    tile.click(function () {
                        if (currentBoard.blank.x < x) { // this tile is above or below the blank
                            while (currentBoard.blank.x < x) { // it's above the blank
                                currentBoard.move(2);
                            }
                        } else { // it's below the blank
                            while (currentBoard.blank.x > x) {
                                currentBoard.move(0);
                            }
                        }
                    })
                }
            })
        });
    }

    // clockwise from the top: 1 (up) 2 (right) 3 (down) 4 (left)
    /**
     * Returns an array of all possible moves (clockwise from the top: 0 [up] 1 [right] 2 [down] 3 [left])
     * @returns {Array} array of all possible moves (clockwise from the top: 0 [up] 1 [right] 2 [down] 3 [left])
     */
    availableMoves() {
        let ans = [];
        if (this.blank.x !== 0) {
            ans.push(0);
        }
        if (this.blank.y !== 0) {
            ans.push(3);
        }
        if (this.blank.x !== this.size - 1) {
            ans.push(2);
        }
        if (this.blank.y !== this.size - 1) {
            ans.push(1)
        }
        return ans;
    }

    /**
     * Moves the blank tile in a direction
     * @param direction The "direction" - a numerical index between 0 and 3. 0 is top, 1 is right, 2 is down, and 3 is down
     * @returns {Slider} This Slider. Throws "Not a valid move" if it is not a valid move (checked by this.availableMoves())
     */
    move(direction) {
        if (!this.availableMoves().includes(direction) || ![0, 1, 2, 3].includes(direction)) throw "Not a valid move";
        switch (direction) {
            case 0:
                this.board[this.blank.x][this.blank.y] = this.board[this.blank.x - 1][this.blank.y];
                this.board[this.blank.x - 1][this.blank.y] = 0;
                this.blank = {
                    x: this.blank.x - 1,
                    y: this.blank.y
                };
                break;
            case 1:
                this.board[this.blank.x][this.blank.y] = this.board[this.blank.x][this.blank.y + 1];
                this.board[this.blank.x][this.blank.y + 1] = 0;
                this.blank = {
                    x: this.blank.x,
                    y: this.blank.y + 1
                };
                break;
            case 2:
                this.board[this.blank.x][this.blank.y] = this.board[this.blank.x + 1][this.blank.y];
                this.board[this.blank.x + 1][this.blank.y] = 0;
                this.blank = {
                    x: this.blank.x + 1,
                    y: this.blank.y
                };
                break;
            case 3:
                this.board[this.blank.x][this.blank.y] = this.board[this.blank.x][this.blank.y - 1];
                this.board[this.blank.x][this.blank.y - 1] = 0;
                this.blank = {
                    x: this.blank.x,
                    y: this.blank.y - 1
                };
                break;
            default:
                throw "Not a valid move";
        }
        this.html();
        return this;
    }
}
