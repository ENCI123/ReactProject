DROP table if EXISTS courses CASCADE;

CREATE TABLE courses (
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30),
    c_desc varchar(30) not null,
    details        VARCHAR(256) NOT NULL,
    selected bool not null
);


INSERT INTO courses(name, c_desc, details, selected)	
        VALUES ('SWEN-250', 'Personal SW eng', 'C and vi', FALSE);
INSERT INTO courses(name, c_desc, details, selected)	
        VALUES ('SWEN-331', 'Secure SW Eng', 'Fuzzer, fuzzer, fuzzer', FALSE);
INSERT INTO courses(name, c_desc, details, selected)	
        VALUES ('SWEN-344', 'Web Engineering', 'More than web pages', FALSE);
INSERT INTO courses(name, c_desc, details, selected)	
        VALUES ('SWEN-440', 'SW System Architecture', 'What is a service?', FALSE);


