-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_2.txt 15/03


-- a) Crie uma nova tabela "evaluation" ("ID" -> SERIAL PK, "description" TEXT, "rating" -> INT de 0 a 5 NOT NULL, "product_id" -> FK product.id com deleção em cascata)
CREATE TABLE evaluation (
    ID SERIAL PRIMARY KEY,
    description TEXT,
    rating INT CHECK (rating >= 0 AND rating <= 5) NOT NULL,
  	productsId INT NOT NULL UNIQUE,
    FOREIGN KEY (productsId) REFERENCES products(id) ON DELETE CASCADE
);


-- b) Faça a inserção de dados nessa tabela criada referenciando os produtos avaliados (obrigatoriamente um deles sem descrição.)
INSERT INTO evaluation (description, rating, productsId) 
	VALUES 
	('Esta é uma avaliação positiva do produto A', 4, 1),
	('Avaliação neutra do produto B', 3, 2),
	(null, 1, 3);



-- c) Selecione os dados da tabela de produtos juntamente com as de avaliações.
SELECT p.*, e.description, e.rating FROM products p
	LEFT JOIN evaluation e ON p.id = e.productsId;


-- d) Selecione os produtos que tiveram avaliação igual ou acima de "rating" 4.
SELECT p.*, e.description, e.rating FROM products p
	JOIN evaluation e ON p.id = e.productsId
	WHERE e.rating >= 4;


-- e) Selecione os produtos que a avaliação = NULL.
SELECT p.* FROM products p
	LEFT JOIN evaluation e ON p.id = e.productsId
	WHERE e.rating IS NULL;

-- dois jeitos é válido de acordo com enunciado
SELECT p.* FROM products p
	RIGHT JOIN evaluation e ON p.id = e.productsId
	WHERE e.description IS NULL;
  

-- f) Faça a contagem do total de linhas na tabela de avaliações.
SELECT COUNT(*) AS total_linhas FROM evaluation;


-- g) Delete um dos produtos da tabela produtos.
DELETE FROM products WHERE id = 3;


-- h) Faça a contagem do total de linhas na tabela de avaliações.
SELECT COUNT(*) AS total_linhas FROM evaluation;








