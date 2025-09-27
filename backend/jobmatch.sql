-- jobmatch
CREATE SCHEMA IF NOT EXISTS "public";

CREATE  TABLE "public".candidat ( 
	idcandidat           serial  NOT NULL  ,
	nom                  varchar    ,
	email                varchar    ,
	mdp                  varchar    ,
	dtn                  date    ,
	numero               varchar    ,
	idpays               integer    ,
	ville                varchar    ,
	CONSTRAINT pk_candidat PRIMARY KEY ( idcandidat )
 );

CREATE  TABLE "public".competence ( 
	idcompetence         serial  NOT NULL  ,
	nom                  varchar    ,
	type_competence      integer    ,
	CONSTRAINT pk_competence PRIMARY KEY ( idcompetence )
 );

CREATE  TABLE "public".competence_candidat ( 
	id                   serial  NOT NULL  ,
	idcandidat           integer    ,
	idcompetence         integer    ,
	CONSTRAINT pk_competence_candidat PRIMARY KEY ( id ),
	CONSTRAINT fk_competence_candidat FOREIGN KEY ( idcompetence ) REFERENCES "public".competence( idcompetence )   ,
	CONSTRAINT fk_competence_candidat_1 FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   
 );

CREATE  TABLE "public".entreprise ( 
	identreprise         serial  NOT NULL  ,
	nom                  varchar    ,
	email                varchar    ,
	mdp                  varchar    ,
	numero               varchar    ,
	descri               text    ,
	CONSTRAINT pk_entreprise PRIMARY KEY ( identreprise )
 );

CREATE  TABLE "public".niveau_etude ( 
	idniveau_etude       serial  NOT NULL  ,
	nom                  varchar    ,
	niveau               integer    ,
	CONSTRAINT pk_niveau_etude PRIMARY KEY ( idniveau_etude )
 );

CREATE  TABLE "public".parcours ( 
	idparcours           serial  NOT NULL  ,
	ecole                varchar    ,
	idniveau             integer    ,
	domaine              varchar    ,
	debut                date    ,
	fin                  date    ,
	idcandidat           integer    ,
	CONSTRAINT pk_parcours PRIMARY KEY ( idparcours ),
	CONSTRAINT fk_parcours_niveau_etude FOREIGN KEY ( idniveau ) REFERENCES "public".niveau_etude( idniveau_etude )   ,
	CONSTRAINT fk_parcours_candidat FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   
 );

CREATE  TABLE "public".type_emploi ( 
	idtype_emploi        serial  NOT NULL  ,
	nom                  varchar    ,
	CONSTRAINT pk_type_emploi PRIMARY KEY ( idtype_emploi )
 );

CREATE  TABLE "public".type_lieu ( 
	idtype_lieu          serial  NOT NULL  ,
	nom                  varchar    ,
	CONSTRAINT pk_type_lieu PRIMARY KEY ( idtype_lieu )
 );

CREATE  TABLE "public".annonce ( 
	idannonce            serial  NOT NULL  ,
	identreprise         integer    ,
	poste                varchar    ,
	descri               text    ,
	debut                date    ,
	duree                decimal    ,
	idtype_emploi        integer    ,
	idtype_lieu          integer    ,
	lieu                 varchar    ,
	salaire_min          real    ,
	salaire_max          real    ,
	date_annonce         date    ,
	CONSTRAINT pk_annonce PRIMARY KEY ( idannonce ),
	CONSTRAINT fk_annonce_entreprise FOREIGN KEY ( identreprise ) REFERENCES "public".entreprise( identreprise )   ,
	CONSTRAINT fk_annonce_type_emploi FOREIGN KEY ( idtype_emploi ) REFERENCES "public".type_emploi( idtype_emploi )   ,
	CONSTRAINT fk_annonce_type_lieu FOREIGN KEY ( idtype_lieu ) REFERENCES "public".type_lieu( idtype_lieu )   
 );

