const operacionTerminada = (numeroPalabras) => {
    console.log(`Operación terminada, la cantidad de palabras que contiene el texto es ${numeroPalabras}`);
}
const mostrarTexto = (texto, callback, intervalo = 1000) => {
    const palabrasTexto = texto.split(" ");
    let contador = 0;
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            if (palabrasTexto[contador]) {
                console.log(palabrasTexto[contador]);
                contador++;
            } else {
                clearInterval(timer);
                callback(contador);
                resolve();
            }
        }, intervalo);
    })
}
mostrarTexto("Buenos días", operacionTerminada)
    .then(() => mostrarTexto("Buenas tardes", operacionTerminada))
    .then(() => mostrarTexto("Buenas noches", operacionTerminada, 3000));