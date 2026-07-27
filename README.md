# Playwright QA Portfolio

[![Playwright Tests](https://github.com/lucasAlarconQA/playwright-qa-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/lucasAlarconQA/playwright-qa-portfolio/actions/workflows/playwright.yml)

Framework de automatización End-to-End construido con **Playwright** y **JavaScript**, contra la aplicación de práctica [automationexercise.com](https://automationexercise.com). Este proyecto forma parte de mi portfolio como QA Automation Engineer y busca demostrar buenas prácticas de diseño de un framework de testing, no solo tests que "pasan".

## Stack técnico

- **[Playwright Test](https://playwright.dev/)** — motor de test y aserciones, corre en Chromium, Firefox y WebKit.
- **JavaScript (CommonJS)** — sin build step, simple de leer y mantener.
- **Page Object Model (POM)** — separación entre "qué se prueba" (tests) y "cómo se interactúa con la UI" (page objects).
- **Fixtures de Playwright** — inyección de page objects en los tests, sin instanciarlos manualmente.
- **ESLint + Prettier** — calidad y formato de código consistente (incluye `eslint-plugin-playwright`).
- **Allure Report** — reporte enriquecido con agrupación por _epic/feature_, severidad y _steps_ desglosados por test.
- **GitHub Actions** — ejecución automática de la suite en cada push/PR a `main`.

## Estructura del proyecto

```
playwright-qa-portfolio/
├── .github/workflows/      # Pipeline de CI (GitHub Actions)
├── tests/                  # Specs de test, organizados por feature
│   ├── auth/
│   └── products/
├── pages/                  # Page Objects: selectores + acciones de cada página
├── fixtures/                # Extensión del test de Playwright, inyecta page objects
├── data/                   # Datos de prueba (usuarios, credenciales inválidas)
├── utils/                  # Helpers genéricos (generación de datos random)
└── playwright.config.js    # Configuración central: navegadores, reportes, baseURL
```

**Por qué este diseño:** cada página del sitio es una clase en `pages/` con sus propios selectores y métodos de alto nivel (ej. `loginPage.login(email, password)`). Los tests en `tests/` solo orquestan esos métodos y hacen aserciones — si cambia un selector en la UI real, se corrige en un solo lugar.

## Cobertura de tests

| Test                      | Qué valida                                                              | Por qué se diseñó así                                                                                  |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `auth/login.spec.js`      | Mensaje de error con credenciales inválidas                             | No depende de una cuenta real, 100% reproducible                                                       |
| `auth/signup.spec.js`     | Registro de un usuario nuevo → cuenta creada → eliminación de la cuenta | Cada corrida genera y elimina su propio usuario (email random), es idempotente y no ensucia el sistema |
| `products/search.spec.js` | Búsqueda de productos por palabra clave                                 | Valida una feature core sin requerir login                                                             |
| `products/cart.spec.js`   | Agregar un producto al carrito y verificar su contenido                 | Otra feature core independiente de sesión                                                              |

Los cuatro escenarios evitan depender de datos fijos o cuentas preexistentes — condición necesaria para que la suite sea confiable corriendo en CI, donde cada ejecución parte de cero.

## Cómo correrlo localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/lucasAlarconQA/playwright-qa-portfolio.git
cd playwright-qa-portfolio

# 2. Instalar dependencias
npm install

# 3. Instalar los navegadores de Playwright
npx playwright install

# 4. Correr la suite completa (Chromium, Firefox, WebKit)
npm test
```

> El reporte Allure requiere tener **Java 8+** instalado (el CLI de Allure es una aplicación Java). El resto del proyecto no lo necesita.

## Scripts disponibles

| Comando                 | Qué hace                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `npm test`              | Corre toda la suite en los 3 navegadores                     |
| `npm run test:ui`       | Abre el modo UI interactivo de Playwright (ideal para debug) |
| `npm run test:headed`   | Corre los tests con el navegador visible                     |
| `npm run report`        | Abre el último reporte HTML generado                         |
| `npm run lint`          | Analiza el código con ESLint                                 |
| `npm run lint:fix`      | Corrige automáticamente lo que ESLint pueda                  |
| `npm run format`        | Formatea todo el código con Prettier                         |
| `npm run format:check`  | Verifica el formato sin modificar archivos                   |
| `npm run allure:report` | Genera y abre el reporte de Allure (requiere Java)           |

## Reportes y evidencia de fallos

Cada corrida genera un reporte HTML navegable (`playwright-report/`). Cuando un test falla, Playwright adjunta automáticamente:

- Captura de pantalla del momento del fallo.
- Video de la ejecución.
- Traza navegable (DOM, red y consola paso a paso) en el primer reintento.

En CI, tanto el reporte HTML nativo de Playwright como el reporte de **Allure** quedan disponibles como artifacts descargables desde la pestaña **Actions** de GitHub, incluso si los tests fallan. Allure agrupa los resultados por _epic_ (Authentication, Product Catalog) y _feature_ (Login, Signup, Search, Cart), y cada test se puede inspeccionar paso a paso gracias a los `allure.step()` definidos en los specs.

## Decisiones de diseño

Se priorizó que la suite sea **determinística y autosuficiente**: ningún test depende de una cuenta o dato preexistente, y el flujo de registro crea y elimina su propio usuario en cada corrida. Esto evita el problema típico de suites de e2e que se vuelven flaky o requieren mantenimiento manual de datos de prueba. El uso de Page Object Model y fixtures busca que agregar un nuevo test sea trivial: escribir el spec orquestando métodos ya existentes de los page objects, sin tocar selectores.
