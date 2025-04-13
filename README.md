# Universo Origen 🌌

Universo Origen es una plataforma educativa sobre el origen del universo en español, proporcionando teorías científicas, contenido multimedia y perspectivas de expertos sobre cosmología.

## 🚀 Características

- **Exploración temática:** Teorías científicas, conspiraciones, curiosidades y más
- **Autenticación de usuarios:** Registro e inicio de sesión seguro con persistencia de datos
- **Diseño responsivo:** Optimizado para dispositivos móviles, tablets y desktops
- **Tema oscuro/claro:** Cambia entre modos de visualización
- **Base de datos PostgreSQL:** Almacenamiento persistente de usuarios y contenido
- **Interfaz intuitiva:** Navegación fluida y experiencia de usuario mejorada

## 🛠️ Tecnologías

- **Frontend:** React, TailwindCSS, Shadcn UI
- **Backend:** Node.js, Express
- **Base de datos:** PostgreSQL
- **ORM:** Drizzle ORM
- **Autenticación:** Passport.js, express-session
- **API:** REST API con TanStack Query
- **Despliegue:** Configurado para Render.com

## 🔧 Instalación y Uso

### Prerrequisitos
- Node.js v16+
- PostgreSQL
- npm o yarn

### Configuración local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/universo-origen.git
   cd universo-origen
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` basado en `.env.example`
   - Completa con tus credenciales de base de datos

4. Inicializa la base de datos:
   ```bash
   npm run db:push
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

6. Visita `http://localhost:5000` en tu navegador.

## 🚀 Despliegue en Render.com

Este proyecto viene preconfigurado para ser desplegado en [Render.com](https://render.com/):

1. Crea una cuenta en Render.com
2. Conecta tu repositorio de GitHub
3. Haz clic en "New +" y selecciona "Blueprint"
4. Selecciona el repositorio y Render utilizará el archivo `render.yaml` para configurar automáticamente:
   - Servicio web (Node.js)
   - Base de datos PostgreSQL
   - Variables de entorno necesarias

El despliegue creará automáticamente:
- Un servicio web que ejecuta la aplicación
- Una base de datos PostgreSQL para almacenamiento
- Las variables de entorno necesarias configuradas

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## 📞 Contacto

¿Preguntas? ¿Sugerencias? Contacta a nuestro equipo a través de [universo.origen@example.com](mailto:universo.origen@example.com)