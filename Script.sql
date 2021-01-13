IF(DB_ID('StudentNotes') IS NULL)
	CREATE DATABASE StudentNotes
GO

USE StudentNotes;
GO

IF OBJECT_ID('Student') IS NULL
	CREATE TABLE Student
	(
	StudentId NVARCHAR(100) NOT NULL,
	StudentName NVARCHAR(100) NOT NULL,
	StudentEmail NVARCHAR(256) NOT NULL,
	StudentSchool NVARCHAR(100) NULL,
	CONSTRAINT PK_Student PRIMARY KEY (StudentId)
	)
GO

IF OBJECT_ID('Course') IS NULL
	CREATE TABLE Course
	(
	CourseId INT NOT NULL IDENTITY(1, 1),
	CourseName NVARCHAR(100) NOT NULL,
	CourseTag NVARCHAR(100),
	CONSTRAINT PK_Course PRIMARY KEY (CourseId)
	)
GO

IF OBJECT_ID('CourseStudent') IS NULL
	CREATE TABLE CourseStudent
	(
	CourseId INT NOT NULL,
	StudentId NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_CourseStudent PRIMARY KEY (CourseId, StudentId)
	)
GO

IF OBJECT_ID('FK_CourseStudent_Course') IS NULL
	ALTER TABLE CourseStudent ADD CONSTRAINT FK_CourseStudent_Course FOREIGN KEY (CourseId) REFERENCES Course(CourseId)
GO

IF OBJECT_ID('FK_CourseStudent_Student') IS NULL
	ALTER TABLE CourseStudent ADD CONSTRAINT FK_CourseStudent_Student FOREIGN KEY (StudentId) REFERENCES Student(StudentId)
GO

IF OBJECT_ID('Note') IS NULL
	CREATE TABLE Note
	(
	NoteId INT NOT NULL IDENTITY(1, 1),
	NoteTitle NVARCHAR(100) NULL,
	NoteContent NVARCHAR(MAX) NOT NULL,
	NoteDate DATETIME NOT NULL DEFAULT GETDATE(),
	CourseId INT NOT NULL,
	StudentId NVARCHAR(100) NOT NULL
	CONSTRAINT Pk_Note PRIMARY KEY (NoteId, CourseId, StudentId)
	)
GO

IF OBJECT_ID('FK_Note_Course') IS NULL
	ALTER TABLE Note ADD CONSTRAINT FK_Note_Course FOREIGN KEY (CourseId) REFERENCES Course(CourseId)
GO

IF OBJECT_ID('FK_Note_Student') IS NULL
	ALTER TABLE Note ADD CONSTRAINT FK_Note_Student FOREIGN KEY (StudentId) REFERENCES Student(StudentId)
GO

IF OBJECT_ID('StudyGroup') IS NULL
	CREATE TABLE StudyGroup
	(
	StudyGroupId INT NOT NULL IDENTITY(1, 1),
	StudyGroupName NVARCHAR(100) NOT NULL,
	StudyGroupDescription NVARCHAR(200),
	CourseId INT NOT NULL,
	CONSTRAINT PK_StudyGroup PRIMARY KEY (StudyGroupId)
	)
GO

IF OBJECT_ID('StudyGroupStudent') IS NULL
	CREATE TABLE StudyGroupStudent
	(
	StudyGroupId INT NOT NULL,
	StudentId NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_StudyGroupStudent PRIMARY KEY (StudyGroupId, StudentId)
	)
GO

IF OBJECT_ID('FK_StudyGroupStudent_StudyGroup') IS NULL
	ALTER TABLE StudyGroupStudent ADD CONSTRAINT FK_StudyGroupStudent_StudyGroup FOREIGN KEY (StudyGroupId) REFERENCES StudyGroup(StudyGroupId) ON DELETE CASCADE
GO

IF OBJECT_ID('FK_StudyGroupStudent_Student') IS NULL
	ALTER TABLE StudyGroupStudent ADD CONSTRAINT FK_StudyGroupStudent_Student FOREIGN KEY (StudentId) REFERENCES Student(StudentId) ON DELETE CASCADE
GO

IF OBJECT_ID('FK_StudyGroup_Course') IS NULL
	ALTER TABLE StudyGroup ADD CONSTRAINT FK_StudyGroup_Course FOREIGN KEY (CourseId) REFERENCES Course(CourseId) ON DELETE CASCADE
GO

