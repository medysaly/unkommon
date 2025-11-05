--
-- PostgreSQL database dump
--

\restrict pH2n14hUGiQ4ejJ43GCZ6gLFoeZWyqTrU3cbLaX8lUgRor7nJEFSbavaYbKGCyk

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_id_seq OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    company character varying(255),
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leads_id_seq OWNER TO postgres;

--
-- Name: leads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: leads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_users (id, username, password_hash, created_at) FROM stdin;
1	admin	$2b$10$jC/jEAhbdOW8molroDuORObJGrLCnOKf/vV6h2CKmtlGVRuidRZ4u	2025-11-03 02:13:38.11837
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leads (id, name, email, phone, company, message, created_at) FROM stdin;
1	Test User	test@example.com	123-456-7890	Test Company	This is a test message	2025-11-03 01:58:59.218913
2	Test User	test@example.com	\N	\N	This is a test message to verify the contact form integration works correctly.	2025-11-03 02:28:36.166473
3	Mehdi	medysalywork@gmail.com	17185001191	business automated	i want help	2025-11-03 02:36:25.719788
4	John Doe	john@example.com	+1 555-1234	Test Company	This is a test message to verify AWS SES email notifications are working correctly!	2025-11-03 03:17:41.416958
5	Mehdi	under.salhi@gmail.com	17185001191	business automated	test test test 	2025-11-03 03:21:38.579249
6	Test User	test@example.com	+1 (555) 123-4567	Test Company	This is a test message to verify the email notification system is working correctly.	2025-11-03 03:23:02.453372
7	Test User	test@example.com	+1 (555) 123-4567	Test Company	Testing the improved email template with better spam score.	2025-11-03 03:25:35.047951
8	mehdi	example@gmail.com	111-111-1111	testai	test test test	2025-11-03 03:26:57.444932
9	carlton	carltonexample@gmail.com	111-111-1111	AI comp	test test test	2025-11-03 16:19:38.747373
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leads_id_seq', 9, true);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_unique UNIQUE (username);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict pH2n14hUGiQ4ejJ43GCZ6gLFoeZWyqTrU3cbLaX8lUgRor7nJEFSbavaYbKGCyk

