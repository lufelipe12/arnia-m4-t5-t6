-- https://github.com/lufelipe12/arnia-m4-t5-t6/blob/exercises/exercicios/semana_3.txt 19/03


-- a) Crie uma tabela "developers" ("id" -> UUID PK; "name" -> VARCHAR(100) NOT NULL; "skills" -> VARCHAR(200) NOT NULL; "is_active" -> BOOLEAN DEFAULT TRUE; "experience_years" -> INT NOT NULL; "created_at" -> DATE DEFAULT NOW);
CREATE TABLE developers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    skills VARCHAR(200) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    experience_years INT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);


--b) Crie uma tabela "projects" ("id" -> UUID PK; "project_name" -> VARCHAR(100) NOT NULL; "start_date" -> DATE, "created_at" -> DATE DEFAULT NOW);
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  project_name VARCHAR(100) NOT NULL, 
  start_date DATE, 
  created_at DATE DEFAULT NOW()
);


--c) Crie uma tabela pivô "developer_projects" para relacionar as duas primeiras tabelas N:N;
CREATE TABLE developer_projects (
  developer_id UUID NOT NULL,
  project_id UUID NOT NULL,
  FOREIGN KEY (developer_id) REFERENCES developers(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  PRIMARY KEY (developer_id, project_id)
);


--d) Insira os dados presentes em query2.sql
INSERT INTO developers (name, skills, is_active, experience_years)
VALUES
    ('John Smith', 'Java, Python', TRUE, 5),
    ('Emily Johnson', 'C#, SQL', TRUE, 3),
    ('Michael Brown', 'JavaScript, HTML', FALSE, 2),
    ('Sophia Wilson', 'Python, Ruby', TRUE, 4),
    ('William Davis', 'C++, Java', TRUE, 6),
    ('Emma Jones', 'PHP, SQL', FALSE, 1),
    ('Liam Martinez', 'Java, JavaScript', TRUE, 7),
    ('Olivia Thompson', 'Python, CSS', TRUE, 4),
    ('Noah Anderson', 'C#, HTML', FALSE, 2),
    ('Ava Garcia', 'JavaScript, Ruby', TRUE, 5),
    ('Ethan Martinez', 'Java, SQL', TRUE, 6),
    ('Isabella Walker', 'Python, HTML', TRUE, 3),
    ('Mason Taylor', 'C++, JavaScript', FALSE, 1),
    ('Mia White', 'C#, PHP', TRUE, 4),
    ('James Hall', 'Python, Java', TRUE, 5),
    ('Charlotte Lee', 'JavaScript, CSS', FALSE, 2),
    ('Benjamin Turner', 'C++, Ruby', TRUE, 7),
    ('Amelia Adams', 'Java, SQL', TRUE, 6),
    ('Harper Hill', 'Python, HTML', TRUE, 0),
    ('Lucas Martinez', 'C#, JavaScript', FALSE, 11);
    
    
INSERT INTO projects (project_name, start_date)
VALUES
    ('E-Commerce Website', '2023-01-15'),
    ('Mobile App Development', '2023-02-20'),
    ('Data Analytics Platform', '2023-03-10'),
    ('CRM System Enhancement', '2023-04-05'),
    ('Inventory Management App', '2023-05-12'),
    ('Financial Dashboard', '2023-06-18'),
    ('Healthcare App', '2023-07-25'),
    ('E-Learning Platform', '2023-08-10'),
    ('Social Media Integration', '2023-09-02'),
    ('AI Chatbot Development', '2023-10-15');
  

--e) Popule a tabela de "developer_projects"
INSERT INTO developer_projects (developer_id, project_id) VALUES
		('017b0f47-f784-495d-b67a-485b2faf2b24', '122dc5be-7afa-4961-a5be-4206c77a4fa1'),
    ('5c893936-6227-460e-a945-00b9ebe5e75d', '4d0db781-dbca-46f3-b812-55226553268f');



--f) Liste os programadores que estão atribuídos a projetos e mostre os nomes dos projetos aos quais estão atribuídos.
SELECT d.name dev_name, p.project_name project_name
	FROM developers d
  JOIN developer_projects dp ON d.id = dp.developer_id
  JOIN projects p ON p.id = dp.project_id;



--g) Liste o project_name e o start_date dos projetos que possuem pelo menos um programador com mais de 5 anos de experience_years.
SELECT DISTINCT p.project_name, p.start_date 
  FROM projects p
  JOIN developer_projects dp ON p.id = dp.project_id
  JOIN developers d ON dp.developer_id = d.id
  WHERE d.experience_years >= 5;



--h) Conte quantos programadores estão envolvidos no projeto com nome 'Mobile App Development'.
SELECT COUNT(*) AS number_devs_involved 
  FROM developers d
  JOIN developer_projects dp ON d.id = dp.developer_id
  JOIN projects p ON p.id = dp.project_id
  WHERE p.project_name = 'Mobile App Development';



--i) Liste os projetos que não têm programadores atribuídos.
SELECT p.project_name
  FROM projects p 
  LEFT JOIN developer_projects dp ON p.id = dp.project_id
  WHERE dp.developer_id IS NULL;

-- Ou (usando NOT IN)
SELECT p.project_name  FROM projects p
  WHERE p.id NOT IN (SELECT project_id FROM developer_projects);



