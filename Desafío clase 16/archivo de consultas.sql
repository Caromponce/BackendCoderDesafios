use prueba;
drop table if exists items;
create table items
(
id int not null auto_increment,
nombre varchar(50),
categoria varchar(50) not null,
stock int unsigned,
primary key (id) 
);

insert into items (nombre, categoria, stock) values ('fideos', 'harina', 20);
insert into items (nombre, categoria, stock) values ('leche', 'lacteos', 30);
insert into items (nombre, categoria, stock) values ('crema', 'lacteos' , 15); 

select * from items;

delete from items where id=1;

update items set stock=45 where id=2;

select * from items;