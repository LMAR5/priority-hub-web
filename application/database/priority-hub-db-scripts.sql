
----------------------------------------------------------------------
-- 1) Create the database where the tables will be stored
----------------------------------------------------------------------

CREATE DATABASE priorityhubdb;

----------------------------------------------------------------------
-- 2) Set the created database as the default database.
----------------------------------------------------------------------

USE priorityhubdb;

-------------------------------------------------------------------------------
-- 3) Create the tables where data will be stored, before inserting data. 
-- 1st create the "User" table + insert data, and then the "Category", "Task", 
-- "ActivityTracker" tables + insert data
-------------------------------------------------------------------------------

-- 3a) Create "User" table
CREATE TABLE User (
    Id INT NOT NULL AUTO_INCREMENT,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Status NVARCHAR(20) NOT NULL,
    Birthday DATE,
    ZipCode NVARCHAR(20),
    Country NVARCHAR(50),
    Address NVARCHAR(255),
    ProfilePictureURI NVARCHAR(255),
    EmailConfirmed TINYINT(1) DEFAULT 0,
    CreatedBy NVARCHAR(100) DEFAULT NULL,
    CreatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastUpdatedBy NVARCHAR(100) DEFAULT NULL,
    LastUpdatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

INSERT INTO User (Email,Password,FirstName,LastName,Status,Birthday,ZipCode,Country,Address,ProfilePictureURI,EmailConfirmed,CreatedBy,CreatedDateTime,LastUpdatedBy,LastUpdatedDateTime) 
VALUES 
('jsmith@example.com','Password123#','John','Smith','ACTIVE','2006-10-03','91234','USA','Nice Drive 123','',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('lmessi@other.com','Test123#','Lionel','Messi','ACTIVE','1987-06-24','98765','Argentina','Cup Street 987','',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('lhamilton@example.com','Formula123#','Lewis','Hamilton','ACTIVE','1987-06-24','12345','UK','F1 Drive 345','',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP());

-- 3b) Create "Category" table and insert its data

CREATE TABLE Category
(
    Id INT NOT NULL AUTO_INCREMENT,
    Title NVARCHAR(50) NOT NULL,
    Description NVARCHAR(250) DEFAULT NULL,
    Deleted TINYINT(1) NOT NULL DEFAULT 0,
    CreatedBy NVARCHAR(50) NULL DEFAULT NULL,
    CreatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastUpdatedBy NVARCHAR(50) DEFAULT NULL,
    LastUpdatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

INSERT INTO Category (Title, Description, Deleted, CreatedBy, CreatedDateTime, LastUpdatedBy, LastUpdatedDateTime) 
VALUES 
('Study','This category is for all tasks relared to study. Either school or university studies',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Work','This category is for all tasks related to my work. Either to complete reports, present documents, meetings, etc.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Personal','This is for all my tasks that are personal. Like spending time with family, some personal hobbies, etc.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('University','This category is for all tasks related to school. University studies specific.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Exercise','This category is for all tasks related to exercise.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Projects','This category is for all tasks related to projects.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Home Improvement','This category is for all tasks related to home improvement.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Pet','This category is for all tasks related to pets, both dogs and cats.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Cooking','This category is for all tasks related to cooking. Prep work and whatever else.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Other','This category is for all tasks unrelated to the other categories.',0,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP());

-- 3c) Create "Task" table (after Category table because of Foreign key)

CREATE TABLE Task
(
    Id INT NOT NULL AUTO_INCREMENT,
    Title NVARCHAR(50) NOT NULL,
    Description NVARCHAR(255) DEFAULT NULL,
    CategoryId INT NOT NULL,
    UserId INT NOT NULL,
    Status NVARCHAR(20) NOT NULL,
    Priority NVARCHAR(20) NOT NULL,
    Completed TINYINT(1) NOT NULL DEFAULT 0,
    Deleted TINYINT(1) NOT NULL DEFAULT 0,
    IsFavorite TINYINT(1) NOT NULL DEFAULT 0,
    DueDate DATETIME DEFAULT NULL,
    Notes NVARCHAR(1000) NULL,
    CreatedBy NVARCHAR(100) NULL DEFAULT NULL,
    CreatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastUpdatedBy NVARCHAR(100) DEFAULT NULL,
    LastUpdatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),    
    FOREIGN KEY (CategoryId) REFERENCES Category(Id),
    FOREIGN KEY (UserId) REFERENCES User(Id)
);

INSERT INTO Task (Title, Description, CategoryId, UserId, Status, Priority, Completed, Deleted, IsFavorite, DueDate, Notes, CreatedBy, CreatedDateTime, LastUpdatedBy, LastUpdatedDateTime)
VALUES
('Take out the dog', 'I need to spent some time taking the dog out for a walk',3,1,'Pending','Low',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 10 DAY),'Sample notes for 1','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Work on Assignment 5', 'Need to get started with the newly assigned Assignment 5 for CSC 415.',1,1,'Pending','Medium',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 11 DAY),'Sample notes for 2','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Castle Preschool Data Upload', 'Import castle preschools subject data into the Castle job.',2,1,'Pending','High',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 2 DAY),'Sample notes for 3','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Hang Picture Frame', 'Need to run to home deopt to grab the stuff needed to hang the picture frame.',3,2,'Pending','Low',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 5 DAY),'Sample notes for 4','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('CSC 620 Discussion Post', 'Post based on this weeks reading to the discussion forum.',1,2,'Pending','Low',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 2 DAY),'Sample notes for 5','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Create admin software data', 'Export admin software data for each of this years jobs.',2,2,'Pending','Medium',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 2 DAY),'Sample notes for 6','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('CSC 648 Milestone 2', 'Get the file and all of the code ready for milestone 2 submission.',6,3,'In Progress','High',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 1 DAY),'Sample notes for 7','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Prep dog food for week', 'Need to buy meat and cook the dogs meals for the entire week.',8,3,'Pending','Medium',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 3 DAY),'Sample notes for 8','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Clean the Apartment', 'Replant all plants, vacuum, wipe down surfaces.',7,3,'Pending','Low',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 5 DAY),'Sample notes for 9','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
('Prep for dinner', 'Clean, peel and boil potatoes. Wash vegtables and prep for cooking.',9,3,'Pending','High',0,0,0,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 1 DAY),'Sample notes for 10','System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP());

