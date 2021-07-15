const operacion = async (num1: number, num2: number, nomOp: string) => {
    return await import(`./${nomOp}`)
        .then((modulo) => {
            const obj = new modulo.default(num1, num2);
            return obj.resultado();
        })
        .catch(err => {
            console.log(err);
        })
}

const operaciones = () => {
    operacion(4, 15, "suma")
        .then(resultado => {
            console.log(`El resultado de la operación 4 + 15 es ${resultado}.`)
        })
    operacion(10, 4, "resta")
        .then(resultado => {
            console.log(`El resultado de la operación 10 - 4 es ${resultado}.`)
        })
}
operaciones();