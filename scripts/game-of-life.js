window.GameOfLife = (function() {
    'use strict';

    var board = [];
    var checkboxes = [];
    var runningGameInterval;
    var config = {};

    function GameOfLife(cfg) {
        cfg = cfg || {};
        config = {
            width: cfg.width         || 30,
            height: cfg.height       || 30,
            interval: cfg.interval   || 500
        };
        createBoard();
        createViewBoard();
    }

    GameOfLife.prototype.play = function () {
        runningGameInterval = setInterval(this.next, config.interval);
    };

    GameOfLife.prototype.stop = function () {
        clearTimeout(runningGameInterval);
    };

    GameOfLife.prototype.next = function () {
        var newBoard = [];
        for (var row = 0; row < board.length; row++) {
            newBoard[row] = [];
            for (var col = 0; col < board[row].length; col++) {
                var numNeighbours = getNumNeighbours(row, col, board);
                var nextCellState = getNextCellState(numNeighbours, board[row][col]);
                newBoard[row][col] = nextCellState;
            }
        }
        board = newBoard;
        updateViewBoard();
    };

    function createBoard() {
        for (var row = 0; row < config.height; row++) {
            board[row] = [];
            for (var col = 0; col < config.width; col++) {
                board[row][col] = 0;
            }
        }
    }

    function createViewBoard() {
        var table = document.createElement('table');

        for (var row = 0; row < config.height; row++) {
            var tr = document.createElement('tr');
            checkboxes[row] = [];
            for (var col = 0; col < config.width; col++) {
                var td = document.createElement('td');
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                (function (row, col) {
                    checkbox.onchange = function() {
                        board[row][col] = +this.checked;
                    };
                })(row, col);
                checkboxes[row][col] = checkbox;
                td.appendChild(checkbox);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        document.getElementsByClassName('board')[0].appendChild(table);
    }

    function updateViewBoard() {
        for (var row = 0; row < board.length; row++) {
            for (var col = 0; col < board[row].length; col++) {
                checkboxes[row][col].checked = !!board[row][col];
            }
        }
    }

    function getNumNeighbours(row, col, board) {
        var prevRow = board[row - 1] || [];
        var nextRow = board[row + 1] || [];

        var neighbours = [
            prevRow   [col - 1], prevRow[col], prevRow   [col + 1],
            board[row][col - 1],               board[row][col + 1],
            nextRow   [col - 1], nextRow[col], nextRow   [col + 1]
        ];

        var numNeighbours  = neighbours.reduce(function (prev, next) {
            return prev + +!!next;
        }, 0);

        return numNeighbours;
    }

    function getNextCellState(numNeighbours, previousCellState) {
        var nextCellState;
        switch (numNeighbours) {
            case 0:
            case 1:
            default:
                nextCellState = 0;
                break;
            case 2:
                nextCellState = previousCellState || 0;
                break;
            case 3:
                nextCellState = 1;
                break;
        }
        return nextCellState;
    }

    return GameOfLife;
})();