-- Below statement: Add 10 days to the datetime of the moment we insert the record.
-- SELECT DATE_ADD(UTC_TIMESTAMP(), INTERVAL 10 DAY);

-- 3d) Create the ActivityTracker table and insert sample data

CREATE TABLE ActivityTracker
(
    Id INT NOT NULL AUTO_INCREMENT,
    Title NVARCHAR(50) NULL,
    StartTime DATETIME,
    StopTime DATETIME,
    Notes NVARCHAR(1000) NULL,
    TaskId INT NOT NULL,
    Deleted TINYINT(1) NOT NULL DEFAULT 0,
    CreatedBy NVARCHAR(100) NULL DEFAULT NULL,
    CreatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastUpdatedBy NVARCHAR(100) DEFAULT NULL,
    LastUpdatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    FOREIGN KEY (TaskId) REFERENCES Task(Id)
);

INSERT INTO ActivityTracker (StartTime, StopTime, Notes, TaskId, CreatedBy, CreatedDateTime, LastUpdatedBy, LastUpdatedDateTime) 
VALUES 
(DATE_ADD(UTC_TIMESTAMP(), INTERVAL -2 HOUR),DATE_ADD(UTC_TIMESTAMP(), INTERVAL -1 HOUR),'Sample notes for activity tracker 1',1,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
(DATE_ADD(UTC_TIMESTAMP(), INTERVAL -8 HOUR),DATE_ADD(UTC_TIMESTAMP(), INTERVAL -6 HOUR),'Sample notes for activity tracker 2',2,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP()),
(DATE_ADD(UTC_TIMESTAMP(), INTERVAL -11 HOUR),DATE_ADD(UTC_TIMESTAMP(), INTERVAL -10 HOUR),'Sample notes for activity tracker 3',3,'System',UTC_TIMESTAMP(),'System',UTC_TIMESTAMP());