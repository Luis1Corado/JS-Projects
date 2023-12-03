
let input = document.getElementById('Number');
var temp;
var state;
function print_value(num){
    input.value  += num;  
}

function clearInput(){
    let input = document.getElementById('Number');
    input.value ='';
}

function performeOperation(operation){
    temp = parseFloat(input.value);
    state = operation;
    clearInput();
}

function add_historial(temp, current, operator){
    let newItem = document.createElement('li');  
    newItem.textContent = temp + ' ' + operator + ' ' + current + ' = ' + res; 
    document.getElementById('history').appendChild(newItem);
}
function result(){
    let newItem = document.createElement('li');
    let current;
    switch (state) {
        case 1:
            current = parseFloat(input.value);
            res = temp + current;
            add_historial(temp, current, '+');
            input.value = res;
            break;
        case 2:
            current = parseFloat(input.value);
            res = temp - current;
            add_historial(temp, current, '-');
            input.value = res;
            break;
        case 3:
            current = parseFloat(input.value);
            res = temp * current;
            add_historial(temp, current, '*');
            input.value = res;
            break;
        case 4:
            current = parseFloat(input.value);
            res = temp / current;
            add_historial(temp, current, '/');
            input.value = res;
            break;
    }
}


document.getElementById('bplus').onclick = function () {performeOperation(1);};
document.getElementById('bminus').onclick = function () {performeOperation(2);};
document.getElementById('btimes').onclick = function () {performeOperation(3);};
document.getElementById('bdivision').onclick = function () {performeOperation(4);};
document.getElementById('equal').onclick = result; 

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            print_value(event.key);
            break;
        case '+':
            performeOperation(1);
            break;
        case '-':
            performeOperation(2);
            break;
        case '*':
            performeOperation(3);
            break;
        case '/':
            performeOperation(4);
            break;
        case 'o':
            clearInput();
            break;
        // ... handle other operators ...
        case '=':
            result();
            break;
        default:
            break;
    }
});
 