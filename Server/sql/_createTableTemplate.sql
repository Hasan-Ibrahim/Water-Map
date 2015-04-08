USE [Jantrik.WaterQuest]
GO

/****** Object:  Table [dbo].[Template]    Script Date: 04/08/2015 17:50:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].$tableName$(
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY ,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL
 )
GO


