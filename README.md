```markdown
# Ecommerce TechSed Test

## Introduction

Ecommerce TechSed Test is a sample e-commerce project designed to demonstrate the use of modern web development technologies. It includes features such as product listings, product details, and a dynamic footer and layout system. The project is built with scalability in mind and focuses on providing a smooth user experience with a responsive design.

## Installation

To run the project locally, follow these steps:
```

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ecommerce-techsed.git
```

2. Navigate to the project directory:
   ```bash
   cd ecommerce-techsed
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000` to view the application.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## Technologies

The project uses the following technologies and packages:

- **Next.js pages router** - Used due to situational judgment test featuring answers exclusive to pages router. I decided it would be better to make the test in the technology used in day to day work at your company
- **Tailwind CSS** - Utility-first CSS framework for creating custom designs without leaving your HTML.
- **Formik** - Form management library to handle forms in React applications.
- **Jest** - Testing framework for unit and integration tests. Right now only product form implementation test is working.
- **React Testing Library** - A testing library for React to encourage best practices.

## Criterios de Evaluación

### 1. Manejo de React

- **Uso eficiente de Hooks (como useState y useEffect)**:
  En mi proyecto, utilizo `useState` para manejar los estados locales de los componentes, como la visibilidad de los menús móviles o el estado de las entradas del formulario. `useEffect` se emplea para realizar tareas como la carga de estados de cliente lo que garantiza que el proyecto sea reactivo y eficiente. Por ejemplo, en el componente `NavbarPrincipal`, `useState` se utiliza para manejar el estado del menú móvil. `useEffect` se usa en `ProductCard` para verificar que el componente Link se cargue en cliente para evitar problemas de Hydration.

- **Creación de componentes reutilizables y dinámicos**:
  He diseñado componentes modulares que pueden ser reutilizados en diferentes partes del proyecto, como botones, formularios, y tarjetas de productos. Esto permite una fácil expansión y mantenimiento del código, ya que cualquier cambio en un componente se refleja automáticamente en todas las instancias donde se utiliza. Por ejemplo, el componente `Principal Layout` se utiliza en todas las rutar denotadas en un archivo de configuración en `src/layouts` permitiendo el uso dinámico de componentes.

### 2. Modelado de Datos

- **Organización y manejo de la estructura del producto**:
  La estructura del producto en el proyecto está cuidadosamente organizada, utilizando un enfoque basado en objetos y arrays para modelar los productos, sus variantes y detalles relacionados. Esto facilita la gestión de la información y permite una fácil extensión en caso de agregar nuevos atributos o relaciones entre productos. Por ejemplo, los productos se modelan con propiedades como `id`, `title`, `description`, `price`, `stock`, `salesUnit`, y `measurementUnit`, lo que permite una gestión clara y estructurada de los datos del producto.

- **Validaciones basadas en el tipo de producto**:
  He implementado validaciones en los formularios de entrada que aseguran que los datos proporcionados por el usuario sean correctos según el tipo de producto. Esto incluye validaciones como asegurarse de que los precios estén en el formato correcto o que los campos obligatorios no estén vacíos, lo que mejora la integridad de los datos y la experiencia del usuario. Por ejemplo, en el componente `ProductForm`, se valida que la cantidad ingresada sea un número positivo y que el precio esté en el formato correcto antes de permitir la sumisión del formulario.

### 3. Interfaz de Usuario

- **Facilidad de uso y claridad del diseño**:
  El diseño de la interfaz está enfocado en ser intuitivo y fácil de usar. Los elementos clave están claramente definidos, con botones y formularios bien etiquetados, lo que permite que los usuarios naveguen sin dificultad. Por ejemplo, en la vista de detalles del producto, los botones de "Comprar ahora" y "Agregar al carrito" están claramente etiquetados y posicionados de manera prominente para facilitar la interacción del usuario.

- **Capacidad de adaptarse a pantallas de teléfono**:
  He utilizado principios de diseño responsivo, aplicando media queries y unidades relativas para asegurar que el proyecto se ajuste adecuadamente a diferentes tamaños de pantalla, especialmente a teléfonos móviles. Esto asegura que los usuarios tengan una experiencia de usuario fluida y consistente en todos los dispositivos. Por ejemplo, el componente `NavbarPrincipal` se adapta a pantallas móviles mostrando un menú desplegable en lugar de la barra de navegación completa.

### 4. Código limpio y estructurado

- **Buenas prácticas de desarrollo**:
  He seguido buenas prácticas en cuanto a la organización del código, como el uso de un enfoque modular para los componentes y la separación de la lógica de la presentación. Además, utilizo convenciones de nomenclatura coherentes y legibles para facilitar la comprensión del código. Por ejemplo, los componentes están organizados en carpetas según su funcionalidad, y los nombres de las variables y funciones siguen un esquema de nomenclatura consistente y descriptivo.

- **Uso de comentarios para explicar la lógica**:
  El código está bien documentado, con comentarios claros que explican la lógica detrás de las funciones y las decisiones importantes. Esto facilita el mantenimiento y la colaboración, además de garantizar que cualquier desarrollador que trabaje en el proyecto pueda entender rápidamente el propósito de cada sección de código. Por ejemplo, en el archivo `ProductForm.tsx`, se incluyen comentarios que explican la lógica de sanitización de entradas y la configuración de unidades de venta.

## Licence

This project is licensed under the MIT License

## Cambios realizados después del refactor

### 1. Reorganización de funciones para encapsular lógica

- **Funciones auxiliares**: Moví funciones como `sanitizeInput` y `parseValue` a `utils/helpers.ts`, mejorando la legibilidad y reduciendo la complejidad dentro de los componentes principales.
- **Hooks personalizados**: Encapsulé la lógica de manejo de eventos para formularios en un hook reutilizable. Este hook sirve como plantilla base adaptable para cada tipo de producto, promoviendo la modularidad y el mantenimiento del código.

### 2. Layouts y Footers dinámicos

- Anteriormente, los layouts y footers de rutas dinámicas se definían a través de un objeto de mapeado con rutas específicas, como `/productos` o `/users`, y admitían rutas dinámicas como `/productos/[slug]` solo si estaban explícitamente definidas.
- Ahora, implementé un **sistema de enrutado dinámico generalizado** que soporta el nesteo automático de rutas. Esto permite manejar layouts y footers dinámicos para cualquier nivel de rutas sin necesidad de agregar cada string manualmente.

### 3. Formularios personalizados por unidad de venta

- Separé los formularios en componentes individuales específicos para cada tipo de unidad de venta. Este enfoque:
  - Mejora la legibilidad del código.
  - Permite una personalización granular de cada formulario.
  - Facilita la expansión del sistema para admitir nuevas unidades de venta con menor esfuerzo.

### 4. Tests de integración

- Previamente, los tests unitarios eran suficientes porque toda la lógica se encontraba dentro de un solo componente.
- Tras el refactor, añadí **tests de integración** para garantizar que los componentes interactúen correctamente con los nuevos manejadores de eventos.
- Por ahora, como prueba inicial, solo se testea el formulario para la unidad de venta de área, pero este enfoque será escalable para otros formularios en el futuro.
