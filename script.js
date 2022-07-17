const gameBoard = (() => {
    let gameState = [['', '', ''], 
                     ['', '', ''], 
                     ['', '', '']];
    let currMarker = 'X';
    return{
        gameState,
        currMarker,
    };
})();

const Player = (name) => {
    let marker = '';
    const getName = () => name;
    return {marker, getName};
}

const ticTacToe = (()=> {
    
})

const displayController = (()=> {
    const renderBoard = () => { //rowid of row + index, cellclass of column + index
        const gameBoardDiv = document.querySelector('#gameBoard');
        const gameState = gameBoard.gameState;
        gameState.forEach((row, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add(`row${index + 1}`);
            rowDiv.classList.add(`row`);
            rowDiv.setAttribute("id", `row${index + 1}`);

            row.forEach((column, index) => {
                const columnDiv = document.createElement('div');
                columnDiv.classList.add(`column${index + 1}`);
                columnDiv.classList.add(`cell`);
                columnDiv.addEventListener('click', ()=> {
                    const marker = document.createElement('span');
                    marker.innerHTML = gameBoard.currMarker;
                    columnDiv.appendChild(marker);
                })
                rowDiv.appendChild(columnDiv);
            })

            gameBoardDiv.appendChild(rowDiv);
        })
        
    }
    return{
        renderBoard
    };
})();

displayController.renderBoard();
//Game flow
//gameboard, player forms are rendered
//Players key in names (once)
//player forms are removed
//Players are assigned markers
//game proceeds until a win or a tie
//game is reset

//required functions
//take gameState and render it onto gameboard div
//onclick function to mark a cell with marker
//function to tell which marker it currently is
//function to initialize players from form
//function to determie starting player
//function to determine when someone wins or game ties
//