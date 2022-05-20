//

const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const clear = document.querySelector(".calculator__grid__button--clear");
const del = document.querySelector(".calculator__grid__button--del");
const input = document.querySelector(".calculator__input");
const eq = document.querySelector(".calculator__grid__button--eq");
const out = document.querySelector(".calculator__output");


let arr = [];

const onPressNum = (event) => {
    console.log(Number(event.target.innerText) + " button pressed")

    if (arr != [] && !isNaN(arr[arr.length - 1])) { 
        arr[arr.length - 1] = arr[arr.length - 1] + event.target.innerText;
    } else {
        arr.push(event.target.innerText);
    }
    updateInput();
}

const onPressOperator = (event) => {
    console.log(Number(event.target.innerText) + " button pressed")
    
    arr.push(event.target.innerText);
    
    updateInput();
}

const onDelete = (event) => {
    console.log("delete button pressed")
    if(!isNaN(arr[arr.length - 1])) { // && arr[arr.length - 1].length > 1 if last element is a number and length is longer than 1
        arr[arr.length - 1] = arr[arr.length - 1].substring(0,(arr[arr.length - 1].length - 1))
    } else {
        arr.pop()
    }
    updateInput();
}

const onEquals = (event) => {
    arr.forEach((str) => {
        if (!isNaN(str)) {
            str = Number(str);
            console.log(typeof(str) + "   " + str);
        }
    }) 
    outputArr = solve(arr)
    let string = "";
    outputArr.forEach((item) => {
        string = string +  " " + item;
    });
    out.innerText = string;
}

const onClear = (event) => {
    console.log("clear");
    arr = [];
    updateInput();
}

const updateInput = () => {
    let string = "";
    arr.forEach((item) => {
        string = string +  " " + item;
    });
    input.innerText = string;
}


//one.addEventListener("click", onPress1);

numbers.forEach((number) => number.addEventListener("click", onPressNum));
operator.forEach((number) => number.addEventListener("click", onPressOperator));
clear.addEventListener("click", onClear);
del.addEventListener("click", onDelete);
eq.addEventListener("click", onEquals);

//split string into array

//var numsAndOperators = ["(", 5, "+", 1, ")", "*", 2];











let numsAndOperators = [5, "^", "2", "+", 1, "*", 2];


const solve = (arr) => {
    let numsAndOperators = [...arr];
    //find brackets

    //find last open bracket
    while (numsAndOperators.includes("(")) {
        const lastOpenIndex = numsAndOperators.lastIndexOf("(");
        console.log(lastOpenIndex)
        const restOf = numsAndOperators.slice(lastOpenIndex, numsAndOperators.length);
        
        const nextClose = restOf.indexOf(")") + lastOpenIndex;
        console.log(nextClose);
        const solutionIn = solve(numsAndOperators.slice(lastOpenIndex + 1, nextClose))
        console.log(solutionIn);
        numsAndOperators = numsAndOperators.slice(0, lastOpenIndex).concat(solutionIn,numsAndOperators.slice(nextClose+1,numsAndOperators.length));
    }



    //for each indice, left to right
    for (let i = 0; i < numsAndOperators.length; i++) {
        let replace = null;
        if(numsAndOperators[i] === "^") {
            replace = Math.pow(numsAndOperators[i - 1], numsAndOperators[i + 1]);
            numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
        }
    }


    // for each multiplication and division, left to right
    for (let i = 0; i < numsAndOperators.length; i++) {
        
        //if two numbers next to eachother
        if (!isNaN(numsAndOperators[i]) && !isNaN(numsAndOperators[i + 1])) {
            numsAndOperators[i] = numsAndOperators[i] * numsAndOperators[i + 1];
            numsAndOperators.splice(i + 1, 1);

        } else {
            let replace = null;
            
            if(numsAndOperators[i] === "x") {
                replace = numsAndOperators[i - 1] * numsAndOperators[i + 1];
            } else if (numsAndOperators[i] === "÷") {
                replace = numsAndOperators[i - 1] / numsAndOperators[i + 1];
            }
    
            if (replace != null) {
                numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
            }
        }

        
    }
    

    // for each addition and subtraction, left to right
    for (let i = 0; i < numsAndOperators.length; i++) {
        let replace = null;
        if(numsAndOperators[i] === "+") {
            replace = (Number)(numsAndOperators[i - 1]) + (Number)(numsAndOperators[i + 1]);
        } else if (numsAndOperators[i] === "-") {
            replace = numsAndOperators[i - 1] - numsAndOperators[i + 1];
        }

        if (replace != null) {
            numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
        }
    }

    return numsAndOperators;
}
//console.log(solve(numsAndOperators));

