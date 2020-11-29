IF(DB_ID('StudentNotes') IS NULL)
	CREATE DATABASE StudentNotes
GO

USE StudentNotes;
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