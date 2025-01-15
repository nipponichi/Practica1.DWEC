# Ventajas y desventajas entre importación librería mediante CDN y descarga en Local

Para entender las ventajas y desventajas, debemos conocer la principal diferencia: 
 - Los CDN son dependencias cargadas desde servidores distribuidos globalmente y el uso local, es desde el propio servidor de la web.


## Ventajas CDN frente a local
 - **Velocidad:** Al cargar desde el servidor mas cercano al usuario.
 - **Caché del navegador:** Si el usuario ha descargado la misma libreria desde el mismo CDN visitando una web previamente, esta estará en caché, cargando mas rápido la web.
 - **Ahorro ancho de banda:** No consume ancho de banda del servidor donde está alojada la web.
 - **Facilidad de importación:** No hay gestión de estos archivos en el proyecto.

## Desventajas CDN frente a local
 - **Seguridad:** Al ser externo al proyecto, si el servidor CDN es atacado, podría afectar a tu proyecto.
 - **Dependencia de terceros:** Los servidores CDN deben estar operativos, de no disponer de una versión local de la librería como respaldo, nuestra aplicación web podría dejar de funcionar correctamente o no funcionar.
 - **Menor control sobre archivos:** Algunas librerías CDN no pueden ser importadas parcialmente, como si pueden sus versiones locales.


