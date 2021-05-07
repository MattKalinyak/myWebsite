/* Sudoku Puzzle with tiles 0 through 80 */
$(document).ready(function() {
    var currentNum = ""; //Tracks the active number
    var solution = new Array(9)  //Array of the correct solution
    for (var i = 0; i < 9; i++) {
        solution[i] = new Array(9)
    }



    /***************** Generating and Checking *****************/
    /* Puzzle Generater button*/
    $('#generate').on('click', function(e) {
        $('#selector').hide()
        $('#submit').text("Check")
        createSolution()
    })

    /* Puzzle Generator */  
    function createSolution() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                solution[i][j] = 0
                outputValue(i, j, 0)
            }
        }
        partialFiller(solution, 100)
        if (!solutionMaker(solution)) createSolution() //make a new solvable puzzle
        else console.log(solution)
    }

    /* generate a few random variables in each line */
    function partialFiller(arr, n) {
        for (var i = 0; i < n; i++) {
            var row = randomNumber(8)
            var col = randomNumber(8)
            var num = randomNumber(9) //gets a random number between 1 and 9
            if (num != 0){
                if (availabilityCheck(arr, row, col, num)) {
                    arr[row][col] = num
                    outputValue(row, col, num)
                }
            } 
        }
    }

    /* Creates a random Integer between 0 and the max */
    function randomNumber(max) {
        return Math.floor(Math.random() * max)
    }

    /* Uses Backtracking to create a solution */
    function solutionMaker(arr) {
        let l = [0, 0]
        if (!findEmptyLocation(arr, l)) return true //puzzle is complete

        var row = l[0]
        var col = l[1]

        for (var i = 1; i < 10; i++) {
            if (availabilityCheck(arr, row, col, i)) {
                arr[row][col] = i //temporary assignment
                if (solutionMaker(arr)) return true //onto next empty location
                arr[row][col] = 0 //undoes the assignment
            }
        }
        return false //This triggers the backtracking
    }

    /* Checks to see if the board matches the solution */
    function checker() {
        var positions = new Array(9) //Array of the numbers on the board
        for (var i = 0; i < 9; i++) {
            positions[i] = [0,0,0,0,0,0,0,0,0]
        }
        console.log(positions)
        console.log("Checking...")
        mapPositions(positions)//maps inputs to an array
        if (checking(positions)) $('#correct').css("display", "block")//checks the soution
        else $('#incorrect').css("display", "block")
    }  

    /* Compare the inputs to the solution */
    function checking(arr) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arr[i][j] != solution[i][j]) return false //if the don't match return false
            }
        }
        return true
    }

    /************************* Solving *************************/

    /* Puzzle Solver Button */
    $('#solve').on('click', function(e) {
        $('#selector').hide()
        $('#submit').text("Solve")
    })

    /* Solves the puzzle based on the inputted data */
    function solver() {
        var positions = new Array(9) //Array of the numbers on the board
        for (var i = 0; i < 9; i++) {
            positions[i] = new Array(9)
        }
        console.log("Solving...")
        mapPositions(positions) //maps inputs to an array
        if (solveSudoku(positions)) {
            console.log("Solved")
        }else {
            console.log("No Solution")
            $('#noSolution').css("display", "block")
        }
    }

    /* Uses Backtracking to solve puzzle */
    function solveSudoku(arr) {
        let l = [0, 0]
        if (!findEmptyLocation(arr, l)) return true //puzzle is complete

        var row = l[0]
        var col = l[1]

        for (var i = 1; i < 10; i++) {
            if (availabilityCheck(arr, row, col, i)) {
                arr[row][col] = i //temporary assignment
                outputValue(row, col, i)
                if (solveSudoku(arr)) return true //onto next empty location
                arr[row][col] = 0 //undoes the assignment
                outputValue(row, col, 0)
            }
        }
        return false //This triggers the backtracking
    }

    /* Finds an empty location and gives it to l */
    function findEmptyLocation(arr, l) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (arr[i][j] == 0) {
                    l[0] = i
                    l[1] = j
                    return true
                }
            }
        }
        return false
    }

    /************************** Both ***************************/
    /* Places the inputs into a 2D array */
    function mapPositions(arr) {
        var position = 0 //tracks the position
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var str = '#' + position //creates the id for the square
                arr[i][j] = $(str).text() //takes the html text of the square as an input
                if (arr[i][j] == "") arr[i][j] = "0" //replaces an empty string with 0
                arr[i][j] = parseInt(arr[i][j]) //changes the string to an int
                position++
            }
        }
    }
    
    /* Shows the value on the board */
    function outputValue(row, col, num) {
        var position = (row * 9) + (col) //finds the correct square
        var str = '#' + position //makes that an id
        if (num != 0) $(str).text(num)
        else $(str).text("")
    }   

    /* Runs a check in all directions */
    function availabilityCheck(arr, hPos, Vpos, num) {
        return (verLineChecker(arr, Vpos, num) && horLineChecker(arr, hPos, num) && blockChecker(arr, hPos, Vpos, num))
    }

    /* Vertical line Checker */
    function verLineChecker(arr, Vpos, num) { 
        if(Vpos  > 8 || Vpos < 0) return //edge case to make sure no errors occur
        for (var i = 0; i < 9; i++) {
            if(arr[i][Vpos] == num ) {
                return false //this number is in the line
            }
        }
        return true
    }

    /* Hoizontal line Checker */
    function horLineChecker(arr, hPos, num) { //not working
        if(hPos  > 8 || hPos < 0) return //edge case to make sure no errors occur
        for (var i = 0; i < 9; i++) {
            if(arr[hPos][i] == num) {
                return false //this number is in the line
            }
        }
        return true
    }

    /* Block Checker Functions */
    function blockChecker (arr, hPos, vPos, num) {
        if(hPos  > 8 || vPos > 8 || hPos < 0 || vPos < 0) return //edge case to make sure no errors occur
        for (var i = lowestPosition(hPos); i <= highestPosition(hPos); i++) {
            for (var j = lowestPosition(vPos); j <= highestPosition(vPos); j++) {
                if(arr[i][j] == num) {
                    return false //this number is in the block
                }
            }
        }
        return true
    }

    /* Gets the lowest position in a block */
    function lowestPosition(pos) {
        if (pos < 3) return 0
        if (pos < 6) return 3
        if (pos < 9) return 6
    }

    /* Gets the highest position in a block */
    function highestPosition(pos) {
        if (pos < 3) return 2
        if (pos < 6) return 5
        if (pos < 9) return 8
    }

    /************************** Other **************************/
    /* Number Selector Button */
    $('.number').on('click', function(e) {
        //removes the active class if it's already there
        if ($(e.currentTarget).hasClass('active')) { 
            $('.number').removeClass('active')
            currentNum = ""
            return
        }
        $('.number').removeClass('active')
        $(e.currentTarget).addClass('active')
        currentNum = $('.active').text()
    })

    /* Square Input */
    $('.square').on('click', function(e) {
        $('.square').removeClass('selected')
        $(e.currentTarget).addClass('selected')
        $('.selected').text(currentNum)
    })

    $('.result').on('click', function(e) {
        $(e.currentTarget).hide()
    })

    $('#submit').on('click', function(e) {
        if($('#submit').text() == "Check") checker()
        if($('#submit').text() == "Solve") solver()
    })

    $(document).keypress(function(e) {
        switch(e.which){
            case 13:
            if($('#submit').text() == "Check") checker()
            if($('#submit').text() == "Solve") solver()
            break
            case 48: $('.number').removeClass('active')
            break
            case 49:
            $('.number').removeClass('active')
            $('#one').addClass('active') 
            break
            case 50:
            $('.number').removeClass('active')
            $('#two').addClass('active') 
            break
            case 51:
            $('.number').removeClass('active')
            $('#three').addClass('active') 
            break
            case 52:
            $('.number').removeClass('active')
            $('#four').addClass('active') 
            break
            case 53:
            $('.number').removeClass('active')
            $('#five').addClass('active') 
            break
            case 54:
            $('.number').removeClass('active')
            $('#six').addClass('active') 
            break
            case 55:
            $('.number').removeClass('active')
            $('#seven').addClass('active') 
            break
            case 56:
            $('.number').removeClass('active')
            $('#eight').addClass('active') 
            break
            case 57:
            $('.number').removeClass('active')
            $('#nine').addClass('active') 
            break
        }
    })
})