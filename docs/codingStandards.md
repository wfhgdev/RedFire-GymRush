# Guía de Estándares y Convenciones de Desarrollo Web

Este documento establece las normas obligatorias de desarrollo y organización del código para el equipo. Su cumplimiento es **estricto** para garantizar la mantenibilidad, escalabilidad y coherencia de todos nuestros proyectos React/Vite.

---

## 1. Nomenclatura, Idioma y Contenido de Usuario

* **Idioma de Código:** Todo el código fuente (variables, funciones, clases, nombres de archivos, carpetas y commits) debe estar escrito en **inglés**.
* **Idioma de Interfaz (UI):** Todo el contenido visible para el usuario final (párrafos, títulos, mensajes de error, placeholders, labels y texto en botones) debe estar obligatoriamente en **español**.
* **Archivos y Variables Generales:** Nombres en `camelCase` (ej. `userData`, `productCardImg.jpg`).
* **Componentes (`components/`):** Tanto las carpetas como sus archivos `.jsx` y `.css` deben escribirse en **PascalCase** (ej. `Header/Header.jsx`).
* **Páginas (`pages/`):** Las carpetas van estrictamente en **minúsculas** y sus archivos `.jsx` y `.css` deben escribirse en **PascalCase** (ej. `products/Products.jsx`).

---

## 2. Estructura de Proyecto y Carpeteo

La arquitectura del proyecto sigue un enfoque modular basado en componentes, páginas y servicios.

```text
src/
├── assets/             # Imágenes y recursos estáticos locales
├── components/         # Componentes reutilizables de UI (Carpetas en PascalCase)
│   └── Header/
│       ├── Header.jsx
│       └── Header.css
├── pages/              # Páginas o vistas principales (Carpetas en minúsculas)
│   └── products/
│       ├── Products.jsx
│       └── Products.css
├── services/           # Capa de API y peticiones HTTP centralizadas
│   ├── api.js          # Instancia base de Axios e interceptores
│   └── productService.js
├── index.css           # Estilos globales de la aplicación
└── main.jsx            # Punto de entrada de la aplicación

```

---

## 3. Código Limpio y Sin Comentarios (Clean Code)

* **Prohibido el uso de comentarios:** El código debe ser autoexplicativo por sí mismo. Si una función o variable requiere un comentario para entenderse, debe ser refactorizada o renombrada para expresar su intención con claridad.
* **Funciones pequeñas y de responsabilidad única (Single Responsibility Principle):** Cada componente o función debe hacer solo una cosa y hacerla bien.
* **Nombres descriptivos y con sentido:**
* Usa nombres precisos para funciones y variables en inglés (ej. `fetchUserProfile` en lugar de `getData`, `isUserLoggedIn` en lugar de `flag`).
* Evita abreviaturas confusas (ej. `productIndex` en lugar de `idx` o `p`).


* **Manejo de condicionales:** Prioriza retornos tempranos (*early returns*) y guardas (*guard clauses*) para evitar anidamientos profundos de estructuras `if-else`.
* **Código muerto y variables sin usar:** Queda totalmente prohibido dejar código comentado, funciones no utilizadas o importaciones no requeridas en los archivos entregados.

---

## 4. Hoja de Estilos (CSS)

1. **Estilos Globales (`index.css`):**
* Contiene reseteos de CSS, variables globales (colores, tipografías, espaciados) y clases de utilidad comunes a todo el proyecto.


2. **Estilos Específicos:**
* Cada componente o página que requiera estilos propios tendrá su propia hoja de estilos `.css` dentro de su carpeta correspondiente.
* El archivo `.css` debe tener **exactamente el mismo nombre** que el archivo `.jsx` al que acompaña (en PascalCase).
* **Regla de encapsulamiento:** Usa clases específicas o módulos CSS para evitar que los estilos de un componente afecten accidentalmente a otros.



---

## 5. Gestión de Recursos Estáticos (Imágenes)

* **Imágenes locales por defecto:** Todas las imágenes y recursos multimedia de la interfaz deben estar descargados y almacenados físicamente dentro del proyecto (en la carpeta `src/assets/` o subcarpetas asociadas).
* **Restricción de enlaces externos:** No se permite hardcodear imágenes hospedadas en servidores externos ni usar CDNs externos para recursos UI.
* **Excepción única:** La única excepción permitida para renderizar imágenes mediante URLs externas es cuando los datos e imágenes provienen dinámicamente del consumo de una API a través de **Axios**.
* **Nomenclatura:** Los nombres de los archivos de imagen locales deben cumplir la convención `camelCase` y estar en inglés (ej. `heroBannerMobile.webp`).

