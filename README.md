BLOG APP

BLOGAPP es una aplicación que permite a los autores registrarse, crear y gestionar posteos sobre diferentes intereses. Las categorías principales son entretenimiento, educación, arte, agricultura, negocios, inversiones, clima y otros. 
Los usuarios pueden visualizar publicaciones de otras personas, y editar o eliminar sus propias publicaciones.

Tecnologías Utilizadas

* Frontend: React.js

* Backend: Node.js con Express

* Base de Datos: MongoDB Atlas (Desarrollado y gestionado con MongoDB Compass)

* Autenticación: JSON Web Tokens (JWT)

Características principales

* Autenticación de Usuarios: Registro e inicio de sesión con JWT.
* Gestor de Posteos: Crear, editar y eliminar publicaciones.
* Visualización de Posteos: Los usuarios pueden ver publicaciones de otros.
* Rutas protegidas: Solo el autor puede editar o eliminar publicaciones.
* Categorías: Los posteos están organizados en distintas categorías.
* Despliegue: Backend y frontend desplegado en vercel.

Requisitos previos

* Node.js (v14 o superior)
* npm o yarn
* MongoDB Atlas configurado
* MongoDB Compass (Utilizado para el desarrollo local)

Nota: Actualmente, la API solo funciona cuando se ejecuta npm run dev localmente debido a configuraciones pendientes en Vercel. Se recomienda revisar la configuración de Vercel para asegurar que el backend esté correctamente desplegado y funcione de manera independiente.

Rutas de la API

Autenticación (/api/auth)

POST /register: Registro de nuevos usuarios.

POST /login: Inicio de sesión y obtención de token.

GET /me: Obtener información del usuario autenticado.

Posteos (/api/posts)

POST /: Crear un nuevo post (requiere autenticación).

GET /: Obtener todos los posteos.

GET /my-posts: Obtener posteos del usuario autenticado.

GET /:id: Obtener detalles de un post por ID.

PUT /:id: Actualizar un post (requiere autenticación).

DELETE /:id: Eliminar un post.

GET /post-with-creator/:id: Obtener un post con información del creador.


Middleware de Autenticación

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }
        req.user = user;
        next();
    });
};


Despliegue

Frontend y Backend desplegados en Vercel.

Problema Conocido: El backend no responde correctamente en Vercel sin ejecutar npm run dev localmente. Se recomienda revisar la configuración de MongoDB Atlas y asegurar que el servidor se conecte correctamente durante el despliegue. Además, considera implementar logs para verificar errores durante el inicio del servidor en Vercel.

Instalación y Ejecución

1. Clonar repositorio: 
git clone https://github.com/hebemilanesio1/mern_blog_v2.git

2. Instalar dependencias: 
cd mern_blog_v2
npm install

3. Iniciar el backend:
cd server
npm run dev

4. Acceder a la aplicación:
https://mernblog-flame.vercel.app/


Contribución

Las contribuciones son bienvenidas. Si deseas colaborar, por favor sigue estos pasos:

Realiza un fork del repositorio.

Crea una rama con una nueva funcionalidad (feature/nueva-funcionalidad).

Realiza un pull request describiendo los cambios realizados.


Desarrollado por: 

* Hebe Milanesio   hebemilanesio1@gmail.com
* Jimena Romero    romerojimena700@gmail.com


