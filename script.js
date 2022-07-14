const gameBoard = (() => {
    let gameState = [['x', 'x', 'x'], ['o', 'o', 'o'], ['x', 'x', 'x']];
    return{
        gameState,
    };
})();

const Player = (name) => {
    let marker = '';
    const getName = () => name;
    return {marker, getName};
}

const ticTacToe = (()=> {
    
})