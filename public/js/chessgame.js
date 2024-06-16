


// const socket = io();

// const chess = new Chess();
// const boardElement = document.querySelector(".chessboard");
// let draggedPiece = null;
// let sourceSquare = null;
// let playerRole = null;

// const renderBoard = () => {
//     const board = chess.board();
//     boardElement.innerHTML = "";
//     board.forEach((row, rowIndex) => {
//         row.forEach((square, squareIndex) => {
//             const squareElement = document.createElement("div");
//             squareElement.classList.add("square", (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");
//             squareElement.dataset.row = rowIndex;
//             squareElement.dataset.col = squareIndex;

//             if (square) {
//                 const pieceElement = document.createElement("div");
//                 pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");
//                 pieceElement.innerText = getPieceUnicode(square);
//                 pieceElement.draggable = playerRole === square.color;

//                 pieceElement.addEventListener("dragstart", (e) => {
//                     if (pieceElement.draggable) {
//                         draggedPiece = pieceElement;
//                         sourceSquare = { row: rowIndex, col: squareIndex };
//                         e.dataTransfer.setData("text/plain", "");
//                     }
//                 });

//                 pieceElement.addEventListener("dragend", () => {
//                     draggedPiece = null;
//                     sourceSquare = null;
//                 });

//                 squareElement.append(pieceElement);
//             }

//             squareElement.addEventListener("dragover", (e) => {
//                 e.preventDefault();
//             });

//             squareElement.addEventListener("drop", (e) => {
//                 e.preventDefault();
//                 if (draggedPiece) {
//                     const targetSquare = {
//                         row: parseInt(squareElement.dataset.row),
//                         col: parseInt(squareElement.dataset.col),
//                     };
//                     handleMove(sourceSquare, targetSquare);
//                 }
//             });

//             boardElement.appendChild(squareElement);
//         });
//     });

//     if (playerRole === 'b') {
//         boardElement.classList.add("flipped");
//     } else {
//         boardElement.classList.remove("flipped");
//     }
// };

// const handleMove = (source, target) => {
//     const move = {
//         from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
//         to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
//         promotion: 'q'
//     };

//     socket.emit("move", move);
// };

// const getPieceUnicode = (piece) => {
//     const unicodePieces = {
//         p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔",
//         P: "♟", R: "♜", N: "♞", B: "♝", Q: "♛", K: "♚",
//     };
//     return unicodePieces[piece.type] || "";
// };

// socket.on("playerRole", (role) => {
//     playerRole = role;
//     renderBoard();
// });

// socket.on("spectatorRole", () => {
//     playerRole = null;
//     renderBoard();
// });

// socket.on("boardState", (fen) => {
//     chess.load(fen);
//     renderBoard();
// });

// socket.on("move", (move) => {
//     chess.move(move);
//     renderBoard();
// });

// renderBoard();

const socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessboard");
const moveListElement = document.querySelector(".move-list");
let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.append(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });

    if (playerRole === 'b') {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q'
    };

    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔",
        P: "♟", R: "♜", N: "♞", B: "♝", Q: "♛", K: "♚",
    };
    return unicodePieces[piece.type] || "";
};

socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    const notation = chess.move(move);
    if (!notation) {
        showAlert("Invalid move!");
        return;
    }
    renderBoard();
    updateMoveList(notation);
});

const showAlert = (message) => {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert");
    alertElement.textContent = message;
    document.body.appendChild(alertElement);
    setTimeout(() => {
        alertElement.remove();
    }, 3000);
};
const updateMoveList = (move) => {
    const moveElement = document.createElement("li");
    const color = move.color === "w" ? "White" : "Black"; // Determine color based on the move itself
    moveElement.textContent = `${color} => ${move.san}`;
    moveListElement.appendChild(moveElement);

    // Check if a piece was captured
    if (move.captured) {
        const capturingColor = move.color === "w" ? "Black" : "White"; // Correctly determine the color of the capturing player
        const capturedPiece = getPieceUnicode({ type: move.captured, color: move.capturedColor });
        const capturedPieceElement = document.createElement("li");
        capturedPieceElement.textContent = `${capturedPiece}`;
        capturedPieceElement.classList.add("captured-piece");
        
        // Append the captured piece element to the appropriate captured pieces list
        document.querySelector(`.${capturingColor.toLowerCase()}-captured .captured-pieces`).appendChild(capturedPieceElement);
    }
};






renderBoard();
