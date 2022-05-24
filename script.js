//

const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const clear = document.querySelector(".calculator__grid__button--clear");
const del = document.querySelector(".calculator__grid__button--del");
const input = document.querySelector(".calculator__io__input");
const eq = document.querySelector(".calculator__grid__button--eq");
const out = document.querySelector(".calculator__io__output");
const ans = document.querySelector(".calculator__grid__button--ans");



let arr = [];

const onPressNum = (event) => {
    console.log(Number(event.target.innerText) + " button pressed")

    if (arr != [] && (!isNaN(arr[arr.length - 1]) || arr[arr.length - 1] === "-")) { 
        arr[arr.length - 1] = arr[arr.length - 1] + event.target.innerText;
    } else {
        arr.push(event.target.innerText);
    }
    updateInput();
}

const onPressOperator = (event) => {
    let toAdd = event.target.innerText;
    console.log(toAdd + " button pressed");
    if (toAdd === "√") {
        arr.push(2, "rt", "(");

    } else if (toAdd === "y\n√") {
        arr.push("rt", "(");

    }else if (toAdd === "x\n2") {
        arr.push("po", "(", 2, ")");

    }  else if (toAdd === "x\ny") {
        arr.push("po", "(");

    }  else if (toAdd === "-") {
        arr.push("+-");

    }  else if (toAdd === "(-)") {
        arr.push("-");

    } else {
        arr.push(toAdd);
    }
    
    updateInput();
}

const onAns = (event) => {
    console.log(out.innerText);
    if (typeof(out.innerText) != undefined) {
        arr.push("Ans");
        updateInput();
    }
}

const onDelete = (event) => {
    console.log("delete button pressed")
    if(!isNaN(arr[arr.length - 1]) && (arr[arr.length - 1].length > 1)) { //if last element is a number and length is longer than 1
        arr[arr.length - 1] = arr[arr.length - 1].substring(0,(arr[arr.length - 1].length - 1))
    } else {
        arr.pop()
    }
    updateInput();
}


const updateInput = () => {
    let string = "";
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === "po") {
            string = string + ` <span class="indice">`;
            
        } else if (arr[i] === ")" && (arr.slice(0,i)[arr.lastIndexOf("(") - 1] === "po")) {
            console.log(") here");
            string = string +  ` ${arr[i]}</span>`;
        
        } else if (arr[i] === "rt") {
            if (arr[i - 1] === 2) {
                string = string  +  ` √`;
            } else {
                string = string  +  `√`;
            }
        } else if (arr[i + 1] == "rt") {
            string = string + ` <span class="indice">${arr[i]}</span>`;
        } else if (arr[i] == "+-") {
            string = string + " -"
        } else {
            string = string +  " " + arr[i];
        }
    }
    input.innerHTML = `<div>${string}</div>`;
}

const onEquals = (event) => {
    console.log(arr);

    outputArr = solve(arr);
    let string = "";
    if (outputArr != "error" || !isNaN(outputArr[0])) {
        
        outputArr.forEach((item) => {
            string = string +  " " + item;
        });
    } else {
        string = "invalid input"
    } 
    out.innerHTML = `<p>${string}<\p>`;
}

const onClear = (event) => {
    console.log("clear");
    console.log(arr);
    if (arr.length === 0) {
        out.innerText = "";
    } else {
        arr = [];
    }
    
    updateInput();
}


numbers.forEach((number) => number.addEventListener("click", onPressNum));
operator.forEach((number) => number.addEventListener("click", onPressOperator));
clear.addEventListener("click", onClear);
del.addEventListener("click", onDelete);
eq.addEventListener("click", onEquals);
ans.addEventListener("click", onAns);





const solve = (arr) => {
    let numsAndOperators = [...arr];

    //if first is operator
    if (numsAndOperators[0] === ")" ||
    numsAndOperators[0] === "x" ||
    numsAndOperators[0] === "÷" ||
    numsAndOperators[0] === "+" ||
    numsAndOperators[0] === "%" ||
    numsAndOperators[0] === "+-") {
        return "error";
    }

    //change Ans to out
    for (let i = 0; i < numsAndOperators.length; i++) {
        if (numsAndOperators[i] === "Ans") {
            numsAndOperators[i] = out.innerText;
        }
    }

    console.log(numsAndOperators);


    while (numsAndOperators.includes("(")) {
        const lastOpenIndex = numsAndOperators.lastIndexOf("(");
        const restOf = numsAndOperators.slice(lastOpenIndex, numsAndOperators.length);
        const nextClose = restOf.indexOf(")") + lastOpenIndex;
        const solutionIn = solve(numsAndOperators.slice(lastOpenIndex + 1, nextClose))
        if (solutionIn === "error") {
            return "error";
        }
        numsAndOperators = numsAndOperators.slice(0, lastOpenIndex).concat(solutionIn,numsAndOperators.slice(nextClose+1,numsAndOperators.length));
    }
    console.log(numsAndOperators.join(" "));



    //for each indice, left to right
    for (let i = 0; i < numsAndOperators.length; i++) {
        let replace = null;
        if(numsAndOperators[i] === "po") {
            replace = Math.pow(numsAndOperators[i - 1], numsAndOperators[i + 1]);
            numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
        }
        if(numsAndOperators[i] === "rt") {
            replace = Math.pow(numsAndOperators[i + 1], 1/numsAndOperators[i - 1]);
            numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
        }
    }

    
    while (numsAndOperators.includes("%")){
        for (let i = 0; i < numsAndOperators.length; i++) {
            if (numsAndOperators[i] === "%") {
                const replace = numsAndOperators[i - 1]/100 * numsAndOperators[i + 1];
                numsAndOperators = numsAndOperators.slice(0, i - 1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
            }
        } 
    }


    // for each multiplication and division, left to right
    for (let i = 0; i < numsAndOperators.length; i++) {
        //if two numbers next to eachother
        if (!isNaN(numsAndOperators[i]) && !isNaN(numsAndOperators[i + 1])) {
            numsAndOperators[i] = numsAndOperators[i] * numsAndOperators[i + 1];
            numsAndOperators.splice(i + 1, 1);
        }
    }

    while (numsAndOperators.includes("x") || numsAndOperators.includes("÷")) {
        
        for (let i = 0; i < numsAndOperators.length; i++) {
            let replace = null;

            if(numsAndOperators[i] === "x") {
                replace = numsAndOperators[i - 1] * numsAndOperators[i + 1];
            } else if (numsAndOperators[i] === "÷") {
                replace = numsAndOperators[i - 1] / numsAndOperators[i + 1];
            }
    
            if (replace != null) {
                numsAndOperators = numsAndOperators.slice(0, i - 1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
            }
            
        }  
    }
    

    // for each addition and subtraction, left to right
    while (numsAndOperators.includes("+") || numsAndOperators.includes("+-")) {
        for (let i = 0; i < numsAndOperators.length; i++) {
            let replace = null;
            if(numsAndOperators[i] === "+") {
                replace = (Number)(numsAndOperators[i - 1]) + (Number)(numsAndOperators[i + 1]);
            } else if (numsAndOperators[i] === "+-") {
                replace = numsAndOperators[i - 1] - numsAndOperators[i + 1];
            }

            if (replace != null) {
                numsAndOperators = numsAndOperators.slice(0, i-1).concat([replace],numsAndOperators.slice(i+2,numsAndOperators.length))
            }
        }
    }

    if (numsAndOperators.length === 1) {
        return numsAndOperators;
    } else {
        console.log("error: " + numsAndOperators);
        return "error";
    }
    
}


