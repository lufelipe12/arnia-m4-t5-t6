-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_2.txt 14/03


-- a) Crie uma nova tabela "products" ("ID" -> SERIAL PK; "name" -> VARCHAR(100) NOT NULL; "description" VARCHAR(255); "in_stock" -> BOOLEAN NOT NULL; "price" FLOAT)
CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  in_stock BOOLEAN NOT NULL,
  price FLOAT
);


-- b) Utilize a query em query.sql para popular a tabela "products"
INSERT INTO products (name, description, in_stock, price)
VALUES
    ('EletroLux MaxClean', 'Aspirador de pó de alta potência com tecnologia MaxClean', true, 149.99),
    ('GourmetMaster Chef Pro', 'Forno elétrico com funções avançadas para chefs e amantes da culinária', true, 329.99),
    ('LuxuryDream King', 'Colchão ortopédico de luxo para noites de sono perfeitas', true, 799.99),
    ('InovaPhone X', 'Smartphone com câmera tripla de 48MP e desempenho excepcional', true, 599.99),
    ('FlexiFit Gym Pro', 'Esteira dobrável com sistema de amortecimento avançado para treinos intensos', true, 899.99),
    ('AquaGlow Spa Oasis', 'Banheira de hidromassagem com iluminação LED e jatos ajustáveis', false, 1299.99),
    ('BioGrow Indoor Garden', 'Horta interna automatizada para ervas e vegetais frescos o ano todo', true, 249.99),
    ('ZenSound NoiseBlock', 'Fones de ouvido com cancelamento de ruído para uma experiência sonora tranquila', true, 179.99),
    ('AdventureQuest Trekker 3000', 'Mochila resistente à água com múltiplos compartimentos para aventureiros', true, 79.99),
    ('SolarBeam Eco Charger', 'Carregador solar portátil para dispositivos eletrônicos em movimento', true, 49.99),
    ('StylishGlow Makeup Mirror', 'Espelho de maquiagem com iluminação ajustável para uma aplicação perfeita', true, 39.99),
    ('PetPal Deluxe Bed', 'Cama de pelúcia de luxo para mimar seu amigo peludo', true, 89.99),
    ('UltimaRide Electric Scooter', 'Patinete elétrico de alta velocidade para uma viagem eficiente', true, 299.99),
    ('NatureScape Canvas Print', 'Obra de arte em tela de paisagem natural para decoração de interiores', false, 79.99),
    ('SkyGaze Star Tracker', 'Telescópio automático para observação de estrelas e planetas', true, 199.99),
    ('SerenityBreeze Aroma Diffuser', 'Difusor de aromas para criar uma atmosfera relaxante em casa', true, 34.99),
    ('FitTrack Health Monitor', 'Monitor de saúde inteligente que rastreia métricas vitais e atividades físicas', true, 129.99),
    ('ArtisticTouch Drawing Tablet', 'Tablet de desenho sensível à pressão para artistas digitais', true, 179.99),
    ('HomeGuard Smart Security', 'Sistema de segurança residencial com câmeras de alta definição', false, 249.99),
    ('MiniWanderlust Globe', 'Globo terrestre decorativo em miniatura para os amantes de viagens', true, 24.99);


-- c) Selecione todas colunas dos produtos que começam com a letra "S".
SELECT * FROM products WHERE name LIKE 'S%';


-- d) Selecione a conta dos produtos que começam com a letra "S".
SELECT SUM(price) FROM products WHERE name ILIKE 'S%';


-- e) Selecione o produto com maior "price".
SELECT * FROM products
	WHERE price = (
    SELECT MAX(price) FROM products
	);
  
  
SELECT * FROM products ORDER BY price DESC LIMIT 1;


-- f) Faça a soma de todos "price".
SELECT SUM(price) FROM products;



-- g) Selecione todas colunas de todos produtos ordenando por "name".
SELECT * FROM products ORDER BY name;


-- h) Selecione todos produtos com "in_stock" = true agrupando por "in_stock"
SELECT in_stock FROM products 
	WHERE in_stock = true
  GROUP BY in_stock;
  
  
-- i) Retorne a média do "price" de todos produtos.
SELECT AVG(price) FROM products;


SELECT CAST(AVG(price) AS NUMERIC(10, 2)) AS media_price
FROM products;

SELECT ROUND(AVG(price)::numeric, 2) FROM products;
  