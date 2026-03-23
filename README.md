#  Reto Técnico de Automatización E2E - Sauce Demo

Este repositorio contiene la resolución del reto técnico de automatización de pruebas para la plataforma [Sauce Demo](https://www.saucedemo.com/). El proyecto está diseñado bajo el patrón **Page Object Model (POM)** y utiliza **BDD (Behavior-Driven Development)** para garantizar pruebas legibles, escalables y fáciles de mantener, cumpliendo con los criterios de aceptación establecidos.



##  Stack Tecnológico

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![🎭Playwright](https://img.shields.io/badge/Playwright-1.58.2-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber.js-12.7.0-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)
![Node.js](https://img.shields.io/badge/npm-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

*Las versiones especificadas garantizan la compatibilidad y estabilidad del proyecto tal como se definió en el `package.json`.*

## ⚙️ Requisitos Previos
Asegúrate de tener instalado lo siguiente en tu entorno local antes de ejecutar el proyecto:
* [Node.js](https://nodejs.org/) (versión 16 o superior)
* Git

##  Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone (https://github.com/TU_USUARIO/reto-saucedemo-playwright.git)
   cd reto-saucedemo-playwright
   ```

2. **Instalar las dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Instalar los binarios de los navegadores de Playwright:**
   ```bash
   npx playwright install chromium
   ```

##  Estructura del Proyecto
```text
📦 reto-saucedemo-playwright
 ┣ 📂 features/       # Escenarios de prueba en lenguaje natural (Gherkin)
 ┣ 📂 pages/          # Clases del patrón Page Object Model (POM)
 ┣ 📂 steps/          # Definición de pasos (Step Definitions)
 ┣ 📂 support/        # Hooks de configuración y ciclo de vida del navegador
 ┣ 📜 cucumber.js     # Archivo de configuración principal de Cucumber
 ┣ 📜 package.json    # Dependencias y scripts de ejecución
 ┗ 📜 README.md       # Documentación del proyecto
```

##  Ejecución de las Pruebas

Para ejecutar **toda la suite** de pruebas de forma automatizada, utiliza el siguiente comando en la terminal:
```bash
npm test
```

### Ejecución Específica por Etiquetas (Tags)
El proyecto cuenta con una estrategia de *tags* para ejecutar flujos independientes y validar criterios de aceptación específicos:

* **Ejecutar solo las pruebas de Autenticación (Standard & Locked Out User):**
  ```bash
  npx cucumber-js --tags "@Login"
  ```
* **Ejecutar solo el flujo completo de Compra (Agregar producto, Ver carrito y Checkout):**
  ```bash
  npx cucumber-js --tags "@Shopping"
  ```



##  Estrategia de Automatización y Decisiones Técnicas

Para este reto, monté una arquitectura que prioriza el mantenimiento y la legibilidad, asegurando que el código mapee exactamente con los requerimientos del negocio. Estos son los tres pilares de la solución:

### 1. Story Splitting y Cobertura de Criterios
La Historia de Usuario original planteada en el reto ("Como cliente, quiero iniciar sesión, agregar productos y completar la compra") funcionaba como una Épica al abarcar múltiples dominios. Para seguir el principio de responsabilidad única, apliqué *Story Splitting* dividiendo la lógica en dos archivos .feature independientes:

* **Feature de Login:** Enfocado en la seguridad perimetral y accesos.
    * **Criterio 1:** Inicio de sesión con credenciales válidas.
    * **Criterio 2:** Restricción de acceso con credenciales inválidas y manejo de usuarios bloqueados.

* **Feature de Compra:** Enfocado en el flujo core de negocio desde el catálogo hasta la orden.
    * **Criterio 3:** Adición de productos al carrito desde la landing de productos.
    * **Criterio 4:** Persistencia y visualización de productos en el carrito.
    * **Criterio 5:** Flujo completo de checkout hasta la confirmación de compra.

Esta estructura evita que fallos en el módulo de pagos oculten errores en el módulo de login, facilitando el mantenimiento y la identificación de bugs de forma aislada.


### 2. Selectores estables y plan de contingencia
Para evitar los odiados *flaky tests* (que se rompen cuando front-end cambia una clase CSS o mueve un div), la estrategia de búsqueda de elementos fue la siguiente:

* **Locators principales (`data-test`):** Se priorizó el uso de atributos exclusivos para pruebas en todo el framework. Es el estándar de la industria porque desacopla completamente la automatización del diseño visual.
* **Locators de respaldo:** Sabemos que en un entorno de desarrollo real no siempre tenemos la suerte de que existan atributos `data-test` en todos los elementos. Para esos casos, el framework está pensado para usar selectores semánticos de Playwright (como `getByRole` o `getByText`) o, como última línea de defensa, la vieja confiable de selectores CSS y XPath.

### 3. Organización de Playwright, Cucumber y POM
Como el reto ya pedía usar esta combinación, me enfoqué en que la estructura quedara bien limpia. Mantuve cada cosa en su lugar para no mezclar la manipulación de la web con la lógica de negocio, dividiéndolo de la siguiente manera:

* **📁 `/pages` (Interacción con el navegador):** Aquí encapsulé toda la interacción directa usando el motor de Playwright (locators, clics, escritura). Creé clases específicas para cada vista de la aplicación:
  * `LoginPage`: Maneja el formulario de inicio de sesión.
  * `InventoryPage`: Maneja el catálogo y la selección de productos.
  * `CartPage`: Maneja la revisión del carrito de compras.
  * `CheckoutPage`: Maneja el formulario de pago y la confirmación.


* **📁 `/steps` (Lógica de negocio y validaciones):** Esta capa funciona exclusivamente como puente. Los steps solo leen el escenario de Cucumber, invocan los métodos de las Pages y rematan con los asserts (`expect`). Cero interacción directa con el DOM.
  * `loginSteps.ts`: Valida los flujos de autenticación (éxito, credenciales inválidas y bloqueos).
  * `compraSteps.ts`: Orquesta el flujo E2E del carrito y el checkout.



