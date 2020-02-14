export function generateVal(col, row, n){
    // const minimum_move = 1
    const maximum_move = Math.max(n-1-row, row, n-1-col, col)
    if(row===n/2 && col === n/2){
        return Math.floor(Math.random() * ((n/2))) + 1
    }else if(row === n-1 && col === n-1){
        return 0
    }else{
        return Math.floor((Math.random() * maximum_move)) + 1
    }
}