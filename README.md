# News Explorer API

Backend de la aplicación full stack News Explorer.

La API proporciona autenticación de usuarios mediante JWT y permite crear, consultar y eliminar artículos guardados asociados a cada usuario.

## Aplicación desplegada

API:

https://news-explorer-api-joshua21.mooo.com

Frontend:

https://www.news-explorer-joshua21.mooo.com

## Repositorios

Backend:

https://github.com/JoshuaSanchez21/news-explorer-backend

Frontend:

https://github.com/JoshuaSanchez21/news-explorer-frontend

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- Joi
- validator
- Winston
- express-winston
- CORS
- ESLint
- Nodemon
- Nginx
- Google Cloud

## Requisitos previos

Para ejecutar el proyecto localmente necesitas:

- Node.js
- npm
- Git
- MongoDB

Comprueba las instalaciones con:

```bash
node --version
npm --version
git --version
mongod --version
```

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/JoshuaSanchez21/news-explorer-backend.git
```

Entra al proyecto:

```bash
cd news-explorer-backend
```

Instala las dependencias:

```bash
npm ci
```

Si no dispones de `package-lock.json`:

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto.

Ejemplo para desarrollo:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
```

Variables utilizadas:

### `PORT`

Puerto en el que se ejecuta el servidor. Si no se especifica, se utiliza `3000`.

### `NODE_ENV`

Entorno de ejecución.

Ejemplos:

```text
development
production
```

### `JWT_SECRET`

Clave utilizada para firmar y verificar los JSON Web Tokens.

En producción debe definirse mediante una variable de entorno y utilizar un valor seguro.

### `MONGODB_URI`

Dirección de conexión a MongoDB.

Ejemplo local:

```text
mongodb://127.0.0.1:27017/news-explorer
```

En producción debe definirse mediante una variable de entorno.

El archivo `.env` está excluido de Git y no debe subirse al repositorio.

## Ejecutar MongoDB localmente

Puedes crear un directorio de datos con:

```bash
mkdir -p ~/mongodb-data/news-explorer
```

Inicia MongoDB:

```bash
mongod --dbpath ~/mongodb-data/news-explorer
```

Mantén esa terminal abierta.

Desde otra terminal puedes comprobar MongoDB con:

```bash
mongosh --quiet --eval 'db.runCommand({ ping: 1 })'
```

Una respuesta correcta incluye:

```text
{ ok: 1 }
```

## Ejecutar el servidor en desarrollo

Con MongoDB activo:

```bash
npm run dev
```

Nodemon reiniciará el servidor cuando detecte cambios.

Por defecto la API estará disponible en:

```text
http://localhost:3000
```

## Ejecutar en producción

```bash
npm start
```

Este script ejecuta la aplicación con Node.js.

## Scripts disponibles

```text
npm run dev     Ejecuta el servidor con Nodemon
npm start       Ejecuta el servidor con Node.js
npm run lint    Ejecuta ESLint
```

## Verificar el código

```bash
npm run lint
git diff --check
```

## Autenticación

Las rutas protegidas utilizan JSON Web Tokens.

Después de iniciar sesión mediante:

```text
POST /signin
```

la API devuelve un token.

Las solicitudes protegidas deben incluir:

```http
Authorization: Bearer <JWT>
```

## Rutas principales

### Registro de usuario

```http
POST /signup
```

Ejemplo:

```json
{
  "email": "usuario@example.com",
  "password": "12345678",
  "name": "Joshua"
}
```

Respuesta exitosa:

```text
201 Created
```

La contraseña no se devuelve en la respuesta.

### Inicio de sesión

```http
POST /signin
```

Ejemplo:

```json
{
  "email": "usuario@example.com",
  "password": "12345678"
}
```

La respuesta contiene el JWT.

### Obtener usuario actual

```http
GET /users/me
```

Ruta protegida que devuelve la información del usuario autenticado.

Requiere:

```http
Authorization: Bearer <JWT>
```

### Obtener artículos guardados

```http
GET /articles
```

Devuelve los artículos pertenecientes al usuario autenticado.

### Guardar artículo

```http
POST /articles
```

Ejemplo:

```json
{
  "keyword": "Tecnología",
  "title": "Título del artículo",
  "text": "Descripción del artículo",
  "date": "2026-10-01T12:00:00Z",
  "source": "News Source",
  "link": "https://example.com/article",
  "image": "https://example.com/image.jpg"
}
```

Campos requeridos:

- `keyword`
- `title`
- `text`
- `date`
- `source`
- `link`
- `image`

El propietario se obtiene automáticamente del usuario autenticado.

### Eliminar artículo

```http
DELETE /articles/:articleId
```

Solo el propietario del artículo puede eliminarlo.

## Códigos HTTP principales

```text
200  Solicitud correcta
201  Recurso creado
400  Datos inválidos
401  Usuario no autenticado
403  Operación no permitida
404  Recurso no encontrado
409  Conflicto, por ejemplo correo duplicado
500  Error interno del servidor
```

## Validación

La API valida los datos antes de ejecutar los controladores.

Existen esquemas de validación para:

- Registro
- Inicio de sesión
- Creación de artículos
- Identificadores de artículos

Los modelos de Mongoose realizan validaciones adicionales.

## Seguridad

La aplicación implementa:

- Hash de contraseñas con bcrypt.
- Autenticación JWT.
- Protección de rutas.
- Validación de datos.
- Comprobación del propietario antes de eliminar artículos.
- Variables de entorno para información sensible.
- CORS.
- Manejo centralizado de errores.

## Logs

La aplicación utiliza Winston y express-winston.

Los registros se almacenan en formato JSON:

```text
request.log
error.log
```

Estos archivos están excluidos del repositorio mediante `.gitignore`.

## Estructura principal

```text
news-explorer-backend/
├── controllers/
│   ├── articles.js
│   └── users.js
├── errors/
├── middlewares/
│   ├── auth.js
│   ├── error-handler.js
│   ├── logger.js
│   └── validation.js
├── models/
│   ├── article.js
│   └── user.js
├── routes/
│   ├── articles.js
│   ├── index.js
│   └── users.js
├── utils/
│   └── config.js
├── validators/
│   └── schemas.js
├── app.js
├── package.json
└── README.md
```

## Arquitectura

El flujo principal de una solicitud es:

```text
Routes
  ↓
Middlewares de autenticación y validación
  ↓
Controllers
  ↓
Models
  ↓
MongoDB
```

Los errores se procesan mediante un middleware centralizado.

## Despliegue

La API está desplegada en una máquina virtual de Google Cloud.

La arquitectura de producción es:

```text
Internet
   ↓
HTTPS
   ↓
Nginx
   ↓
Node.js / Express
   ↓
MongoDB
```

Nginx funciona como reverse proxy hacia la aplicación Node.js.

La aplicación utiliza HTTPS mediante certificados TLS.

MongoDB escucha únicamente de forma local en el servidor y no está expuesto directamente a Internet.

## Autor

Joshua Sánchez

Proyecto final de desarrollo web realizado como parte del programa de TripleTen.
