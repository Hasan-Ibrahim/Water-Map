
USE [Jantrik.WaterQuest]
GO
/****** Object:  Table [dbo].[WaterSourceSubscription]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WaterSourceSubscription](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[UserId] [int] NOT NULL,
	[SourceId] [int] NOT NULL,
	[Type] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[WaterSourceSubscription] ON
INSERT [dbo].[WaterSourceSubscription] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [UserId], [SourceId], [Type]) VALUES (1, 1, CAST(0x0000A475009B7D3E AS DateTime), CAST(0x0000A475009B7D3E AS DateTime), 3, 1, 9)
SET IDENTITY_INSERT [dbo].[WaterSourceSubscription] OFF
/****** Object:  Table [dbo].[WaterSourceRating]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WaterSourceRating](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[WaterSourceId] [int] NOT NULL,
	[Potability] [int] NOT NULL,
	[UserId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[WaterSourceRating] ON
INSERT [dbo].[WaterSourceRating] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [WaterSourceId], [Potability], [UserId]) VALUES (1, 0, CAST(0x0000A4740143B1DF AS DateTime), CAST(0x0000A4740143B1DF AS DateTime), 1, 1000, NULL)
INSERT [dbo].[WaterSourceRating] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [WaterSourceId], [Potability], [UserId]) VALUES (2, 0, CAST(0x0000A4740143D94E AS DateTime), CAST(0x0000A4740143D94E AS DateTime), 1, 900, NULL)
SET IDENTITY_INSERT [dbo].[WaterSourceRating] OFF
/****** Object:  Table [dbo].[WaterSource]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[WaterSource](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[Shape] [geometry] NOT NULL,
	[SourceType] [varchar](max) NULL,
	[PotableRatingCount] [int] NOT NULL,
	[ProcessableRatingCount] [int] NOT NULL,
	[UnpotableRatingCount] [int] NOT NULL,
	[ImageUrls] [varchar](max) NOT NULL,
 CONSTRAINT [PK__WaterSou__3214EC071DE57479] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[WaterSource] ON
INSERT [dbo].[WaterSource] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [Shape], [SourceType], [PotableRatingCount], [ProcessableRatingCount], [UnpotableRatingCount], [ImageUrls]) VALUES (1, 0, CAST(0x0000A47401386683 AS DateTime), CAST(0x0000A47401386683 AS DateTime), 0x000000000104030000000000000000003E40000000000000244000000000000024400000000000003E400000000000004440000000000000444001000000010000000001000000FFFFFFFF0000000002, N'River', 1, 1, 0, N'')
SET IDENTITY_INSERT [dbo].[WaterSource] OFF
/****** Object:  Table [dbo].[UserToken]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserToken](
	[UserId] [int] NOT NULL,
	[Token] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[UserToken] ([UserId], [Token]) VALUES (3, N'Token')
/****** Object:  Table [dbo].[User]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[LoginId] [varchar](max) NOT NULL,
	[HashedPassword] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON
INSERT [dbo].[User] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [LoginId], [HashedPassword]) VALUES (1, 0, CAST(0x0000A47500000000 AS DateTime), CAST(0x0000A47500000000 AS DateTime), N'mohayemin', N'202cb962ac59075b964b07152d234b70')
INSERT [dbo].[User] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [LoginId], [HashedPassword]) VALUES (3, 0, CAST(0x0000A47500000000 AS DateTime), CAST(0x0000A47500000000 AS DateTime), N'TestUser', N'202cb962ac59075b964b07152d234b70')
SET IDENTITY_INSERT [dbo].[User] OFF
/****** Object:  Table [dbo].[Template]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Template](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
 CONSTRAINT [PK_Template] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [IX_Template] UNIQUE NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DailyAverageSupplySummary]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DailyAverageSupplySummary](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[GroupId] [uniqueidentifier] NOT NULL,
	[Location] [geometry] NOT NULL,
	[SupplyInLitre] [int] NOT NULL,
	[SupplyDate] [date] NOT NULL,
	[NumberOfPeople] [int] NOT NULL,
	[StressIndex] [float] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DailyAverageSupplySummary] ON
INSERT [dbo].[DailyAverageSupplySummary] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SupplyInLitre], [SupplyDate], [NumberOfPeople], [StressIndex]) VALUES (3, 0, CAST(0x0000A474008DE8CB AS DateTime), CAST(0x0000A474008DE8CB AS DateTime), N'e50e3812-22a0-49f7-be7e-05933bc9f2f9', 0x00000000010C0000000000C05E400000000000004740, 31, CAST(0xFA360B00 AS Date), 5, 0)
INSERT [dbo].[DailyAverageSupplySummary] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SupplyInLitre], [SupplyDate], [NumberOfPeople], [StressIndex]) VALUES (4, 0, CAST(0x0000A4740090E3D3 AS DateTime), CAST(0x0000A4740090E3D3 AS DateTime), N'43405026-6f56-413e-a72d-9837eba514dc', 0x00000000010C0000000000C05E400000000000004740, 31, CAST(0xFA360B00 AS Date), 5, 0.70322580645161292)
SET IDENTITY_INSERT [dbo].[DailyAverageSupplySummary] OFF
/****** Object:  Table [dbo].[DailyAverageSupply]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DailyAverageSupply](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[GroupId] [uniqueidentifier] NOT NULL,
	[Location] [geometry] NOT NULL,
	[SourceId] [int] NOT NULL,
	[SupplyInLitre] [int] NOT NULL,
	[SupplyDate] [date] NOT NULL,
	[NumberOfPeople] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DailyAverageSupply] ON
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (4, 0, CAST(0x0000A474008D6706 AS DateTime), CAST(0x0000A474008D6706 AS DateTime), N'd74f64dd-2278-4eb0-b374-ac3aa6175efe', 0x00000000010C0000000000C05E400000000000004740, 1, 13, CAST(0xFA360B00 AS Date), 5)
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (5, 0, CAST(0x0000A474008D6838 AS DateTime), CAST(0x0000A474008D6838 AS DateTime), N'd74f64dd-2278-4eb0-b374-ac3aa6175efe', 0x00000000010C0000000000C05E400000000000004740, 4, 18, CAST(0xFA360B00 AS Date), 5)
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (6, 0, CAST(0x0000A474008DE7E2 AS DateTime), CAST(0x0000A474008DE7E2 AS DateTime), N'e50e3812-22a0-49f7-be7e-05933bc9f2f9', 0x00000000010C0000000000C05E400000000000004740, 1, 13, CAST(0xFA360B00 AS Date), 5)
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (7, 0, CAST(0x0000A474008DE8C8 AS DateTime), CAST(0x0000A474008DE8C8 AS DateTime), N'e50e3812-22a0-49f7-be7e-05933bc9f2f9', 0x00000000010C0000000000C05E400000000000004740, 4, 18, CAST(0xFA360B00 AS Date), 5)
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (8, 0, CAST(0x0000A4740090E2CB AS DateTime), CAST(0x0000A4740090E2CB AS DateTime), N'43405026-6f56-413e-a72d-9837eba514dc', 0x00000000010C0000000000C05E400000000000004740, 1, 13, CAST(0xFA360B00 AS Date), 5)
INSERT [dbo].[DailyAverageSupply] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [GroupId], [Location], [SourceId], [SupplyInLitre], [SupplyDate], [NumberOfPeople]) VALUES (9, 0, CAST(0x0000A4740090E3CE AS DateTime), CAST(0x0000A4740090E3CE AS DateTime), N'43405026-6f56-413e-a72d-9837eba514dc', 0x00000000010C0000000000C05E400000000000004740, 4, 18, CAST(0xFA360B00 AS Date), 5)
SET IDENTITY_INSERT [dbo].[DailyAverageSupply] OFF
/****** Object:  Table [dbo].[AreaSubscription]    Script Date: 04/09/2015 19:01:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AreaSubscription](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreationTime] [datetime] NULL,
	[LastUpdateTime] [datetime] NULL,
	[UserId] [int] NOT NULL,
	[Area] [geometry] NOT NULL,
	[Type] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AreaSubscription] ON
INSERT [dbo].[AreaSubscription] ([Id], [IsDeleted], [CreationTime], [LastUpdateTime], [UserId], [Area], [Type]) VALUES (1, 1, CAST(0x0000A47500CB63C2 AS DateTime), CAST(0x0000A47500CB63C2 AS DateTime), 3, 0x000000000104050000000000000000003E4000000000000024400000000000004440000000000000444000000000000034400000000000004440000000000000244000000000000034400000000000003E40000000000000244001000000020000000001000000FFFFFFFF0000000003, 13)
SET IDENTITY_INSERT [dbo].[AreaSubscription] OFF
/****** Object:  Default [DF_WaterSource_Images]    Script Date: 04/09/2015 19:01:40 ******/
ALTER TABLE [dbo].[WaterSource] ADD  CONSTRAINT [DF_WaterSource_Images]  DEFAULT ('') FOR [ImageUrls]
GO

