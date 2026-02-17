PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('c5455285-b846-428b-96d5-e2a096d3a131','1b4bc72618b71d436ebe8550f04f4a35bfe5637cdedb6f720a33c29b493d5d09',1768430653584,'20260114224413_init',NULL,NULL,1768430653581,1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO User VALUES('d3f36675-acd7-4b67-9771-96fb5273ef49','admin@creamostech.com','$2b$10$cx2T/69iGDRBw9zYrRyeku7E1kx7oLSpv4tsK5Z6zx5ibdja/fySu','Admin CreamosTech','admin',1768430658772,1768430658772);
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" DATETIME,
    "scheduledAt" DATETIME,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO BlogPost VALUES('0fc21fc0-38f1-4b4b-8273-bbe4bfd84a32','10 Tendencias de Marketing Digital para 2026','tendencias-marketing-digital-2026','Descubre las principales tendencias que dominarán el marketing digital este año.','<p>El marketing digital evoluciona constantemente...</p>','Admin CreamosTech','Marketing Digital','["tendencias","marketing","2026","digital"]','/blog/tendencias-2026.jpg','published',1768039200000,NULL,1250,1768430658778,1768430658778);
INSERT INTO BlogPost VALUES('0678225d-24cf-4b00-8f92-891afa94b465','Guía Completa de SEO Técnico','guia-seo-tecnico-completa','Todo lo que necesitas saber sobre SEO técnico para mejorar tu posicionamiento.','<p>El SEO técnico es fundamental...</p>','Editor CreamosTech','SEO','["seo","técnico","guía","posicionamiento"]','/blog/seo-tecnico.jpg','published',1767603600000,NULL,890,1768430658780,1768430658780);
INSERT INTO BlogPost VALUES('c009e13b-5ad9-4a14-b105-3e6ea3bb7e2f','Automatización de Email Marketing: Mejores Prácticas','automatizacion-email-marketing','Aprende a crear flujos de email automatizados que convierten.','<p>La automatización del email marketing...</p>','Admin CreamosTech','Email Marketing','["email","automatización","conversiones"]','/blog/email-automation.jpg','draft',NULL,NULL,0,1768430658781,1768430658781);
INSERT INTO BlogPost VALUES('752e4904-669c-40c3-b742-f3ea3796b677','Diseño Web Moderno: Principios y Tendencias','diseno-web-moderno-principios','Explora los principios del diseño web moderno y las últimas tendencias.','<p>El diseño web moderno se basa en...</p>','Admin CreamosTech','Diseño Web','["diseño","web","UI","UX"]','/blog/diseno-web.jpg','scheduled',NULL,1768903200000,0,1768430658783,1768430658783);
CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatar" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO Testimonial VALUES('ec29f105-7182-4479-91dd-30b55e45582d','María García','TechStart SL','CEO','CreamosTech transformó completamente nuestra presencia digital. Los resultados superaron todas nuestras expectativas.',5,'/testimonials/maria.jpg',1,'approved',1768430658785,1768430658785);
INSERT INTO Testimonial VALUES('69f5285f-773b-4576-9c1a-6cc25d5a6898','Carlos Rodríguez','Innovate Corp','Director de Marketing','Profesionales excepcionales. Su estrategia de marketing automation nos ayudó a triplicar nuestras conversiones.',5,'/testimonials/carlos.jpg',1,'approved',1768430658786,1768430658786);
INSERT INTO Testimonial VALUES('803f55b5-7353-4c4f-b653-6f065f7c67a1','Ana Martínez','Digital Solutions','CMO','El equipo de CreamosTech es increíble. Su enfoque en datos nos dio claridad sobre dónde invertir nuestro presupuesto.',4,'/testimonials/ana.jpg',0,'approved',1768430658787,1768430658787);
INSERT INTO Testimonial VALUES('3e8883f7-d6bc-49bd-81a3-d8c965b521cc','Roberto Sánchez','EcoTech','Fundador','Excelente trabajo en el rediseño de nuestra web. La experiencia del usuario mejoró significativamente.',5,'/testimonials/roberto.jpg',0,'pending',1768430658789,1768430658789);
CREATE TABLE IF NOT EXISTS "CaseStudy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO CaseStudy VALUES('9a900afb-4b0a-40d2-b2cc-c02393f292e1','Transformación Digital de TechStart','transformacion-digital-techstart','TechStart SL','Tecnología','["Diseño Web","SEO","Marketing Automation"]','TechStart necesitaba modernizar su presencia digital y aumentar la generación de leads.','Desarrollamos una nueva web con UX optimizado e implementamos estrategia de inbound marketing.','[{"metric":"Tráfico Orgánico","value":"+245%","improvement":"en 6 meses"},{"metric":"Generación de Leads","value":"+180%","improvement":"trimestre a trimestre"},{"metric":"Tasa de Conversión","value":"4.8%","improvement":"desde 1.2%"}]','/cases/techstart-hero.jpg','["/cases/techstart-1.jpg","/cases/techstart-2.jpg"]','published',1,1768430658790,1768430658790);
INSERT INTO CaseStudy VALUES('4bfd2e79-5701-48f9-b640-df30702653d7','Rebranding de Innovate Corp','rebranding-innovate-corp','Innovate Corp','Consultoría','["Identidad de Marca","Diseño Web","Contenido"]','La marca había perdido relevancia en el mercado y necesitaba renovarse.','Creamos una nueva identidad visual y narrativa de marca alineada con sus valores.','[{"metric":"Reconocimiento de Marca","value":"+89%","improvement":"en encuestas"},{"metric":"Engagement Social","value":"+320%","improvement":"en 3 meses"},{"metric":"Nuevos Clientes","value":"+45%","improvement":"año a año"}]','/cases/innovate-hero.jpg','["/cases/innovate-1.jpg","/cases/innovate-2.jpg"]','published',1,1768430658791,1768430658791);
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "service" TEXT,
    "budget" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "repliedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO ContactMessage VALUES('b6afe02e-6776-48ef-9e39-6874a66da729','Laura Fernández','laura@empresa.com','+34 612 345 678','Empresa ABC','Consulta sobre servicios de SEO','Hola, estamos interesados en mejorar nuestro posicionamiento en Google. ¿Podrían enviarnos más información sobre sus servicios de SEO?','SEO & Analytics','5000-10000','new',NULL,1768430658793,1768430658793);
INSERT INTO ContactMessage VALUES('75b26b86-1773-4338-b774-046a8b942e54','Pedro López','pedro@startup.io',NULL,'Startup IO','Diseño de página web','Necesitamos una nueva web para nuestra startup. Estamos en fase de crecimiento y queremos una web profesional que refleje nuestra marca.','Diseño Web','10000-20000','read',NULL,1768430658795,1768430658795);
INSERT INTO ContactMessage VALUES('517c5fe7-851d-499c-8601-16bbc3f47978','Isabel Torres','isabel@consultoria.es','+34 698 765 432','Consultoría Torres','Estrategia de marketing digital','Buscamos una agencia que nos ayude a desarrollar una estrategia integral de marketing digital. Actualmente no tenemos presencia online significativa.','Estrategia Digital','20000+','replied',1768127400000,1768430658796,1768430658796);
INSERT INTO ContactMessage VALUES('2fde0d54-e8dd-4da3-a1fd-d8ee4c35749f','Miguel Ruiz','miguel@tienda.com',NULL,NULL,'Consulta general','Me gustaría saber más sobre sus servicios y precios. Tenemos una tienda online y queremos aumentar nuestras ventas.',NULL,NULL,'archived',NULL,1768430658797,1768430658797);
CREATE TABLE IF NOT EXISTS "Analytics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Analytics VALUES('f9b61d9f-4d33-4c17-9d4c-c1849631ee4a',1767830400000,1234,3456,45,1768430658799);
INSERT INTO Analytics VALUES('488db65f-1477-4d42-b34d-6f9618d2822c',1767916800000,1456,3890,52,1768430658800);
INSERT INTO Analytics VALUES('5693e1e0-f6a9-41af-9949-b9f321e0c75c',1768003200000,1678,4234,61,1768430658801);
INSERT INTO Analytics VALUES('f1fae412-9022-4422-ba09-1de4c6fa74b2',1768089600000,1234,3123,38,1768430658802);
INSERT INTO Analytics VALUES('898b6c64-2a61-4fef-ad33-42fc3d6d24f0',1768176000000,987,2456,29,1768430658803);
INSERT INTO Analytics VALUES('4ef55ab3-ec98-435a-bcbb-ea6762d8846e',1768262400000,1567,4012,58,1768430658805);
INSERT INTO Analytics VALUES('f321c3af-d11d-49e7-ad9c-d5d27882e461',1768348800000,1890,4567,72,1768430658806);
CREATE TABLE IF NOT EXISTS "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Activity VALUES('2bee2019-3ec6-4149-bb1a-107a55cdefa8','contact','Nuevo mensaje','Laura Fernández envió una consulta sobre SEO',NULL,1768430658808);
INSERT INTO Activity VALUES('b3350b31-e34c-48c9-96e1-2af5877b60a0','testimonial','Testimonio pendiente','Roberto Sánchez dejó un nuevo testimonio',NULL,1768430658809);
INSERT INTO Activity VALUES('79f58c3d-32a5-4adf-b326-d17e131f8c80','post','Post publicado','10 Tendencias de Marketing Digital para 2026','Admin CreamosTech',1768430658811);
INSERT INTO Activity VALUES('7c9297d6-3466-4348-ae18-d0409b28d808','contact','Mensaje respondido','Isabel Torres - Estrategia de marketing digital','Admin CreamosTech',1768430658812);
INSERT INTO Activity VALUES('c8d8bf9f-48de-489e-a6e6-5b4aed0b5589','case_study','Caso publicado','Transformación Digital de TechStart','Admin CreamosTech',1768430658813);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");
CREATE UNIQUE INDEX "Analytics_date_key" ON "Analytics"("date");
COMMIT;
