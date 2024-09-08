
# Challenge Automation - Monnet Payments

Este proyecto contiene pruebas automatizadas utilizando Playwright para interactuar con APIs y pruebas Web. A continuación, se detallan los pasos necesarios para configurar y ejecutar las pruebas.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

2. **Playwright**: Este proyecto utiliza Playwright para las pruebas automatizadas. Puedes instalarlo junto con las dependencias del proyecto.

## Instalación

1. Clona el repositorio en tu máquina local:
    ```bash
    https://github.com/LuDev10/challege-monnet.git
    ```
    
2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Configuración

1. **Variable de Entorno**: Para encriptar la contraseña, debes configurar la variable de entorno `SECRET_PASS`. Puedes hacerlo ejecutando el siguiente comando en la terminal:
    ```bash
    export SECRET_PASS="tu-contraseña-secreta"
    ```

2. **Archivos de Configuración**: El proyecto incluye una carpeta `config` que contiene datos de prueba necesarios para las pruebas automatizadas. Asegúrate de que estos archivos estén presentes y correctamente configurados.

## Ejecución de Pruebas

Para ejecutar las pruebas automatizadas en la carpeta test, utiliza el siguiente comando:
```bash
npx playwright test
```

## Generación de reportes

Las pruebas generan un reporte detallado. Para visualizar el reporte después de ejecutar las pruebas, puedes ejecutar:
```bash
npx playwright show-report
```
Esto abrirá un reporte en tu navegador por defecto, con información detallada de cada test ejecutado, incluyendo screenshots, pasos y errores.

## Captura de Evidencia en Caso de Fallo
En la configuración de Playwright, se han añadido a `playwright.config.ts` dos comandos para capturar evidencia (screenshots y videos) en caso de que las pruebas fallen:

**Captura de Pantallas**: Si un test falla, se tomará automáticamente una captura de pantalla.
```bash
screenshot: 'only-on-failure'
```
**Grabación de Video**: Si un test falla, el video de la ejecución del test será retenido para su revisión.
```bash
video: 'retain-on-failure'
```
Estas configuraciones están pensadas para facilitar el análisis y la depuración de los fallos en las pruebas.

**Acceso a la Evidencia**
Cuando se detecten fallos en las pruebas, podrás encontrar las capturas de pantalla y los videos generados en el directorio de reportes que se configura automáticamente durante la ejecución de los tests. Para visualizar las pruebas fallidas con las capturas y videos, puedes ejecutar el comando anteriormente mencionado para la generacion de reportes:
```bash
npx playwright show-report
```

## Consideraciones adicionales

**Playwright Debugging**: Si necesitas ejecutar las pruebas en modo de depuración, puedes usar el siguiente comando:
```bash
npx playwright test --debug
```
**Reemplazo de Imágenes**: La carpeta images será creada automáticamente al ejecutar las pruebas de validación web. Las imágenes existentes serán sobrescritas si ya existen archivos con el mismo nombre.

