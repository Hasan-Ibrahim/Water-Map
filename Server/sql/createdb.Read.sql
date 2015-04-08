--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-01-29 14:22:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2012 (class 1262 OID 97330)
-- Name: Jantrik.CodeWarrior15.Read; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Jantrik.CodeWarrior15.Read" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE "Jantrik.CodeWarrior15.Read" OWNER TO postgres;

\connect "Jantrik.CodeWarrior15.Read"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 7 (class 2615 OID 112853)
-- Name: read; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA read;


ALTER SCHEMA read OWNER TO postgres;

--
-- TOC entry 175 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2015 (class 0 OID 0)
-- Dependencies: 175
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = read, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 112857)
-- Name: ProductRead; Type: TABLE; Schema: read; Owner: postgres; Tablespace: 
--

CREATE TABLE "ProductRead" (
    "Id" integer NOT NULL,
    "RaterCount" integer DEFAULT 0 NOT NULL,
    "Images" text,
    "Description" text,
    "Rating" double precision DEFAULT 0 NOT NULL,
    "BuyerCount" integer DEFAULT 0 NOT NULL,
    "Category" text,
    "OwnerId" integer,
    "IsDeleted" boolean DEFAULT false NOT NULL,
    "Name" text,
    "UnitPrice" double precision NOT NULL
);


ALTER TABLE "ProductRead" OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 112874)
-- Name: PurchaseRead; Type: TABLE; Schema: read; Owner: postgres; Tablespace: 
--

CREATE TABLE "PurchaseRead" (
    "UserId" integer NOT NULL,
    "ProductId" integer NOT NULL,
    "ProductName" text,
    "Quantity" integer DEFAULT 0 NOT NULL,
    "Id" integer NOT NULL,
    "IsDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE "PurchaseRead" OWNER TO postgres;

--
-- TOC entry 1893 (class 2606 OID 112867)
-- Name: ProductRead_pkey; Type: CONSTRAINT; Schema: read; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "ProductRead"
    ADD CONSTRAINT "ProductRead_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1898 (class 2606 OID 121056)
-- Name: PurchaseRead_pkey; Type: CONSTRAINT; Schema: read; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "PurchaseRead"
    ADD CONSTRAINT "PurchaseRead_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 1894 (class 1259 OID 113049)
-- Name: Product_Id_Idx; Type: INDEX; Schema: read; Owner: postgres; Tablespace: 
--

CREATE UNIQUE INDEX "Product_Id_Idx" ON "ProductRead" USING btree ("Id");


--
-- TOC entry 1895 (class 1259 OID 113050)
-- Name: Product_Rating_Idx; Type: INDEX; Schema: read; Owner: postgres; Tablespace: 
--

CREATE INDEX "Product_Rating_Idx" ON "ProductRead" USING btree ("Rating");


--
-- TOC entry 1896 (class 1259 OID 121057)
-- Name: PurchaseRead_UserId_Idx; Type: INDEX; Schema: read; Owner: postgres; Tablespace: 
--

CREATE INDEX "PurchaseRead_UserId_Idx" ON "PurchaseRead" USING btree ("UserId");


--
-- TOC entry 2014 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-01-29 14:22:55

--
-- PostgreSQL database dump complete
--

