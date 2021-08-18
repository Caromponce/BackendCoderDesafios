const socket = io();
socket.on('listaProd', data => {
    let htmlProductos = ``;
    data.forEach(element => {
        htmlProductos += `
        <tr>
            <td>${element.title}</td>
            <td>${element.price}</td>
            <td><img class="thumbnail" src="${element.thumbnail}" alt=""></td>
        </tr>`
    });
    document.getElementById('tableBody').innerHTML = htmlProductos;
})