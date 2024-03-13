-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_2.txt 12/03

-- criar tabela usuarios nesse banco
CREATE TABLE usuarios(id serial primary key, name varchar(32), age integer);


-- b) Adicionar o primeiro usuário na tabela usuários.
INSERT INTO usuarios(name, age) VALUES ('Arnia', 20);


-- c) Adicionar o segundo usuário na tabela usuários.
INSERT INTO usuarios(name, age) VALUES ('Bruno', 25);


-- d) Adicionar 2 usuários na mesma query na tabela usuários.
INSERT INTO usuarios(name, age) VALUES ('Julio', 30), ('Caio', 18);


-- e) Retornar todos usuários da tabela.
SELECT * FROM usuarios;


-- f) Deletar a tabela usuários.
DROP TABLE usuarios;
