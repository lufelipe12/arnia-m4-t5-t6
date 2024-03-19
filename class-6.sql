-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_3.txt 18/03


-- a) Remova a coluna "store_id" da tabela de produtos.
ALTER TABLE products
	DROP COLUMN store_id;


-- b) Crie uma nova tabela "product_store" para ser a tabela pivô da relação N:N product - store.
CREATE TABLE product_store (
  product_id INT,
  store_id INT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (store_id) REFERENCES store(id)
);


-- c) Adicione valores a essa tabela.
INSERT INTO product_store (product_id, store_id) VALUES
    (2, 1),
    (2, 2),
    (4, 1),
    (4, 2);


-- d) Listar o nome e a cidade de todas as lojas que têm pelo menos um produto em estoque.
SELECT DISTINCT name, city FROM store
	JOIN product_store ps ON ps.store_id = store.id
	WHERE (
  	SELECT in_stock FROM products
      WHERE in_stock = true
      AND ps.product_id = products.id
      GROUP BY in_stock  
  );
	

--e) Listar o nome e a cidade de todas as lojas que possuem produtos com avaliação média maior ou igual a 4.
SELECT name, city FROM store
	JOIN product_store ps ON ps.store_id = store.id
  JOIN evaluation e ON ps.product_id = e.productsid
  WHERE e.rating >= 4;


-- f) Listar o nome e cidade de todas lojas que possuem produtos com preço superior a 50.
SELECT DISTINCT s.name, s.city FROM store s
	JOIN product_store ps ON ps.store_id = s.id
	JOIN products p ON ps.product_id = p.id
  WHERE p.price > 50;


-- g) Obtenha o nome das lojas e o número total de avaliações registradas para cada loja.
SELECT s.name, COUNT(e.id) FROM store s
	LEFT JOIN product_store ps ON ps.store_id = s.id
	LEFT JOIN evaluation e ON ps.product_id = e.productsid
  GROUP BY s.name;


