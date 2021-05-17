drop table if exists employees;
drop table if exists departments;

CREATE TABLE departments
(
    id                 serial primary key,
    name    varchar(30) NOT NULL unique,
    active             bool      default true,
    createdTimestamp  TIMESTAMP default current_timestamp,
    modifiedTimestamp TIMESTAMP default current_timestamp
);

CREATE TABLE employees
(
    id                 serial primary key,
    firstName         varchar(15)  NOT NULL,
    lastName          varchar(15)  NOT NULL,
    email              varchar(100) NOT NULL UNIQUE,
    departmentId      integer,
    active             bool      default true,
    createdTimestamp  TIMESTAMP default current_timestamp,
    modifiedTimestamp TIMESTAMP default current_timestamp
);


Alter table employees
    add constraint employees_fk FOREIGN KEY (departmentId) REFERENCES departments (id);


Insert into departments (name)
VALUES ('engineering');
Insert into departments (name)
VALUES ('marketing');
Insert into departments (name)
VALUES ('human resources');
Insert into departments (name)
VALUES ('business');
Insert into departments (name)
VALUES ('sales');

INSERT into employees (firstName, lastName, email, departmentId)
values ('Mark', 'Hamill', 'markhamill@example.com', 1);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Tom', 'Cruise', 'tomcruise@example.com', 1);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Jim', 'Parsons', 'jimparsons@example.com', 2);
INSERT into employees (firstName, lastName, email, departmentId)
values ('David', 'Beckham', 'davidbeckham@example.com', 2);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Ross', 'Geller', 'rossgeller@example.com', 3);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Monica', 'Geller', 'monicageller@example.com', 3);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Rachel', 'Green', 'rachelgreen@example.com', 4);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Joey', 'Tribbiani', 'joeytribbiani@example.com', 4);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Chandler', 'Bing', 'chandlerbing@example.com', 5);
INSERT into employees (firstName, lastName, email, departmentId)
values ('Phoebe', 'Buffay', 'phoebebuffay@example.com', 5);