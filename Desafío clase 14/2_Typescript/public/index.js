const socket = io();
socket.on('listaProd', data => {
    datos = data.data;
    let htmlProductos = ``;

    datos.forEach(element => {
        htmlProductos += `
        <tr>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td><img class="thumbnail" src="${element.thumbnail}" alt=""></td>
        </tr>`

    });
    if (document.getElementById('tableBody')) {
        document.getElementById('tableBody').innerHTML = htmlProductos;
    } else {
        document.getElementById('pageListaProd').innerHTML = `<div class="bg-light">
        <h2>Productos:</h2>
        <table class="table" id="tablaProductos">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Foto</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                ${htmlProductos}
            </tbody>
        </table>
    </div>`;
    }
})



socket.on('messages', function (data) {
    let htmlMensajes = ``;
    data.forEach(element => {
        htmlMensajes += `
            <div>
                <span class="email">${element.author}</span>
                <span class="date"> [ ${element.time} ]: </span>
                <span class="text">${element.text}</span>
            </div>`
    });
    document.getElementById('messages').innerHTML += htmlMensajes;
});


function addMessage(e) {
    const today = new Date();
    let mensaje = {
        author: document.getElementById('username').value,
        time: `${today.toISOString().split('T')[0]} - ${today.toISOString().split('T')[1]}`,
        text: document.getElementById('texto').value,
    };
    socket.emit('new-message', mensaje);
    return false;
}