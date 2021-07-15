//Consigna 2
class Usuario {
    constructor(nombreParam, apellidoParam, librosParam, mascotasParam) {
        this.nombre = nombreParam;
        this.apellido = apellidoParam;
        this.libros = librosParam || [];
        this.mascotas = mascotasParam || [];
    }
    getFullName() {
        return (`${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }
    getMascotas() {
        return this.mascotas.length;
    }
    addBook(bookParam, autorParam) {
        this.libros.push({
            nombre: bookParam,
            autor: autorParam
        })
    }
    getBook() {
        return this.libros.map(libro => libro.nombre)
    }
}
let user1 = new Usuario('John', 'Doe', null, ['Gato']);
user1.addMascota('perro');
user1.addBook('El Túnel', 'Ernesto Sabato');
user1.addBook('El principito', 'Antoine de Saint-Exupéry')
console.log(`El nombre del usuario es ${user1.getFullName()}.`);
console.log(`La cantidad de mascotas que tiene el usuario es ${user1.getMascotas()}.`);
console.log(`${user1.getBook()}`);