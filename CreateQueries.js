const { indexToTable, tableToIndex } = require("./TableNames");

const createQueries = {
  [indexToTable[0]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[0]]}
(
    id uuid NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    display_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    removed boolean,
    CONSTRAINT group_pkey PRIMARY KEY (id)
)
  `,
  [indexToTable[1]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[1]]}
(
    id uuid NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    display_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    removed boolean NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
)
  `,
  [indexToTable[2]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[2]]}
(
    id uuid NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    display_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permission_pkey PRIMARY KEY (id)
)
  `,
  [indexToTable[3]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[3]]}
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    logo character varying COLLATE pg_catalog."default" NOT NULL,
    banner character varying COLLATE pg_catalog."default",
    removed boolean,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    CONSTRAINT organization_pkey PRIMARY KEY (id)
)
  `,
  [indexToTable[4]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[4]]}
(
    id uuid NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    display_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT status_pkey PRIMARY KEY (id)
)
  `,
  [indexToTable[5]]: `
  CREATE TABLE IF NOT EXISTS public.${[indexToTable[5]]}
(
    id uuid NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    avatar character varying(200) COLLATE pg_catalog."default",
    socials json,
    CONSTRAINT users_pkey PRIMARY KEY (id)  
)
  `,
  [indexToTable[6]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[6]]}
(
    id uuid NOT NULL,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default",
    logo character varying(200) COLLATE pg_catalog."default",
    banner character varying(200) COLLATE pg_catalog."default",
    status_text character varying(200) COLLATE pg_catalog."default",
    org_id uuid NOT NULL,
    removed boolean,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    start_date timestamp without time zone,
    end_date timestamp without time zone,

    CONSTRAINT project_pkey PRIMARY KEY (id),
    CONSTRAINT fk_organization_id FOREIGN KEY (org_id)
        REFERENCES public.${[indexToTable[3]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[7]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[7]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    group_id uuid,
    role_id uuid,
    CONSTRAINT group_role_pkey PRIMARY KEY (id),
    CONSTRAINT group_role_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES public.${[indexToTable[0]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_role_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.${[indexToTable[1]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[8]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[8]]}
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    project_id uuid,
    removed boolean,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    starts_on timestamp without time zone,
    ends_on timestamp without time zone,
    CONSTRAINT milestone_pkey PRIMARY KEY (id),
    CONSTRAINT project_id FOREIGN KEY (project_id)
        REFERENCES public.${[indexToTable[6]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[9]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[9]]}
(
    id uuid NOT NULL,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    role_id uuid,
    org_id uuid,
    project_id uuid,
    permission_id uuid,
    CONSTRAINT role_permission_pkey PRIMARY KEY (id),
    CONSTRAINT role_permission_organization_id_fkey FOREIGN KEY (org_id)
        REFERENCES public.${[indexToTable[3]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT role_permission_permission_id_fkey FOREIGN KEY (permission_id)
        REFERENCES public.${[indexToTable[2]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT role_permission_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.${[indexToTable[6]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT role_permission_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.${[indexToTable[1]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[10]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[10]]}
(
    id uuid NOT NULL,
    epic_id uuid,
    org_id uuid,
    status_id uuid,
    status_update_date timestamp without time zone,
    CONSTRAINT epic_status_pkey PRIMARY KEY (id),
    CONSTRAINT epic_status_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES public.${[indexToTable[4]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[11]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[11]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    starts_on date,
    ends_on date,
    removed boolean,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    project_id uuid NOT NULL,
    CONSTRAINT sprint_pkey PRIMARY KEY (id),
    CONSTRAINT sprint_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.${[indexToTable[6]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[12]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[12]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    removed boolean,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    project_id uuid NOT NULL,
    CONSTRAINT epic_pkey PRIMARY KEY (id),
    CONSTRAINT epic_project_id_fkey FOREIGN KEY (project_id)
        REFERENCES public.${[indexToTable[6]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[13]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[13]]}
(
    id uuid NOT NULL,
    created_on timestamp without time zone,
    updated_on timestamp without time zone,
    removed_on timestamp without time zone,
    group_id uuid,
    user_id uuid,
    CONSTRAINT group_user_pkey PRIMARY KEY (id),
    CONSTRAINT group_user_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES public.${[indexToTable[1]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT group_user_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.${[indexToTable[5]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[14]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[14]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    role_id uuid,
    user_id uuid,
    CONSTRAINT user_role_pkey PRIMARY KEY (id),
    CONSTRAINT user_role_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.${[indexToTable[1]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_role_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.${[indexToTable[5]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[15]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[15]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    removed boolean,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    epic_id uuid NOT NULL,
    CONSTRAINT story_pkey PRIMARY KEY (id),
    CONSTRAINT story_epic_id_fkey FOREIGN KEY (epic_id)
        REFERENCES public.${[indexToTable[12]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[16]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[16]]}
(
    id uuid NOT NULL,
    org_id uuid NOT NULL,
    story_id uuid NOT NULL,
    status_id uuid NOT NULL,
    status_update_date timestamp without time zone,
    CONSTRAINT story_status_pkey PRIMARY KEY (id),
    CONSTRAINT story_status_organization_id_fkey FOREIGN KEY (org_id)
        REFERENCES public.${[indexToTable[3]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT story_status_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES public.${[indexToTable[4]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT story_status_story_id_fkey FOREIGN KEY (story_id)
        REFERENCES public.${[indexToTable[15]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[17]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[17]]}
(
    id uuid NOT NULL,
    created_on date,
    updated_on date,
    removed_on date,
    removed boolean,
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    story_id uuid NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT task_story_id_fkey FOREIGN KEY (story_id)
        REFERENCES public.${[indexToTable[15]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[18]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[18]]}
(
    id uuid NOT NULL,
    org_id uuid NOT NULL,
    task_id uuid NOT NULL,
    status_id uuid NOT NULL,
    status_update timestamp without time zone,
    _date timestamp without time zone,
    CONSTRAINT task_status_pkey PRIMARY KEY (id),
    CONSTRAINT task_status_organization_id_fkey FOREIGN KEY (org_id)
        REFERENCES public.${[indexToTable[3]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT task_status_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES public.${[indexToTable[4]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT task_status_task_id_fkey FOREIGN KEY (task_id)
        REFERENCES public.${[indexToTable[17]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
  [indexToTable[19]]: `
    CREATE TABLE IF NOT EXISTS public.${[indexToTable[19]]}
(
    id uuid NOT NULL,
    project_id uuid NOT NULL,
    org_id uuid NOT NULL,
    status_id uuid NOT NULL,
    status_update_date timestamp without time zone,
    CONSTRAINT project_status_pkey PRIMARY KEY (id),
    CONSTRAINT project_status_status_id_fkey FOREIGN KEY (status_id)
        REFERENCES public.${[indexToTable[4]]} (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
  `,
};

module.exports = createQueries;
