--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: annotation; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE annotation (
    title text,
    description text,
    x integer,
    y integer,
    z integer,
    object3d integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.annotation OWNER TO gisuser;

--
-- Name: annotation_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE annotation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation_id_seq OWNER TO gisuser;

--
-- Name: annotation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE annotation_id_seq OWNED BY annotation.id;


--
-- Name: gallery; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE gallery (
    title text,
    "desc" text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.gallery OWNER TO gisuser;

--
-- Name: gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE gallery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gallery_id_seq OWNER TO gisuser;

--
-- Name: gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE gallery_id_seq OWNED BY gallery.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE media (
    title text,
    type text,
    path text,
    filename text,
    object3d integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.media OWNER TO gisuser;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO gisuser;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE media_id_seq OWNED BY media.id;


--
-- Name: object3d; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE object3d (
    title text,
    short_desc text,
    complete_desc text,
    category text,
    "filename_3D" text,
    filename_flat text,
    preview text,
    preview_animated text,
    published boolean,
    gallery integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.object3d OWNER TO gisuser;

--
-- Name: object3d_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE object3d_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.object3d_id_seq OWNER TO gisuser;

--
-- Name: object3d_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE object3d_id_seq OWNED BY object3d.id;


--
-- Name: passport; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE passport (
    protocol text,
    password text,
    provider text,
    identifier text,
    tokens json,
    "user" integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.passport OWNER TO gisuser;

--
-- Name: passport_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE passport_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passport_id_seq OWNER TO gisuser;

--
-- Name: passport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE passport_id_seq OWNED BY passport.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE "user" (
    username text,
    password text,
    profile text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."user" OWNER TO gisuser;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO gisuser;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE users (
    username text,
    password text,
    profile text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO gisuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO gisuser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY annotation ALTER COLUMN id SET DEFAULT nextval('annotation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY gallery ALTER COLUMN id SET DEFAULT nextval('gallery_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY media ALTER COLUMN id SET DEFAULT nextval('media_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY object3d ALTER COLUMN id SET DEFAULT nextval('object3d_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY passport ALTER COLUMN id SET DEFAULT nextval('passport_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: annotation_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY annotation
    ADD CONSTRAINT annotation_pkey PRIMARY KEY (id);


--
-- Name: gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (id);


--
-- Name: media_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: object3d_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY object3d
    ADD CONSTRAINT object3d_pkey PRIMARY KEY (id);


--
-- Name: passport_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY passport
    ADD CONSTRAINT passport_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

