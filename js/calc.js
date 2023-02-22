const pastOperationText = document.getElementById('past-operation')
const currentOperationText = document.getElementById('present-operation')
const buttons = document.querySelectorAll('#button button')


class Calculator {
    constructor(pastOperationText, currentOperationText) {
        this.pastOperationText = pastOperationText
        this.currentOperationText = currentOperationText
        //valores que são impresso na tela

        this.currentOperation = ''
        //valores que estão sendo digitado no presente
    }

    addDigit(digit) {
        if(digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return
        }
        //checar se o currentOperation já tem um ponto(.)

        this.currentOperation = digit
        this.updateScreen()
        //adicionar digito na calculadora
    }

    processOperation(operation) {
        if(this.currentOperationText.innerText === '' && operation !== 'C') {
            if(this.pastOperationText.innerText !== '') {
                this.changeOperation(operation)
            }
            return
        }
        //Processar todos os operadores da calculadora

        let operationValue
        const previous = +this.pastOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText 
        //Pegar o valor atual e o anterior

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processoDelOperator()
                break
            case "CE":
                this.processoClearCurrentOperator()
                break
            case "C":
                this.processoClearOperator()
                break    
            case "=":
                this.processoIgualOperator()
                break
            default:
                return
        }
    }

    

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {
        console.log(operationValue, operation, current, previous)

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            if(previous === 0) {
                operationValue = current
            }
            //checar se o valor é 0, se for é só adicionar currentValue

            this.pastOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
        //mudar valores da calculadora 

    }

    changeOperation(operation) {

        const mathOperations = ['*', '/', '+', '-']

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.pastOperationText.innerText.slice(0, -1) + operation

    }

    processoDelOperator() {
        this.currentOperationText.innerText =
         this.currentOperationText.innerText.slice(0, -1)
    }

    processoClearCurrentOperator() {
        this.currentOperationText.innerText = ''
    }

    processoClearOperator() {
        this.currentOperationText.innerText = ''
        this.pastOperationText.innerText = ''
    }

    processoIgualOperator() {
        const operation = pastOperationText.innerText.split(' ')[1]

        this.processOperation(operation)
    }

    
}
//lógica da calculadora

const calc = new Calculator(pastOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText

        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})
