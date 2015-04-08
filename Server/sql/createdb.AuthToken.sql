--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-01-29 14:20:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1998 (class 1262 OID 88350)
-- Name: Jantrik.CodeWarrior15.AuthToken; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "Jantrik.CodeWarrior15.AuthToken" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


\connect "Jantrik.CodeWarrior15.AuthToken"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 7 (class 2615 OID 88351)
-- Name: app; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app;


--
-- TOC entry 174 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2001 (class 0 OID 0)
-- Dependencies: 174
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = app, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 121045)
-- Name: UserToken; Type: TABLE; Schema: app; Owner: -; Tablespace: 
--

CREATE TABLE "UserToken" (
    "Token" character varying NOT NULL,
    "UserId" integer NOT NULL
);


--
-- TOC entry 1884 (class 2606 OID 121052)
-- Name: UserToken_pkey; Type: CONSTRAINT; Schema: app; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "UserToken"
    ADD CONSTRAINT "UserToken_pkey" PRIMARY KEY ("UserId");


--
-- TOC entry 1881 (class 1259 OID 121053)
-- Name: UserToken_Token_idx; Type: INDEX; Schema: app; Owner: -; Tablespace: 
--

CREATE INDEX "UserToken_Token_idx" ON "UserToken" USING btree ("Token");

ALTER TABLE "UserToken" CLUSTER ON "UserToken_Token_idx";


--
-- TOC entry 1882 (class 1259 OID 121054)
-- Name: UserToken_UserId_idx; Type: INDEX; Schema: app; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX "UserToken_UserId_idx" ON "UserToken" USING btree ("UserId");


--
-- TOC entry 2000 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-01-29 14:20:55

--
-- PostgreSQL database dump complete
--

