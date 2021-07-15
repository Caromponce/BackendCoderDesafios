//Consigna 1
function Usuario(nombreParam, apellidoParam, librosParam, mascotasParam) {
    this.nombre = nombreParam;
    this.apellido = apellidoParam;
    this.libros = librosParam || [];
    this.mascotas = mascotasParam || [];
}

Usuario.prototype.getFullName = function () {
    return (`${this.nombre} ${this.apellido}`)
}
Usuario.prototype.addMascota = function (mascota) {
    this.mascotas.push(mascota);
}
Usuario.prototype.getMascotas = function () {
    return this.mascotas.length;
}
Usuario.prototype.addBook = function (bookParam, autorParam) {
    this.libros.push({
        nombre: bookParam,
        autor: autorParam
    })
}
Usuario.prototype.getBook = function () {
    return this.libros.map(libro => libro.nombre)
}

let user1 = new Usuario('John', 'Doe', null, ['Gato']);
user1.addMascota('perro');
user1.addBook('El Túnel', 'Ernesto Sabato');
user1.addBook('El principito', 'Antoine de Saint-Exupéry')
console.log(`El nombre del usuario es ${user1.getFullName()}.`);
console.log(`La cantidad de mascotas que tiene el usuario es ${user1.getMascotas()}.`);
console.log(`${user1.getBook()}`);