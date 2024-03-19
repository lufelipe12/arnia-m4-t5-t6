-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_2.txt 15/03 EXTRA

-- i) Crie mais uma tabela para referenciar a tabela produtos "store" ("ID" -> SERIAL PK, "name" VARCHAR(64) NOT NULL, "city" -> VARCHAR(64))
CREATE TABLE store(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  city VARCHAR(64)  
);


-- j) Faça uma modificação na tabela de produtos para aceitar uma FK store_id.
ALTER TABLE products 
	ADD COLUMN store_id INT,
	ADD CONSTRAINT fk_store_id
  	FOREIGN KEY (store_id) REFERENCES store(id);


-- k) Adicione valores a tabela "store"
INSERT INTO store (name, city) VALUES
    ('Loja A', 'Cidade A'),
    ('Loja B', 'Cidade B'),
    ('Loja C', 'Cidede C');
    
    
-- l) Faça um update na tabela de produtos para adicionar os ids das lojas criadas.
UPDATE products
	SET store_id = 3
	WHERE id >= 10;


-- m) Selecione todas lojas que possuem produtos em estoque.
SELECT * FROM store
	WHERE (
  	SELECT in_stock FROM products
      WHERE in_stock = true
      AND store_id = store.id
      GROUP BY in_stock  
  );

