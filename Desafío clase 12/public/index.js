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