---

## 6. Tecnologías, Librerías y Enrutado

El stack oficial del proyecto está fijado. No se deben añadir librerías adicionales para resolver tareas cubiertas por el stack base sin la aprobación previa del equipo.

* **Lenguaje:** JavaScript (ES6+).
* **Entorno / Bundler:** Vite.
* **Consumo de APIs:** Axios.
* **Enrutado (`react-router-dom`):**
* Las rutas definidas en el atributo `path` deben seguir estrictamente la convención estándar en **`kebab-case`** (letras minúsculas separadas por guiones).
* *Ejemplos:*
* `<Route element="{<UserProfile" path="/user-profile"/>} />`
* `<Route element="{<ProductDetails" path="/product-details/:id"/>} />`


---

## 7. Buenas Prácticas y Métodos HTTP con Axios

Para mantener una capa de red desacoplada, limpia y mantenible, se imponen las siguientes reglas al trabajar con peticiones HTTP:

1. **Instancia Centralizada (`src/services/api.js`):**
* Se prohíbe importar y usar la librería `axios` directa en los componentes React.
* Toda llamada a la API debe realizarse mediante una instancia configurada con `axios.create()`, estableciendo `baseURL`, `timeout` y cabeceras base.


2. **Capa de Servicios Dedicada:**
* Las peticiones HTTP deben agruparse por dominio en archivos de servicio dentro de `src/services/` (ej. `productService.js`, `authService.js`).
* Los componentes de UI únicamente deben llamar a estas funciones de servicio y gestionar el estado visual.


3. **Uso Semántico de Métodos HTTP:**
* **`GET`:** Uso exclusivo para consultar y recuperar información. No debe enviar cuerpo (*body*) ni alterar datos en el servidor.
* **`POST`:** Uso para enviar datos y crear nuevos recursos en el servidor.
* **`PUT` / `PATCH`:** Uso para actualización. `PUT` reemplaza la entidad completa; `PATCH` aplica modificaciones parciales.
* **`DELETE`:** Uso exclusivo para eliminar recursos existentes.


4. **Manejo de Respuestas, Asincronía y Errores:**
* Todas las funciones de servicio deben usar la sintaxis `async/await` dentro de bloques `try...catch`.
* Extraer únicamente `response.data` para retornarlo a la capa de UI.
* Los errores devueltos por la API deben ser transformados y devueltos de forma clara para mostrar retroalimentación en español al usuario.


5. **Interceptores de Axios y Integración con React Router DOM:**
* Usar un *request interceptor* para inyectar automáticamente el token de autenticación (`Bearer token`) en las peticiones que lo requieran.
* Usar un *response interceptor* para la captura global de errores HTTP. Ante respuestas de estado `401 Unauthorized` o `403 Forbidden`, se debe redirigir al usuario automáticamente a la ruta `/login` usando la configuración de navegación.


6. **Cancelación de Peticiones en Componentes (Cleanup):**
* Toda petición HTTP ejecutada dentro de un `useEffect` debe implementar la API nativa `AbortController` para cancelar la solicitud en caso de que el componente se desmonte antes de finalizar la respuesta.

---

## 8. Accesibilidad Web (WCAG Compliance)

Es obligatorio construir componentes acordes a las pautas de accesibilidad **WCAG 2.1 (Nivel AA)**:

1. **Semántica HTML:** Utilizar etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`, etc.) en lugar de abusar de `<div>`.
2. **Imágenes:** Todas las etiquetas `<img>` deben llevar el atributo `alt` obligatorio con una descripción clara en español para el usuario (salvo que sea puramente decorativa, en cuyo caso llevará `alt=""`).
3. **Formularios:** Todos los inputs deben estar enlazados explícitamente a su `<label>` correspondiente mediante los atributos `id` y `htmlFor`.
4. **Navegación por Teclado:** Asegurar que todos los elementos interactivos sean accesibles mediante la tecla `Tab` y que mantengan un indicador visual claro de foco (`:focus-visible`).
5. **Contraste:** Garantizar un ratio de contraste adecuado entre texto y fondo según la normativa WCAG AA.

---