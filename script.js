const gameBoard = (() => {
    let gameState = [['', '', ''], 
                     ['', '', ''], 
                     ['', '', '']];
    let currMarker = 'X';
    let markerChanges = 0;
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

        if (gameState[row][col-1] != ''){
            return;
        }

        gameState[row][col-1] = currMarker;
    }

    const changeMarker = () => {
        markerChanges += 1;
        if (currMarker == 'X'){
            currMarker = 'O';
            return;
        }

        if (currMarker == 'O'){
            currMarker = 'X';
            return;
        }
    }

    const boardFull = () => {
        return markerChanges === gameState[0].length * gameState.length - 1;
    }

    const reset = () => {
        gameState = [['', '', ''], 
                     ['', '', ''], 
                     ['', '', '']];
        currMarker = 'X';
        markerChanges = 0;
    }

    return{
        get gameState() {
            return gameState;
        },
        get getMarker() {
            return currMarker;
        },
        changeMarker,
        addMarker,
        boardFull,
        reset,
    };
})();

const Player = (newName) => {
    let marker = '';
    let name = newName;
    let score = 0;
    const addScore = () => {
        score += 1;
    }
    return {
        get getMarker(){
            return marker;
        }, 

        get getName(){
            return name;
        },

        get getScore(){
            return score;
        },

        set setMarker(newMarker) {
            marker = newMarker;
        },

        addScore,
    };
}

const ticTacToe = (()=> {
    let playerList = [];
    let currPlayerIndex = 0;
    const startGameButton = document.querySelector('.startGame');
    startGameButton.addEventListener('click', ()=>{ 

        const playerOneName = document.getElementById('playerOneName');
        let playerOne = playerOneName.value == '' ? Player('Player One') : Player(playerOneName.value);
        playerOne.setMarker = 'X';
        playerList.push(playerOne);

        const playerTwoName = document.getElementById('playerTwoName');
        let playerTwo = playerTwoName.value == '' ? Player('Player Two') : Player(playerTwoName.value);
        playerTwo.setMarker = 'O';
        playerList.push(playerTwo);

        displayController.closePlayerNameDialog();
        displayController.renderBoard();
        displayController.updateNames(playerOne.getName, playerTwo.getName);
        displayController.renderTurn();
        }
    )

    const playTurn = (rowNo, col) => {
        gameBoard.addMarker(rowNo, col);

        switch (checkForWin(gameBoard.getMarker)) {
            case "win":
                playerList[currPlayerIndex].addScore();
                displayController.renderGameEnd('win');
                displayController.renderNewScore(currPlayerIndex);
                return;

            case "tie":
                displayController.renderGameEnd('tie');
                return;

            case "continue":
                break;
        };

        gameBoard.changeMarker();
        currPlayerIndex ^= 1;
        displayController.renderTurn();
    }

    const checkForWin = (currMarker) => {

      if (
        gameBoard.gameState[0][2] === currMarker &&
        gameBoard.gameState[1][1] === currMarker &&
        gameBoard.gameState[2][0] === currMarker
      ) {
        return "win";
      }
      if (
        gameBoard.gameState[0][0] === currMarker &&
        gameBoard.gameState[1][1] === currMarker &&
        gameBoard.gameState[2][2] === currMarker
      ) {
        return "win";
      }

      for (let i = 0; i < gameBoard.gameState.length; i++) {
        if (
          gameBoard.gameState[i][0] === currMarker &&
          gameBoard.gameState[i][1] === currMarker &&
          gameBoard.gameState[i][2] === currMarker
        ) {
          return 'win';
        }
        if (
          gameBoard.gameState[0][i] === currMarker &&
          gameBoard.gameState[1][i] === currMarker &&
          gameBoard.gameState[2][i] === currMarker
        ) {
          return 'win';
        }
      }

      if (gameBoard.boardFull()) {
        return 'tie'; //return nothing if no winner and board filled
      }

      return 'continue'; //return nothing for incomplete game
    };

    const newRoundButton = document.querySelector('#newRound');
    newRoundButton.addEventListener('click', () => {
            gameBoard.reset();
            displayController.renderBoard();
            displayController.renderTurn();
        }
    );

    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', () => {
            gameBoard.reset();
            displayController.reset();
            playerList = [];
        }
    );

    return {
        get getCurrPlayer(){
            return playerList[currPlayerIndex];
        },

        playTurn,
        checkForWin,
    };
})();

