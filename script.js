const gameBoard = (() => {
    let gameState = [['x', 'x', 'x'], 
                     ['o', 'o', 'o'], 
                     ['x', 'x', 'x']];
    let currMarker = '';
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
    const renderBoard = () => {
        const cellList = document.querySelectorAll(".cell");
        
    }
})
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