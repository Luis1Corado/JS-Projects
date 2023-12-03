function evaluateExpression(){
    const eq = document.getElementById('equation').value;
    try{
        const result = customEval(eq);
        
            document.getElementById('Error').innerText = "RESULT IS " + result;
            add_historial2(eq, result);
        }
    catch (error){
        document.getElementById('equation').value = 'Error';
    }
}

function add_historial2(eq, result)
{
    const NewItem = document.createElement('li');
    NewItem.textContent = eq + " = " + result;
    document.getElementById('history').appendChild(NewItem);
}
function customEval(eq){
    const tokens = tokenize(eq);
    const trimmed_tokens = tokens.map(s => s.trim());
    const postfix = infixToPostfix(trimmed_tokens);
    const result = evaluatePostfix(postfix);
    return result;
}

function tokenize(eq){
    return eq.split(/([\+\-\*\/\(\)\^])/).filter(token => token.trim() !== '');
}

function infixToPostfix(tokens){
    const operator =[];
    const output = [];
    const string_operators = ['+','-','*','/','^'];

    const jerar = new Map([
        ['+',2],
        ['-',2],
        ['*',3],
        ['/',3],
        ['^',4]
    ]);
    
    for (let i = 0; i < tokens.length; i++)
    {
        if (isNaN(parseInt(tokens[i])))
        {
            if (string_operators.includes(tokens[i]))
            {
                if (operator.length != 0 && operator[operator.length-1] != '(')
                {
                   while ((jerar.get(tokens[i]) < jerar.get(operator[operator.length-1])) || ((jerar.get(tokens[i]) == jerar.get(operator[operator.length-1])) && tokens[i] != '^')){
                        output.push(operator.pop());
                   }
                    operator.push(tokens[i]);
                }
                else 
                {
                    operator.push(tokens[i]);
                }
            }
            else{
                if (tokens[i] == '('){
                    operator.push(tokens[i]);
                }
                else{
                    while (operator[operator.length-1] != '(')
                    {
                        if (parseInt(operator.length) == 0)
                        {
                            return 'ERROR #1';
                        }
                        output.push(operator.pop());
                    }
                    operator.pop();
                }
            }
        }   
        else{
            output.push(tokens[i]);
        }
    }

    while (operator.length !=0){
        if (operator[-1] == '(')
        {
            return 'ERROR #2';
        }
        output.push(operator.pop());
    }

    return output;
}
function performeOp(op1, op2, sign)
{
    switch (sign){
        case '+':
            return parseFloat(op1) + parseFloat(op2);
        case '-':
            return parseFloat(op1) - parseFloat(op2);
        case '*':
            return parseFloat(op1) * parseFloat(op2);
        case '/':
            return parseFloat(op1) / parseFloat(op2);
        case '^':
            return parseFloat(op1) ** parseFloat(op2);
    }
}
function evaluatePostfix(Postfixtokens)
{
    let stack = [];
    let temp;
    const string_operators = ['+','-','*','/','^'];
    while (parseInt(Postfixtokens.length) != 0)
    {
        temp = Postfixtokens.shift();
        if (string_operators.includes(temp))
        {
            let op2 = stack.pop();
            let op1 = stack.pop();
            stack.push(performeOp(op1, op2, temp));
        }
        else{
            stack.push(temp);
        }
    }
    return stack;
}