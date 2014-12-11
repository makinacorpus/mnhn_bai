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
    author text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.annotation OWNER TO gisuser;

--
-- Name: annotation_annotations_annotation__object3d_annotations; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE annotation_annotations_annotation__object3d_annotations (
    id integer NOT NULL,
    object3d_annotations integer,
    annotation_annotations_annotation integer
);


ALTER TABLE public.annotation_annotations_annotation__object3d_annotations OWNER TO gisuser;

--
-- Name: annotation_annotations_annotation__object3d_annotations_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE annotation_annotations_annotation__object3d_annotations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation_annotations_annotation__object3d_annotations_id_seq OWNER TO gisuser;

--
-- Name: annotation_annotations_annotation__object3d_annotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE annotation_annotations_annotation__object3d_annotations_id_seq OWNED BY annotation_annotations_annotation__object3d_annotations.id;


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
-- Name: collection; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE collection (
    category text,
    name text,
    short_name text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.collection OWNER TO gisuser;

--
-- Name: collection_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE collection_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collection_id_seq OWNER TO gisuser;

--
-- Name: collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE collection_id_seq OWNED BY collection.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE comment (
    comment text,
    author integer,
    object3d integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.comment OWNER TO gisuser;

--
-- Name: comment_comments_comment__object3d_comments; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE comment_comments_comment__object3d_comments (
    id integer NOT NULL,
    object3d_comments integer,
    comment_comments_comment integer
);


ALTER TABLE public.comment_comments_comment__object3d_comments OWNER TO gisuser;

--
-- Name: comment_comments_comment__object3d_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE comment_comments_comment__object3d_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comments_comment__object3d_comments_id_seq OWNER TO gisuser;

--
-- Name: comment_comments_comment__object3d_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE comment_comments_comment__object3d_comments_id_seq OWNED BY comment_comments_comment__object3d_comments.id;


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO gisuser;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE comment_id_seq OWNED BY comment.id;


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
-- Name: media_medias_media__object3d_medias; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE media_medias_media__object3d_medias (
    id integer NOT NULL,
    object3d_medias integer,
    media_medias_media integer
);


ALTER TABLE public.media_medias_media__object3d_medias OWNER TO gisuser;

--
-- Name: media_medias_media__object3d_medias_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE media_medias_media__object3d_medias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_medias_media__object3d_medias_id_seq OWNER TO gisuser;

--
-- Name: media_medias_media__object3d_medias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE media_medias_media__object3d_medias_id_seq OWNED BY media_medias_media__object3d_medias.id;


--
-- Name: object3d; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE object3d (
    title text,
    short_desc text,
    complete_desc text,
    category text,
    "filename_3D" text,
    dim_x integer,
    dim_y integer,
    dim_z integer,
    filename_flat text,
    preview text,
    preview_animated text,
    published boolean,
    copyright text,
    gallery integer,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.object3d OWNER TO gisuser;

--
-- Name: object3d_associated_object3d__object3d_associated; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE object3d_associated_object3d__object3d_associated (
    id integer NOT NULL,
    object3d_associated integer,
    object3d_associated_object3d integer
);


ALTER TABLE public.object3d_associated_object3d__object3d_associated OWNER TO gisuser;

--
-- Name: object3d_associated_object3d__object3d_associated_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE object3d_associated_object3d__object3d_associated_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.object3d_associated_object3d__object3d_associated_id_seq OWNER TO gisuser;

--
-- Name: object3d_associated_object3d__object3d_associated_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE object3d_associated_object3d__object3d_associated_id_seq OWNED BY object3d_associated_object3d__object3d_associated.id;


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
-- Name: passport; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
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


ALTER TABLE public.passport OWNER TO postgres;

--
-- Name: passport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE passport_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passport_id_seq OWNER TO postgres;

--
-- Name: passport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE passport_id_seq OWNED BY passport.id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE profile (
    name text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.profile OWNER TO gisuser;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: gisuser
--

CREATE SEQUENCE profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_seq OWNER TO gisuser;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gisuser
--

ALTER SEQUENCE profile_id_seq OWNED BY profile.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: gisuser; Tablespace: 
--

CREATE TABLE users (
    username text,
    password text,
    profile integer,
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

ALTER TABLE ONLY annotation_annotations_annotation__object3d_annotations ALTER COLUMN id SET DEFAULT nextval('annotation_annotations_annotation__object3d_annotations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY collection ALTER COLUMN id SET DEFAULT nextval('collection_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY comment_comments_comment__object3d_comments ALTER COLUMN id SET DEFAULT nextval('comment_comments_comment__object3d_comments_id_seq'::regclass);


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

ALTER TABLE ONLY media_medias_media__object3d_medias ALTER COLUMN id SET DEFAULT nextval('media_medias_media__object3d_medias_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY object3d ALTER COLUMN id SET DEFAULT nextval('object3d_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY object3d_associated_object3d__object3d_associated ALTER COLUMN id SET DEFAULT nextval('object3d_associated_object3d__object3d_associated_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY passport ALTER COLUMN id SET DEFAULT nextval('passport_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY profile ALTER COLUMN id SET DEFAULT nextval('profile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gisuser
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: annotation_annotations_annotation__object3d_annotations_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY annotation_annotations_annotation__object3d_annotations
    ADD CONSTRAINT annotation_annotations_annotation__object3d_annotations_pkey PRIMARY KEY (id);


--
-- Name: annotation_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY annotation
    ADD CONSTRAINT annotation_pkey PRIMARY KEY (id);


--
-- Name: collection_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY collection
    ADD CONSTRAINT collection_pkey PRIMARY KEY (id);


--
-- Name: comment_comments_comment__object3d_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY comment_comments_comment__object3d_comments
    ADD CONSTRAINT comment_comments_comment__object3d_comments_pkey PRIMARY KEY (id);


--
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (id);


--
-- Name: media_medias_media__object3d_medias_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY media_medias_media__object3d_medias
    ADD CONSTRAINT media_medias_media__object3d_medias_pkey PRIMARY KEY (id);


--
-- Name: media_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: object3d_associated_object3d__object3d_associated_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY object3d_associated_object3d__object3d_associated
    ADD CONSTRAINT object3d_associated_object3d__object3d_associated_pkey PRIMARY KEY (id);


--
-- Name: object3d_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY object3d
    ADD CONSTRAINT object3d_pkey PRIMARY KEY (id);


--
-- Name: passport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY passport
    ADD CONSTRAINT passport_pkey PRIMARY KEY (id);


--
-- Name: profile_pkey; Type: CONSTRAINT; Schema: public; Owner: gisuser; Tablespace: 
--

ALTER TABLE ONLY profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


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

