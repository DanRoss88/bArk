--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: contributions; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.contributions (
    id integer NOT NULL,
    user_id integer,
    story_id integer,
    content text,
    accepted_status boolean DEFAULT false,
    num_of_upvotes integer DEFAULT 0
);


ALTER TABLE public.contributions OWNER TO labber;

--
-- Name: contributions_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.contributions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contributions_id_seq OWNER TO labber;

--
-- Name: contributions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.contributions_id_seq OWNED BY public.contributions.id;


--
-- Name: stories; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.stories (
    id integer NOT NULL,
    user_id integer,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    published_status boolean DEFAULT false NOT NULL,
    date_created timestamp without time zone
);


ALTER TABLE public.stories OWNER TO labber;

--
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_id_seq OWNER TO labber;

--
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: contributions id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.contributions ALTER COLUMN id SET DEFAULT nextval('public.contributions_id_seq'::regclass);


--
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: contributions; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.contributions (id, user_id, story_id, content, accepted_status, num_of_upvotes) FROM stdin;
1	3	1	After completing all of his tricks, Dob was given four whole treats	f	0
2	1	2	Because he was so fluffy, Sam was considered to be the best snuggler and the goodest boy	f	0
3	2	3	Rottie looked like a big tough guard dog, but really, she was the biggest sweetheart	f	0
\.


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.stories (id, user_id, title, content, published_status, date_created) FROM stdin;
1	1	title 1	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis mauris, consectetur sit amet congue et, rutrum eu risus. Integer in lectus vulputate, porta mi ac, feugiat diam. Nullam pellentesque lorem sed faucibus blandit. Etiam malesuada, erat quis rhoncus posuere, nisi quam auctor leo, finibus commodo lorem nulla eget orci. Nullam tempus porttitor tortor ut tincidunt. Integer dui ligula, semper quis nunc quis, finibus sollicitudin velit. Quisque risus felis, feugiat sollicitudin finibus sed, luctus eget purus. Curabitur semper erat ultrices semper scelerisque. Ut mattis scelerisque nulla, commodo faucibus nunc pellentesque sit amet. Ut et lorem ac elit hendrerit sagittis. Ut tempus velit a sapien congue venenatis. Curabitur vitae vehicula tellus. Nam vulputate pulvinar ipsum, in tempor nisl placerat vel. Morbi malesuada arcu id uldtricies luctus. Pellentesque laoreet eleifend egestas. Sed vulputate at lacus in elementum. Proin at lacus porttitor, egestas massa at, dapibus leo. Curabitur finibus fringilla molestie. Curabitur dapibus cursus varius. Aenean imperdiet placerat augue a mattis. Nulla facilisi.	f	\N
2	2	title 2	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis mauris, consectetur sit amet congue et, rutrum eu risus. Integer in lectus vulputate, porta mi ac, feugiat diam. Nullam pellentesque lorem sed faucibus blandit. Etiam malesuada, erat quis rhoncus posuere, nisi quam auctor leo, finibus commodo lorem nulla eget orci. Nullam tempus porttitor tortor ut tincidunt. Integer dui ligula, semper quis nunc quis, finibus sollicitudin velit. Quisque risus felis, feugiat sollicitudin finibus sed, luctus eget purus. Curabitur semper erat ultrices semper scelerisque. Ut mattis scelerisque nulla, commodo faucibus nunc pellentesque sit amet. Ut et lorem ac elit hendrerit sagittis. Ut tempus velit a sapien congue venenatis. Curabitur vitae vehicula tellus. Nam vulputate pulvinar ipsum, in tempor nisl placerat vel. Morbi malesuada arcu id ultricies luctus. Pellentesque laoreet eleifend egestas. Sed vulputate at lacus in elementum. Proin at lacus porttitor, egestas massa at, dapibus leo. Curabitur finibus fringilla molestie. Curabitur dapibus cursus varius. Aenean imperdiet placerat augue a mattis. Nulla facilisi.	f	\N
3	3	title 3	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis mauris, consectetur sit amet congue et, rutrum eu risus. Integer in lectus vulputate, porta mi ac, feugiat diam. Nullam pellentesque lorem sed faucibus blandit. Etiam malesuada, erat quis rhoncus posuere, nisi quam auctor leo, finibus commodo lorem nulla eget orci. Nullam tempus porttitor tortor ut tincidunt. Integer dui ligula, semper quis nunc quis, finibus sollicitudin velit. Quisque risus felis, feugiat sollicitudin finibus sed, luctus eget purus. Curabitur semper erat ultrices semper scelerisque. Ut mattis are you gonna notice nulla, commodo faucibus nunc pellentesque sit amet. Ut et lorem ac elit hendrerit sagittis. Ut tempus velit a sapien congue venenatis. Curabitur vitae vehicula tellus. Nam vulputate pulvinar ipsum, in tempor nisl placerat vel. Morbi malesuada arcu id you will not find me luctus. Pellentesque laoreet eleifend egestas. Sed vulputate at lacus in elementum. Proin at lacus porttitor, egestas massa at, dapibus leo. Curabitur finibus fringilla molestie. Curabitur dapibus cursus varius. Aenean imperdiet placerat augue a mattis. Nulla facilisi.	t	\N
4	3	title 4	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis mauris, consectetur sit amet congue et, rutrum eu risus. Integer in lectus vulputate, porta mi ac, feugiat diam. Nullam pellentesque lorem sed faucibus blandit. English? Erat quis rhoncus posuere, nisi quam auctor leo, finibus commodo lorem nulla eget orci. Nullam tempus porttitor tortor ut tincidunt. Integer dui ligula, semper quis nunc quis, finibus sollicitudin velit. Quisque risus felis, feugiat sollicitudin finibus sed, luctus eget purus. Curabitur semper erat ultrices semper scelerisque. Ut mattis scelerisque nulla, commodo faucibus nunc pellentesque sit amet. Ut et lorem ac elit hendrerit sagittis. Ut tempus velit a sapien congue venenatis. Curabitur vitae vehicula tellus. Nam vulputate pulvinar ipsum, in tempor nisl placerat vel. Morbi malesuada arcu id ultricies luctus. Pellentesque laoreet eleifend egestas. Sed vulputate at lacus in elementum. Proin at lacus porttitor, egestas massa at, dapibus leo. Curabitur finibus fringilla molestie. Curabitur dapibus cursus varius. Aenean imperdiet placerat augue a mattis. Nulla facilisi.	f	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY public.users (id, name, username, email, password) FROM stdin;
1	Dob Herman	dobermann	bigdog1@example.com	password1@1
2	Sam Oya	samoyed	reallyfluffy@example.com	password1@1
3	Rottie Wild	rottweiler	bigdog2@example.com	password1@1
\.


--
-- Name: contributions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.contributions_id_seq', 3, true);


--
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.stories_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: contributions contributions_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_pkey PRIMARY KEY (id);


--
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: contributions contributions_story_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_story_id_fkey FOREIGN KEY (story_id) REFERENCES public.stories(id) ON DELETE CASCADE;


--
-- Name: contributions contributions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.contributions
    ADD CONSTRAINT contributions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: stories stories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

