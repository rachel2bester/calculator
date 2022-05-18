//


//split string into array

//var numsAndOperators = ["(", 5, "+", 1, ")", "*", 2];
let numsAndOperators = [5, "+", 1, "*", 2];


const solve = (arr) => {
    let numsAndOperators = [...arr]
    //find brackets
    // while (array.includes("(")) { //fix for invalid
    //     for (arr)
    // }
    // return 0;

    //for each bracket,

    //  solve(whats in bracket)
    //  replace whats in bracket on main array
    //
    //for each indice
    //  solve indice using Math.pow
    //  replace whats in main array
    // 
    // for each multiplication and division, left to right
    
    for (let i = 0; i < numsAndOperators.length; i++) {
        const replace = null;
        if(numsAndOperators[i] === "*") {
            replace = numsAndOperators[i - 1] * arr[i + 1];
        } else if (numsAndOperators[i] === "*") {
            replace = numsAndOperators[i - 1] / arr[i + 1];
        }

        if (replace != null) {
            numsAndoperators = concat()
        }

    }

    //  solve using * and /
    //  replace that part of main array
    //  
    // for each addition and subtraction, left to right
    //  solve using + and -
    //  replace that part of main array
}
console.log(solve);