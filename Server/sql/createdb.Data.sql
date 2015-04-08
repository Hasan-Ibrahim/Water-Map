--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-01-29 14:22:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2044 (class 1262 OID 88325)
-- Name: Jantrik.CodeWarrior15.Data; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Jantrik.CodeWarrior15.Data" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE "Jantrik.CodeWarrior15.Data" OWNER TO postgres;

\connect "Jantrik.CodeWarrior15.Data"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 7 (class 2615 OID 88326)
-- Name: app; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA app;


ALTER SCHEMA app OWNER TO postgres;

--
-- TOC entry 181 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2047 (class 0 OID 0)
-- Dependencies: 181
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = app, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 180 (class 1259 OID 112915)
-- Name: Category; Type: TABLE; Schema: app; Owner: postgres; Tablespace: 
--

CREATE TABLE "Category" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "ParentCategoryId" integer,
    "IsDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE "Category" OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 112913)
-- Name: Catagory_Id_seq; Type: SEQUENCE; Schema: app; Owner: postgres
--

CREATE SEQUENCE "Catagory_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Catagory_Id_seq" OWNER TO postgres;

--
-- TOC entry 2048 (class 0 OID 0)
-- Dependencies: 179
-- Name: Catagory_Id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: postgres
--

ALTER SEQUENCE "Catagory_Id_seq" OWNED BY "Category"."Id";


--
-- TOC entry 176 (class 1259 OID 97338)
-- Name: Product; Type: TABLE; Schema: app; Owner: postgres; Tablespace: 
--

CREATE TABLE "Product" (
    "Id" integer NOT NULL,
    "CreationTime" date NOT NULL,
    "LastUpdateTime" date NOT NULL,
    "Name" text NOT NULL,
    "Images" text,
    "Description" text,
    "CategoryId" integer NOT NULL,
    "OwnerId" integer,
    "IsDeleted" boolean DEFAULT false NOT NULL,
    "UnitPrice" double precision NOT NULL
);


ALTER TABLE "Product" OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 97336)
-- Name: Product_Id_seq; Type: SEQUENCE; Schema: app; Owner: postgres
--

CREATE SEQUENCE "Product_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Product_Id_seq" OWNER TO postgres;

--
-- TOC entry 2049 (class 0 OID 0)
-- Dependencies: 175
-- Name: Product_Id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: postgres
--

ALTER SEQUENCE "Product_Id_seq" OWNED BY "Product"."Id";


--
-- TOC entry 178 (class 1259 OID 112885)
-- Name: Purchase; Type: TABLE; Schema: app; Owner: postgres; Tablespace: 
--

CREATE TABLE "Purchase" (
    "Id" integer NOT NULL,
    "CreationTime" date NOT NULL,
    "BuyerId" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "ItemsCount" integer NOT NULL,
    "UnitPrice" double precision NOT NULL
);


ALTER TABLE "Purchase" OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 112883)
-- Name: Purchase_Id_seq; Type: SEQUENCE; Schema: app; Owner: postgres
--

CREATE SEQUENCE "Purchase_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Purchase_Id_seq" OWNER TO postgres;

--
-- TOC entry 2050 (class 0 OID 0)
-- Dependencies: 177
-- Name: Purchase_Id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: postgres
--

ALTER SEQUENCE "Purchase_Id_seq" OWNED BY "Purchase"."Id";


--
-- TOC entry 174 (class 1259 OID 88329)
-- Name: User; Type: TABLE; Schema: app; Owner: postgres; Tablespace: 
--

CREATE TABLE "User" (
    "Id" integer NOT NULL,
    "LoginId" character varying NOT NULL,
    "HashedPassword" character varying,
    "FullName" character varying,
    "IsDeleted" boolean DEFAULT false,
    "PhoneNumber" character varying,
    "IsOAuthUser" boolean DEFAULT false NOT NULL,
    "CreationTime" date DEFAULT now() NOT NULL,
    "LastUpdateTime" date DEFAULT now() NOT NULL
);


ALTER TABLE "User" OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 88327)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: app; Owner: postgres
--

CREATE SEQUENCE "User_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "User_Id_seq" OWNER TO postgres;

--
-- TOC entry 2051 (class 0 OID 0)
-- Dependencies: 173
-- Name: User_Id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: postgres
--

