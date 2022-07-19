const gameBoard = (() => {
    let gameState = [['', '', ''], 
                     ['', '', ''], 
                     ['', '', '']];
    let currMarker = 'X';
    const addMarker = (row, col) => {
        switch (row){
            case 'row1':
                row = 0;
                break;
            case 'row2':
                row = 1;
                break;
            case 'row3':
                row = 2;
                break;
        }
        gameState[row][col-1] = currMarker;
    }
    const changeMarker = () => {
        if (currMarker == 'X'){
            currMarker = 'O';
            return;
        }

        if (currMarker == 'O'){
            currMarker = 'X';
            return;
        }
    }
    return{
        gameState,
        get getMarker() {
            return currMarker;
        },
        changeMarker,
        addMarker,
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
                    let marker = document.createElement('span');
                    marker.innerHTML = gameBoard.getMarker;
                    columnDiv.appendChild(marker);
                    
                    let col = index+1;
                    let rowNo = rowDiv.id;
                    gameBoard.addMarker(rowNo, col);
                    gameBoard.changeMarker();
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