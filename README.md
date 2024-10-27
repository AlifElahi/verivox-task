# Responsive Item List Renderer (verivox-interview)

This project is designed to render item cards in a responsive, mobile-first list layout, using optimized DOM handling for smooth and efficient rendering of large datasets. Key design principles include reusability, modular architecture, and adherence to design patterns to maintain a clean and maintainable codebase.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Design and Optimization](#design-and-optimization)
- [Conclusion](#conclusion)

## Getting Started

### Prerequisites

- **Node.js** (version 16.14 or above; Node 18 or 20 recommended)
- **Angular CLI** (compatible with Angular 17.3)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlifElahi/verivox-task.git
   cd verivox-task
2. **Install dependencies:**:
   ```bash
   npm install
3. **Run the development server**:
   ```bash
   ng serve
4. **Run the development server**:
   Visit http://localhost:4200 to view the application.

##### For Linux Users

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlifElahi/verivox-task.git
   cd verivox-task
2. **Install dependencies & run the development server:**:
   ```bash
   npm run setup-linux

## Project Structure

- **src/app/shared/ui**: Contains reusable UI components used across the application. These components are modular and can be easily called in other components, promoting reusability.
- **src/app/modules**: Holds feature-specific modules, including components, services, and data sources that structure the primary functionalities of the app.
- **src/app/core**: Holds core components, services which are commonly used in all modules like header.

## Key Features

- **Responsive, Mobile-First Design**: This project is built with responsiveness in mind, ensuring a smooth user experience on all screen sizes, especially on mobile devices.
  
- **Reusability and Modularity**: The application is structured to minimize code duplication and encourage component reuse. Most UI components are placed in a shared UI folder, enabling them to be easily integrated into other components.
  
- **Optimized Rendering with CDK Virtual Scrolling**: The Angular CDK Virtual Scrolling library is used to manage DOM elements efficiently, allowing smooth scrolling and reduced memory usage, even with a large list of items.
  
- **Dynamic Component Rendering with Directives**: A custom directive is implemented to handle dynamic component rendering by passing a component reference for each item in the list. This approach enhances flexibility and promotes reusability of list items.

- **Module Lazy Loading**: Feature-specific modules are lazy-loaded, improving initial load times and optimizing resource usage by only loading necessary modules when required.

## Design and Optimization

In this project, I aimed to follow design patterns and principles such as DRY (Don't Repeat Yourself) and modularization. By structuring the code in a reusable and modular way, the project minimizes redundancy, making it more maintainable and efficient. Here are some key aspects:

- **Template Method Pattern**: Used in the data source classes to ensure a consistent approach to data fetching, sorting, and pagination, avoiding repetitive code across different lists and data sources.

- **Dependency Injection**: Ensures loose coupling by allowing dynamic component references to be injected and rendered at runtime. This supports DRY by enabling components to be dynamically provided without requiring separate, hard-coded implementations.

- **Component Factory**: Facilitates dynamic component creation within the list, enhancing extensibility and reuse across different data lists. This helps enforce DRY by reducing redundant code in list item rendering, allowing various components to be rendered flexibly using the same logic.


## Conclusion

This project is designed with a strong focus on reusability and maintainability, ensuring a flexible and scalable foundation that can support future growth. By implementing design patterns and structuring the code to minimize redundancy, this project remains adaptable and easy to extend. Attention to performance optimization—such as leveraging Angular's CDK Virtual Scrolling and lazy loading of modules—ensures that the application performs efficiently, even as the dataset and feature set expand.

Thanks for your visit.

