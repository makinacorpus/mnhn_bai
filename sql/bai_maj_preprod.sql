alter table gallery add parent integer;


--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: gisuser
--

-- INSERT INTO gallery (title, "desc", parent, id, "createdAt", "updatedAt") VALUES ('Galerie principale', 'Galerie des objets 3D', NULL, 1, '2014-10-03 00:00:00+02', '2014-10-03 00:00:00+02');
-- INSERT INTO gallery (title, "desc", parent, id, "createdAt", "updatedAt") VALUES ('Galerie des cerveaux', 'Galerie des cerveaux', NULL, 2, '2014-10-03 00:00:00+02', '2014-12-18 14:53:26+01');


ALTER table ADD acquisition_params_en text;