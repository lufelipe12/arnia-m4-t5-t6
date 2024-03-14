-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_2.txt 13/03


--a) Se não tiver criada, recriar a tabela de usuarios da aula anterior com os mesmos campos (id -> PK; name -> VARCHAR(32), age -> INTEGER).
CREATE TABLE usuarios(id serial primary key, name varchar(32), age integer);


-- b) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (email -> VARCHAR(64))
ALTER TABLE usuarios ADD COLUMN email VARCHAR(64);


-- c) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (isAdmin -> BOOLEAN DEFAULT FALSE)
ALTER TABLE usuarios ADD COLUMN isadmin BOOLEAN DEFAULT FALSE;


-- d) Alterar o nome da coluna "name" para "first_name"
ALTER TABLE usuarios RENAME COLUMN name TO first_name;


-- e) Adicionar mais uma coluna na tabela usuarios utilizando o ADD COLUMN (last_name -> VARCHAR(32) NOT NULL)
ALTER TABLE usuarios ADD COLUMN last_name VARCHAR(32) NOT NULL;


-- f) Fazer a criação de um ou mais usuários com idade maior que 20 anos.
INSERT INTO usuarios(first_name, last_name, email, age) VALUES 
	('Julio', 'Ribeiro', 'julio@gmail.com', 30),
	('Caio', 'Almeida', 'caio@gmail.com', 23);
  
  
-- g) Deletar os usuarios com idade maior que 20 anos retornando tudo.
DELETE FROM usuarios 
	WHERE age > 20 
  RETURNING *;
 
  
-- h) Altere o "isAdmin" de um dos usuarios para true.
UPDATE usuarios SET isadmin = TRUE WHERE id = 3;