ALTER SEQUENCE "User_Id_seq" OWNED BY "User"."Id";


--
-- TOC entry 1911 (class 2604 OID 112918)
-- Name: Id; Type: DEFAULT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Category" ALTER COLUMN "Id" SET DEFAULT nextval('"Catagory_Id_seq"'::regclass);


--
-- TOC entry 1908 (class 2604 OID 97341)
-- Name: Id; Type: DEFAULT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Product" ALTER COLUMN "Id" SET DEFAULT nextval('"Product_Id_seq"'::regclass);


--
-- TOC entry 1910 (class 2604 OID 112888)
-- Name: Id; Type: DEFAULT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Purchase" ALTER COLUMN "Id" SET DEFAULT nextval('"Purchase_Id_seq"'::regclass);


--
-- TOC entry 1903 (class 2604 OID 88332)
-- Name: Id; Type: DEFAULT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "User" ALTER COLUMN "Id" SET DEFAULT nextval('"User_Id_seq"'::regclass);


--
-- TOC entry 1925 (class 2606 OID 112923)
-- Name: Catagory_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Category"
    ADD CONSTRAINT "Catagory_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1919 (class 2606 OID 97346)
-- Name: Product_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1922 (class 2606 OID 112890)
-- Name: Purchase_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1916 (class 2606 OID 88338)
-- Name: User_pkey; Type: CONSTRAINT; Schema: app; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1923 (class 1259 OID 112929)
-- Name: Catagory_Id_Idx; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE UNIQUE INDEX "Catagory_Id_Idx" ON "Category" USING btree ("Id" NULLS FIRST);

ALTER TABLE "Category" CLUSTER ON "Catagory_Id_Idx";


--
-- TOC entry 1917 (class 1259 OID 97352)
-- Name: Product_Id_Inx; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE UNIQUE INDEX "Product_Id_Inx" ON "Product" USING btree ("Id" NULLS FIRST);

ALTER TABLE "Product" CLUSTER ON "Product_Id_Inx";


--
-- TOC entry 1913 (class 1259 OID 88340)
-- Name: User_Id_idx; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE INDEX "User_Id_idx" ON "User" USING btree ("Id");

ALTER TABLE "User" CLUSTER ON "User_Id_idx";


--
-- TOC entry 1914 (class 1259 OID 88339)
-- Name: User_LoginId_idx; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE INDEX "User_LoginId_idx" ON "User" USING btree ("LoginId");


--
-- TOC entry 1926 (class 1259 OID 112930)
-- Name: fki_Catagory_ParentCatagory; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE INDEX "fki_Catagory_ParentCatagory" ON "Category" USING btree ("ParentCategoryId");


--
-- TOC entry 1920 (class 1259 OID 112873)
-- Name: fki_product_owner_fkey; Type: INDEX; Schema: app; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_product_owner_fkey ON "Product" USING btree ("OwnerId");


--
-- TOC entry 1930 (class 2606 OID 112924)
-- Name: Catagory_ParentCatagory; Type: FK CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Category"
    ADD CONSTRAINT "Catagory_ParentCatagory" FOREIGN KEY ("ParentCategoryId") REFERENCES "Category"("Id") ON DELETE SET NULL;


--
-- TOC entry 1927 (class 2606 OID 112868)
-- Name: product_owner_fkey; Type: FK CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Product"
    ADD CONSTRAINT product_owner_fkey FOREIGN KEY ("OwnerId") REFERENCES "User"("Id");


--
-- TOC entry 1928 (class 2606 OID 112891)
-- Name: purchase_buyer_fkey; Type: FK CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Purchase"
    ADD CONSTRAINT purchase_buyer_fkey FOREIGN KEY ("BuyerId") REFERENCES "User"("Id");


--
-- TOC entry 1929 (class 2606 OID 112896)
-- Name: purchase_product_fkey; Type: FK CONSTRAINT; Schema: app; Owner: postgres
--

ALTER TABLE ONLY "Purchase"
    ADD CONSTRAINT purchase_product_fkey FOREIGN KEY ("ProductId") REFERENCES "Product"("Id");


--
-- TOC entry 2046 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-01-29 14:22:24

--
-- PostgreSQL database dump complete
--

