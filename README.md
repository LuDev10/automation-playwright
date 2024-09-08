# Proyecto Challenge automation - Monnet Payments

Este proyecto contiene pruebas automatizadas utilizando Playwright para interactuar con las APIs de PokeAPI y JsonPlaceholder. A continuación, se detallan los pasos necesarios para configurar y ejecutar las pruebas.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

2. **Playwright**: Este proyecto utiliza Playwright para las pruebas automatizadas. Puedes instalarlo junto con las dependencias del proyecto.

## Instalación

1. Clona el repositorio en tu máquina local:
    
    
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

Para ejecutar las pruebas automatizadas y generar un reporte, utiliza el siguiente comando:
```bash
export SECRET_PASS="tu-contraseña-secreta" && npx playwright test




