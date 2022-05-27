beforeEach(() => {
    cy.visit("/");
})

xdescribe("Should display calculator", () => {

    it("shows calculator on screen", () => {

        cy.get(".calculator").should("exist");
    })

    it("show all of the buttons", () => {
        cy.get(".calculator__grid__button").should("have.length", 27)
    })
})

xdescribe("Should perform addition", () => {
    it("should calculate single digit addition (7+8=15)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button").contains("+").click();
        cy.get(".calculator__grid__button").contains("8").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 15)
    })

    it("should calculate addition with more than one digit for each number (275+ 390 = 665)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("+").click();
        cy.get(".calculator__grid__button--3").click();
        cy.get(".calculator__grid__button--9").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 665)
    })

    it("should calculate addition with decimal entry 2.5 + 8.75 = 11.25", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("+").click();
        cy.get(".calculator__grid__button--8").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 11.25)
    })
})

xdescribe("Should perform subtraction", () => {
    it("should calculate single digit subtraction (7-2=5)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--sub").click();
        cy.get(".calculator__grid__button").contains("2").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 5)
    })

    it("should calculate subtraction with more than one digit for each number (275 - 390 = -115)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--sub").click();
        cy.get(".calculator__grid__button--3").click();
        cy.get(".calculator__grid__button--9").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain", -115)
    })

    it("should calculate addition with decimal entry 2.5 - 8.75 = -6.25", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--sub").click();
        cy.get(".calculator__grid__button--8").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", -6.25)
    })
})

describe("Should perform multiplication", () => {
    it("should calculate single digit multiplication (7*8=56)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button").contains("8").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 56)
    })

    it("should calculate multiplication with more than one digit for each number (14 * 572 = 8008)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--1").click();
        cy.get(".calculator__grid__button--4").click();
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 8008)
    })

    it("should calculate multiplication with decimal entry 2.5 * 8.75 = 21.875", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button--8").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--7").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 21.875);
    })

    it("handles multiplication of big numbers (500000000000000*300000000000000000 = 1.5e+32)", () => {
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button--3").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--eq").click();

        cy.get(".calculator__io__output").should("contain.text", "1.5e+32");
    })
})

xdescribe("Should perform division", () => {
    it("should calculate single digit division (8/2=4)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--8").click();
        cy.get(".calculator__grid__button--div").click();
        cy.get(".calculator__grid__button").contains("2").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 4)
    })

    it("should calculate division with more than one digit for each number (90 / 45 = 2)", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--9").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--div").click();
        cy.get(".calculator__grid__button--4").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 2)
    })

    it("should calculate division with decimal entry 18.5 / 2.5 = 7.4", () => {
        // arrange (get things ready)
        
        // act (do it)
        cy.get(".calculator__grid__button--1").click();
        cy.get(".calculator__grid__button--8").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button--div").click();
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("=").click();

        // assert (see if its what you wanted it to be)
        cy.get(".calculator__io__output").should("contain.text", 7.4);
    })
})


describe("Handles incorrect user inputs", () => {

    it("handles 2 decimal points (2.4.5 + 2 = invalid input)", () => {
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--4").click();
        cy.get(".calculator__grid__button--dec").click();
        cy.get(".calculator__grid__button--5").click();
        cy.get(".calculator__grid__button").contains("+").click();
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--eq").click();

        cy.get(".calculator__io__output").should("contain.text", "invalid input");
    })

    it("handles an operator at the start (*2-3 = invalid input)", () => {
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--sub").click();
        cy.get(".calculator__grid__button--3").click();
        cy.get(".calculator__grid__button--eq").click();

        cy.get(".calculator__io__output").should("contain.text", "invalid input");
    })

    it("handles two operators next to eachother (2-*3 = invalid input)", () => {
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--sub").click();
        cy.get(".calculator__grid__button--x").click();
        cy.get(".calculator__grid__button--3").click();
        cy.get(".calculator__grid__button--eq").click();

        cy.get(".calculator__io__output").should("contain.text", "invalid input");
    })

    it("handles division by 0 (2/0=infinity", () => {
        cy.get(".calculator__grid__button--2").click();
        cy.get(".calculator__grid__button--div").click();
        cy.get(".calculator__grid__button--0").click();
        cy.get(".calculator__grid__button--eq").click();

        cy.get(".calculator__io__output").should("contain.text", "Infinity");
    })
})