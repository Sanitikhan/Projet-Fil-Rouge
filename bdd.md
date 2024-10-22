**SCHEMA SQL**

``` sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE Tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    assigned_to INT,
    description TEXT,
    deadline DATE,
    is_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    FOREIGN KEY (assigned_to) REFERENCES Users(id)
);

CREATE TABLE Group_Members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    group_id INT,
    user_id INT,
    role VARCHAR(50),
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

**Créer un utilisateur avec un rôle**
```sql
INSERT INTO Users (email, password, name, role)
VALUES ('jane@example.com', 'johnD', 'Jane', 'manager');
VALUES ('alice@example.com','alice123', 'Alice', 'manager')
```

**Stocker les rôles**
```sql
INSERT INTO Roles (name)
VALUES ('manager'), ('développeur'), ('designer');
```

**Ajouter des tâches pour un groupe spécifique et assigner à un utilisateur**
```sql
INSERT INTO Tasks (group_id, assigned_to, description, deadline, is_completed)
VALUES (1, 2, 'Compléter le rapport', '2024-10-30', 0);
```

**Ajouter un utilisateur en tant que membre d'une groupe**
```sql
INSERT INTO Group_Members (group_id, user_id, role)
VALUES (1, 2, 'member');
```

**Ajouter un nouveau groupe créé par un utilisateur (par exemple, un utilisateur avec l'ID `1`)**
``` sql
INSERT INTO Groups (name, created_by)
VALUES ('Projet Développement', 1);
```