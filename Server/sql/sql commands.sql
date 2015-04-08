create database "Jantrik.CodeWarrior15.Data" with OWNER = postgres
create schema app AUTHORIZATION postgres

create table if not exists app."User" (
"Id" SERIAL PRIMARY KEY,
"LoginId" varchar NOT NULL,
"HashedPassword" varchar NOT NULL,
"FullName" varchar,
"PhoneNumber" varchar,
"IsDeleted" boolean DEFAULT False
);

create index on app."User" ("LoginId")
create index on app."User" ("Id")

cluster app."User" using "User_Id_idx"

ALTER TABLE app."User"
   ADD COLUMN "IsOAuthUser" boolean NOT NULL DEFAULT false;


Insert Into app."User"("LoginId", "HashedPassword", "FullName") 
Values('tajkia@gmail.com', '202cb962ac59075b964b07152d234b70', 'Tajkia Rahman Toma')

-- Table: app."Catagory"

-- DROP TABLE app."Catagory";

CREATE TABLE app."Catagory"
(
  "Id" integer NOT NULL,
  "Name" text NOT NULL,
  "ParentCatagoryId" integer NOT NULL,
  CONSTRAINT "Catagory_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT "Catagory_ParentCatagory" FOREIGN KEY ("ParentCatagoryId")
      REFERENCES app."Catagory" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE SET NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE app."Catagory"
  OWNER TO postgres;

-- Index: app."Catagory_Id_Idx"

-- DROP INDEX app."Catagory_Id_Idx";

CREATE UNIQUE INDEX "Catagory_Id_Idx"
  ON app."Catagory"
  USING btree
  ("Id" NULLS FIRST);
ALTER TABLE app."Catagory" CLUSTER ON "Catagory_Id_Idx";

-- Index: app."fki_Catagory_ParentCatagory"

-- DROP INDEX app."fki_Catagory_ParentCatagory";

CREATE INDEX "fki_Catagory_ParentCatagory"
  ON app."Catagory"
  USING btree
  ("ParentCatagoryId");


-- Table: app."Product"

-- DROP TABLE app."Product";

CREATE TABLE app."Product"
(
  "Id" serial NOT NULL,
  "CreationTime" date NOT NULL,
  "LastUpdateTime" date NOT NULL,
  "Name" text NOT NULL,
  "UnitPrice" money NOT NULL,
  "Images" text,
  "Description" text,
  "CatagoryId" integer NOT NULL,
  "OwnerId" integer,
  CONSTRAINT "Product_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT product_owner_fkey FOREIGN KEY ("OwnerId")
      REFERENCES app."User" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE app."Product"
  OWNER TO postgres;

-- Index: app."Product_Id_Inx"

-- DROP INDEX app."Product_Id_Inx";

CREATE UNIQUE INDEX "Product_Id_Inx"
  ON app."Product"
  USING btree
  ("Id" NULLS FIRST);
ALTER TABLE app."Product" CLUSTER ON "Product_Id_Inx";

-- Index: app.fki_product_owner_fkey

-- DROP INDEX app.fki_product_owner_fkey;

CREATE INDEX fki_product_owner_fkey
  ON app."Product"
  USING btree
  ("OwnerId");
  
  -- Table: read."ProductRead"

-- DROP TABLE read."ProductRead";

CREATE TABLE read."ProductRead"
(
  "Id" integer NOT NULL,
  "UnitPrice" money NOT NULL,
  "RaterCount" integer NOT NULL DEFAULT 0,
  "Images" text,
  "Description" text,
  "Rating" double precision NOT NULL DEFAULT 0,
  "BuyerCount" integer NOT NULL DEFAULT 0,
  "Catagory" text,
  "OwnerId" integer,
  CONSTRAINT "ProductRead_pkey" PRIMARY KEY ("Id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE read."ProductRead"
  OWNER TO postgres;


-- Table: app."Purchase"

-- DROP TABLE app."Purchase";

CREATE TABLE app."Purchase"
(
  "Id" serial NOT NULL,
  "CreationTime" date NOT NULL,
  "LastUpdateTime" date NOT NULL,
  "BuyerId" integer NOT NULL,
  "ProductId" integer NOT NULL,
  "ItemsCount" integer NOT NULL,
  "UnitPrice" money NOT NULL,
  CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Id"),
  CONSTRAINT purchase_buyer_fkey FOREIGN KEY ("BuyerId")
      REFERENCES app."User" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT purchase_product_fkey FOREIGN KEY ("ProductId")
      REFERENCES app."Product" ("Id") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE app."Purchase"
  OWNER TO postgres;

  
------------- READ DATABASE-----------------------------


CREATE TABLE read."ProductRead"
(
  "Id" integer NOT NULL,
  "UnitPrice" money NOT NULL,
  "RaterCount" integer NOT NULL DEFAULT 0,
  "Images" text,
  "Description" text,
  "Rating" double precision NOT NULL DEFAULT 0,
  "BuyerCount" integer NOT NULL DEFAULT 0,
  "Catagory" text,
  "OwnerId" integer,
  CONSTRAINT "ProductRead_pkey" PRIMARY KEY ("Id")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE read."ProductRead"
  OWNER TO postgres;


--------------------------------------------------------------------------
create database "Jantrik.CodeWarrior15.AuthToken" with OWNER = postgres
create schema app AUTHORIZATION postgres

create table if not exists app."UserToken" (
"Token" varchar PRIMARY KEY,
"UserId" int NOT NULL
);

create index on app."UserToken" ("Token")

cluster app."UserToken" using "UserToken_Token_idx"