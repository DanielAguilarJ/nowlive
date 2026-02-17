# Sistema de Admin - CreamosTech

## 🎉 Sistema Real Implementado

El panel de administración ahora está completamente funcional con una base de datos SQLite y Prisma ORM.

## 📦 Base de Datos

Se ha configurado una base de datos SQLite con los siguientes modelos:

- **User**: Usuarios administradores
- **BlogPost**: Artículos del blog
- **Testimonial**: Testimonios de clientes
- **CaseStudy**: Casos de éxito
- **ContactMessage**: Mensajes de contacto
- **Analytics**: Datos de analíticas
- **Activity**: Registro de actividades

## 🔑 Credenciales de Acceso

**Email**: admin@creamostech.com  
**Password**: admin123

## 🚀 Cómo Usar

### 1. Acceder al Admin

Visita: `http://localhost:3000/admin/login`

### 2. Funcionalidades Disponibles

#### Dashboard Principal (`/admin`)
- Vista general de estadísticas
- Gráfica de analytics
- Feed de actividades recientes
- Acciones rápidas

#### Blog Posts (`/admin/posts`)
- Listar todos los posts
- Filtrar por estado (publicados, borradores, programados)
- Crear, editar y eliminar posts
- Ver estadísticas de visualizaciones

#### Testimonios (`/admin/testimonials`)
- Gestionar testimonios de clientes
- Aprobar o rechazar testimonios pendientes
- Marcar testimonios destacados

#### Casos de Éxito (`/admin/cases`)
- Gestionar casos de estudio
- Publicar nuevos casos
- Editar información y resultados

#### Mensajes de Contacto (`/admin/messages`)
- Ver consultas recibidas
- Marcar como leído/respondido
- Archivar mensajes antiguos

#### Analytics (`/admin/analytics`)
- Visualizar métricas de rendimiento
- Fuentes de tráfico
- Páginas más visitadas
- Tasas de conversión

## 🔧 APIs Implementadas

Todas las APIs REST están implementadas y funcionando:

### Blog Posts
- `GET /api/blog-posts` - Listar posts
- `POST /api/blog-posts` - Crear post
- `GET /api/blog-posts/:id` - Obtener post
- `PUT /api/blog-posts/:id` - Actualizar post
- `DELETE /api/blog-posts/:id` - Eliminar post

### Testimonials
- `GET /api/testimonials` - Listar testimonios
- `POST /api/testimonials` - Crear testimonio
- `GET /api/testimonials/:id` - Obtener testimonio
- `PUT /api/testimonials/:id` - Actualizar testimonio
- `DELETE /api/testimonials/:id` - Eliminar testimonio

### Case Studies
- `GET /api/case-studies` - Listar casos
- `POST /api/case-studies` - Crear caso
- `GET /api/case-studies/:id` - Obtener caso
- `PUT /api/case-studies/:id` - Actualizar caso
- `DELETE /api/case-studies/:id` - Eliminar caso

### Contact Messages
- `GET /api/contact-messages` - Listar mensajes
- `POST /api/contact-messages` - Crear mensaje
- `GET /api/contact-messages/:id` - Obtener mensaje
- `PUT /api/contact-messages/:id` - Actualizar mensaje
- `DELETE /api/contact-messages/:id` - Eliminar mensaje

### Analytics
- `GET /api/analytics` - Obtener datos de analytics
- `POST /api/analytics` - Registrar analytics
- `GET /api/analytics/stats` - Obtener estadísticas calculadas

### Activities
- `GET /api/activities` - Obtener registro de actividades

## 🗄️ Comandos Prisma

```bash
# Ver la base de datos en un navegador
npx prisma studio

# Crear una nueva migración
npx prisma migrate dev --name <nombre>

# Resetear la base de datos
npx prisma migrate reset

# Poblar la base de datos con datos de ejemplo
npx tsx prisma/seed.ts

# Generar el cliente de Prisma
npx prisma generate
```

## 📝 Formulario de Contacto

El formulario de contacto en `/contact` ahora guarda los mensajes en la base de datos automáticamente. Los mensajes aparecerán en el panel de admin.

## 🔐 Seguridad

- Las contraseñas están hasheadas con bcrypt
- Las sesiones se almacenan en cookies httpOnly
- Todas las rutas del admin están protegidas
- Validación de datos en todas las APIs

## 📊 Datos de Ejemplo

La base de datos viene pre-poblada con:
- 4 blog posts
- 4 testimonios
- 2 casos de éxito
- 4 mensajes de contacto
- 7 días de analytics
- Registro de actividades

## 🎨 Próximos Pasos

Para mejorar aún más el sistema:

1. **Autenticación Avanzada**: Implementar NextAuth.js para OAuth
2. **Roles y Permisos**: Sistema de permisos granular
3. **Subida de Imágenes**: Integrar Cloudinary o similar
4. **Notificaciones**: Email automático cuando llega un mensaje
5. **Analytics Reales**: Integrar Google Analytics API
6. **Editor Rico**: Implementar un editor WYSIWYG para posts
7. **Multi-idioma**: Soporte para contenido en varios idiomas
8. **Backup Automático**: Sistema de respaldo de la base de datos

## 🐛 Debugging

Si encuentras algún problema:

```bash
# Ver logs de Prisma
DEBUG="prisma:*" npm run dev

# Verificar el estado de la base de datos
npx prisma db push

# Ver la estructura de las tablas
npx prisma studio
```

## 📚 Documentación

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