CREATE  TABLE "public".detail_annonce ( 
	iddetail             serial  NOT NULL  ,
	idannonce            integer    ,
	idcompetence         integer    ,
	CONSTRAINT pk_detail_annonce PRIMARY KEY ( iddetail ),
	CONSTRAINT fk_detail_annonce_annonce FOREIGN KEY ( idannonce ) REFERENCES "public".annonce( idannonce )   ,
	CONSTRAINT fk_detail_annonce_competence FOREIGN KEY ( idcompetence ) REFERENCES "public".competence( idcompetence )   
 );

CREATE  TABLE "public".experience ( 
	idexperience         serial  NOT NULL  ,
	idcandidat           integer    ,
	entreprise           varchar    ,
	poste                varchar    ,
	idtype_emploi        integer    ,
	debut                date    ,
	fin                  date    ,
	lieu                 varchar    ,
	idtype_lieu          integer    ,
	CONSTRAINT pk_experience PRIMARY KEY ( idexperience ),
	CONSTRAINT fk_experience_candidat FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   ,
	CONSTRAINT fk_experience_type_emploi FOREIGN KEY ( idtype_emploi ) REFERENCES "public".type_emploi( idtype_emploi )   ,
	CONSTRAINT fk_experience_type_lieu FOREIGN KEY ( idtype_lieu ) REFERENCES "public".type_lieu( idtype_lieu )   
 );

CREATE  TABLE "public"."ignore" ( 
	idignore             serial  NOT NULL  ,
	idcandidat           integer    ,
	idannonce            integer    ,
	date_ignore          date    ,
	CONSTRAINT pk_ignor PRIMARY KEY ( idignore ),
	CONSTRAINT fk_ignor_annonce FOREIGN KEY ( idannonce ) REFERENCES "public".annonce( idannonce )   ,
	CONSTRAINT fk_ignor_candidat FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   
 );

CREATE  TABLE "public"."match" ( 
	idmatch              serial  NOT NULL  ,
	idannonce            integer    ,
	idcandidat           integer    ,
	date_match           date    ,
	CONSTRAINT pk_mat PRIMARY KEY ( idmatch ),
	CONSTRAINT fk_mat_candidat FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   ,
	CONSTRAINT fk_mat_annonce FOREIGN KEY ( idannonce ) REFERENCES "public".annonce( idannonce )   
 );

CREATE  TABLE "public".niveau_etude_annonce ( 
	id                   serial  NOT NULL  ,
	idannonce            integer    ,
	idniveau_etude       integer    ,
	CONSTRAINT pk_niveau_annonce PRIMARY KEY ( id ),
	CONSTRAINT fk_niveau_annonce_niveau_etude FOREIGN KEY ( idniveau_etude ) REFERENCES "public".niveau_etude( idniveau_etude )   ,
	CONSTRAINT fk_niveau_annonce_annonce FOREIGN KEY ( idannonce ) REFERENCES "public".annonce( idannonce )   
 );

CREATE  TABLE "public".preference ( 
	idpreference         serial  NOT NULL  ,
	idcandidat           integer    ,
	idtype_emploi        integer    ,
	idtype_lieu          integer    ,
	salaire_min          real    ,
	salaire_max          real    ,
	disponibilite        integer    ,
	CONSTRAINT pk_preference PRIMARY KEY ( idpreference ),
	CONSTRAINT fk_preference_candidat FOREIGN KEY ( idcandidat ) REFERENCES "public".candidat( idcandidat )   ,
	CONSTRAINT fk_preference_type_emploi FOREIGN KEY ( idtype_emploi ) REFERENCES "public".type_emploi( idtype_emploi )   ,
	CONSTRAINT fk_preference_type_lieu FOREIGN KEY ( idtype_lieu ) REFERENCES "public".type_lieu( idtype_lieu )   
 );

COMMENT ON COLUMN "public".competence.type_competence IS '1 : technique
2 : comportementale';