const displayController = (()=> {

    const openPlayerNameDialog = () => {
        const dialog = document.querySelector('#playerNames');
        dialog.classList.remove('inactive');
    }

    const closePlayerNameDialog = () => {
        const dialog = document.querySelector('#playerNames');
        const form = document.querySelector('#playerForm');
        form.reset();
        dialog.classList.add('inactive');
    }

    const renderBoard = () => { //rowid of row + index, cellclass of column + index
        const gameBoardDiv = document.querySelector('#gameBoard');
        gameBoardDiv.innerHTML = '';
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

                    if (!columnDiv.firstElementChild){
                        let marker = document.createElement('span');
                        marker.innerHTML = gameBoard.getMarker;
                        columnDiv.appendChild(marker);
                    }

                    let col = index+1;
                    let rowNo = rowDiv.id;
                    ticTacToe.playTurn(rowNo, col);
                })
                rowDiv.appendChild(columnDiv);
            })

            gameBoardDiv.appendChild(rowDiv);
        })
        
    }



    const playerTurn = document.getElementById('playerTurnText');
    const renderTurn = () => {
        playerTurn.innerHTML = `${ticTacToe.getCurrPlayer.getName}'s Turn`;
    }

    const updateNames = (firstName, secondName) => {
        const playerOne = document.getElementById('scoreBoardNameOne');
        const playerTwo = document.getElementById('scoreBoardNameTwo');
        playerOne.innerHTML = firstName;
        playerTwo.innerHTML = secondName;
    }

    const renderGameEnd = (result) => {
        switch (result) {
            case 'win':
                playerTurn.innerHTML = `${ticTacToe.getCurrPlayer.getName} wins!`;
                break;
            case 'tie':
                playerTurn.innerHTML = `Tied!`
        }
    }

    const renderNewScore = (currPlayerIndex) => {

        switch (currPlayerIndex){
            case 0:
                const playerOneScore = document.getElementById('playerOneScore');
                playerOneScore.innerHTML = ticTacToe.getCurrPlayer.getScore;
                break;
            case 1:
                const playerTwoScore = document.getElementById('playerTwoScore');
                playerTwoScore.innerHTML = ticTacToe.getCurrPlayer.getScore;
                break;
        }
    }

    const reset = () => {

        //reset gameBoard
        const gameBoardDiv = document.querySelector('#gameBoard');
        gameBoardDiv.innerHTML = '';

        //reset scores
        const playerOneScore = document.getElementById('playerOneScore');
        playerOneScore.innerHTML = 0;
        const playerTwoScore = document.getElementById('playerTwoScore');
        playerTwoScore.innerHTML = 0;

        //reset turn text
        playerTurn.innerHTML = '';

        //reset player names
        const playerOne = document.getElementById('scoreBoardNameOne');
        const playerTwo = document.getElementById('scoreBoardNameTwo');
        playerOne.innerHTML = `Player One`;
        playerTwo.innerHTML = `Player Two`;

        openPlayerNameDialog();

    }

    return{
        openPlayerNameDialog,
        closePlayerNameDialog,
        renderBoard,
        updateNames,
        renderTurn,
        renderGameEnd,
        renderNewScore,
        reset,
    };
})();

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
//function to determine starting player
//function to determine when someone wins or game ties
//scoreboard tracking and rendering
//function + button to start a new round
//function + button to start a new game