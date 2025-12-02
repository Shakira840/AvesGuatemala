Aplicación de Aves de Guatemala

1. Descripción

Esta aplicación web para móviles muestra aves observadas en Guatemala utilizando datos de eBird y complementos de Wikidata y Wikipedia.

Pantallas incluidas:

- Home:
  - Nombre completo y carné del estudiante.
  - Botón Cargar para acceder a la lista de aves.

- BirdsList:
  - Lista de aves observadas con:
    - Nombre común y científico
    - Familia y orden (legibles en español)
    - Ubicación y fecha de observación
    - Imagen (si existe)
    - Descripción de la especie (español con fallback inglés)
  - Botón Volver para regresar a Home.

2. Código fuente

El código fuente completo se encuentra en la carpeta src/:
- Home.js
- BirdsList.js
- App.js
- index.js

Dependencias principales:
- React
- Axios

No olvides revisar package.json para otras dependencias.

3. Guía para compilar y ejecutar

Paso 1: Clonar o descargar el proyecto
- git clone <url-del-repositorio>
- cd mi-proyecto-aves

Paso 2: Instalar dependencias
- npm install

Paso 3: Agregar la API Key de eBird
- Abrir BirdsList.js y reemplazar "TU_API_KEY" por tu clave personal de eBird:
  headers: { "X-eBirdApiToken": "TU_API_KEY" }

Paso 4: Iniciar la aplicación en modo desarrollo
- npm start
- Esto abrirá la aplicación en el navegador (http://localhost:3000/)

Paso 5: Compilar para producción (opcional)
- npm run build
- Esto genera la carpeta build/ lista para subir a un servidor web.

4. Notas adicionales

- La descripción de cada especie intenta español primero; si no existe, se muestra en inglés.
- Familia y orden se obtienen desde Wikidata y se muestran legibles en español.
- El número de aves mostrado por defecto es 10 para pruebas, pero se puede ajustar en BirdsList.js.

5. Autor

- Nombre: Shakira Priscilla Martínez Reyes
- Carné: 15000339

