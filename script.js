let number = 0; // number that the calculator actually changes
var numberOperatorModeStorage; // storage for operations
var numberDecimalInitial; // storage variable for decimal
let display = document.getElementById("output"); // (I think?) stores the display as an object
let isOperatorMode = false; // Tells if the calculator is in an operator mode
let isNewDecimal = false; // Tells if there is a new decimal point on the current number
var operatorModeType; // String of what operation is happening

function check_if_float(numberToCheck) { // Checks if the number is a float and returns true if it is.
    if (numberToCheck % 1 !== 0){
        return true;
    } else {
        return false;
    };
};

function change_display(number) {
    // Make sure that the number will fit in the display
    let numberString = number.toString();

    // String comparisons are different because of the decimal. I think.
    if (check_if_float(numberString)){

        // Split the string into a list without the decimal
        let choppedNumber = numberString.split('.');

        // Checks if the float contains more than 13 digits
        if (choppedNumber[0].length + choppedNumber[1].length > 13) {
            
            // Round the number if it is bigger than 13.
            number = number.toFixed(13 - choppedNumber[0].length);
        }
    } else {
        // Checks if the int is larger than 13.
        if (numberString.length > 13){

            // Rounds if larger than 13 digits.
            number = number.toFixed(13);
        };
    };

    // Output the number to the display
    display.innerHTML = number.toString();
}

function append_number(localNumber, numToAppend) { // Append a digit onto the end of the currently selected digit.
    var return_to_num;
    var appendedNumber; // variable declarations for later use

    if (isNewDecimal){
        return_to_num = numberDecimalInitial + numToAppend;
        isNewDecimal = false;    
    } else {
        appendedNumber = localNumber.toString() + numToAppend;
        if (check_if_float(append_number)) {
            // Number is a float
            return_to_num = parseFloat(appendedNumber);
        } else{
            // Number is an int
            return_to_num = parseInt(appendedNumber);
        };
    };
    
    number = return_to_num;
    change_display(number);
};

function all_clear() {
    number = 0; // Resets the current number
    change_display(number);
};

function change_sign() {
    number = number * -1; // makes the number negative if positive, vice-versa
    change_display(number);
};

function multiply() {
    if (isOperatorMode) { // instantly multiply if already in operator mode
        number = number * numberOperatorModeStorage;
        change_display(number);
    };
    numberOperatorModeStorage = number;
    number = 0;
    isOperatorMode = true;
    operatorModeType = "multiply";
};

function divide() {
    if (isOperatorMode) { // instantly divide if already in operator mode
        number = numberOperatorModeStorage / number;
        change_display(number);
    };
    numberOperatorModeStorage = number;
    number = 0;
    isOperatorMode = true;
    operatorModeType = "divide";
};

function add() {
    if (isOperatorMode) { // instantly add if already in operator mode
        number = number + numberOperatorModeStorage;
        change_display(number);
    };
    numberOperatorModeStorage = number;
    number = 0;
    isOperatorMode = true;
    operatorModeType = "add";
};

function subtract() { // instantly subtract if already in operator mode
    if (isOperatorMode) {
        number = numberOperatorModeStorage - number;
        change_display(number);
    };
    numberOperatorModeStorage = number;
    number = 0;
    isOperatorMode = true;
    operatorModeType = "subtract";
};

function percent() {
    number = number / 100; // converts a percentage value into decimal.
    change_display(number);
};

function decimal() {
    numberDecimalInitial = number.toString() + '.';
    change_display(numberDecimalInitial);
    isNewDecimal = true;
};

function calculate() {
    if (isOperatorMode) { // checks if currently in operator mode
        switch (operatorModeType) { // switch statement that checks what operation turned on the operator mode
            case "multiply":
                number = number * numberOperatorModeStorage;
                break;
            case "divide":
                number = numberOperatorModeStorage / number;
                break;
            case "add":
                number = number + numberOperatorModeStorage;
                break;
            case "subtract":
                number = numberOperatorModeStorage - number;
                break;
            default:
                console.log("Something went wrong :("); // error message :P
        };
        isOperatorMode = false;
        operatorModeType = "none :o";
    };
    change_display(number);

};