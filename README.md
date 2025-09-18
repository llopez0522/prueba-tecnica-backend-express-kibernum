# Backend API con Arquitectura Hexagonal

Este proyecto implementa una├── shared/ # 🔄 UTILIDADES COMPARTIDAS
│ ├── Config.ts # Configuración de la aplicación
│ └── swagger.ts # Configuración de Swagger UI
│
├── App.ts # 🚀 Configuración principal de Express
└── main.ts # 🎯 Punto de entrada de la aplicación

```

## 🚀 Endpoints de la API

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| GET    | `/api/tasks`     | Obtener todas las tareas |
| POST   | `/api/tasks`     | Crear una nueva tarea    |
| PUT    | `/api/tasks/:id` | Actualizar una tarea     |
| DELETE | `/api/tasks/:id` | Eliminar una tarea       |
| GET    | `/health`        | Health check de la API   |
| GET    | `/api-docs`      | Documentación Swagger UI |
| GET    | `/api-docs.json` | Especificación OpenAPI   |ul para gestión de tareas siguiendo los principios de **Arquitectura Hexagonal** (también conocida como Ports and Adapters) usando Node.js, Express.js, TypeScript y PrismaJS.

## 🏗️ Arquitectura Hexagonal

La arquitectura hexagonal separa la lógica de negocio de los detalles de implementación, proporcionando:

- **Testabilidad**: Fácil testing unitario al aislar la lógica de negocio
- **Mantenibilidad**: Cambios en infraestructura no afectan el dominio
- **Flexibilidad**: Fácil intercambio de adaptadores (base de datos, frameworks, etc.)
- **Inversión de dependencias**: El dominio no depende de la infraestructura

### Capas de la Arquitectura

```

┌─────────────────────────────────────────────────────────────┐
│ 🌐 INTERFACES │
│ (Controllers, Routes, Middlewares - HTTP Adapters) │
├─────────────────────────────────────────────────────────────┤
│ 📋 APPLICATION │
│ (Use Cases, DTOs - Application Services) │
├─────────────────────────────────────────────────────────────┤
│ 🏛️ DOMAIN │
│ (Entities, Value Objects, Repository Interfaces) │
├─────────────────────────────────────────────────────────────┤
│ 🔧 INFRASTRUCTURE │
│ (Database, External APIs - Implementation Details) │
└─────────────────────────────────────────────────────────────┘

```

## 📁 Estructura del Proyecto

```

src/
├── domain/ # 🏛️ CAPA DE DOMINIO
│ ├── shared/ # Elementos compartidos del dominio
│ │ ├── BaseEntity.ts # Entidad base
│ │ └── DomainErrors.ts # Errores del dominio
│ └── task/ # Contexto de tareas
│ ├── entities/ # Entidades del dominio
│ │ └── Task.ts # Entidad Task
│ └── repositories/ # Interfaces de repositorio
│ └── TaskRepository.ts
│
├── application/ # 📋 CAPA DE APLICACIÓN
│ └── task/
│ ├── dtos/ # Data Transfer Objects
│ │ └── TaskDtos.ts
│ └── usecases/ # Casos de uso
│ ├── CreateTaskUseCase.ts
│ ├── GetAllTasksUseCase.ts
│ ├── UpdateTaskUseCase.ts
│ └── DeleteTaskUseCase.ts
│
├── infrastructure/ # 🔧 CAPA DE INFRAESTRUCTURA
│ ├── database/ # Configuración de base de datos
│ │ └── DatabaseConnection.ts
│ └── repositories/ # Implementaciones de repositorio
│ └── PrismaTaskRepository.ts
│
├── interfaces/ # 🌐 CAPA DE INTERFACES
│ └── http/ # Adaptadores HTTP
│ ├── controllers/ # Controladores REST
│ │ └── TaskController.ts
│ ├── routes/ # Definición de rutas
│ │ └── taskRoutes.ts
│ └── middlewares/ # Middlewares de Express
│ └── errorHandler.ts
│
├── shared/ # 🔄 UTILIDADES COMPARTIDAS
│ ├── Config.ts # Configuración de la aplicación
│ └── swagger.ts # Configuración de Swagger UI
│
├── App.ts # 🚀 Configuración principal de Express
└── main.ts # 🎯 Punto de entrada de la aplicación

````

## 🚀 Endpoints de la API

| Método | Endpoint         | Descripción              |
|--------|------------------|--------------------------|
| GET    | `/api/tasks`     | Obtener todas las tareas |
| POST   | `/api/tasks`     | Crear una nueva tarea    |
| PUT    | `/api/tasks/:id` | Actualizar una tarea     |
| DELETE | `/api/tasks/:id` | Eliminar una tarea       |
| GET    | `/health`        | Health check de la API   |
| GET    | `/api-docs`      | Documentación Swagger UI |
| GET    | `/api-docs.json` | Especificación OpenAPI   |

## 📚 Documentación Interactiva con Swagger UI

La API incluye documentación interactiva completa usando **Swagger UI** y **OpenAPI 3.0**:

- **🌐 Swagger UI**: `http://localhost:3000/api-docs`
- **📄 OpenAPI JSON**: `http://localhost:3000/api-docs.json`

### Características de la Documentación:

✅ **Interfaz Interactiva**: Prueba todos los endpoints directamente desde el navegador
✅ **Esquemas Detallados**: Definiciones completas de Request/Response
✅ **Ejemplos en Vivo**: Datos de ejemplo para cada endpoint
✅ **Validaciones**: Documentación de todas las reglas de validación
✅ **Códigos de Estado**: Explicación de todos los códigos HTTP posibles
✅ **Arquitectura**: Documentación de la arquitectura hexagonal implementada

### Ejemplos de Uso

#### Crear una tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Completar proyecto",
    "description": "Finalizar la implementación del backend"
  }'
````

#### Obtener todas las tareas

```bash
curl http://localhost:3000/api/tasks
```

#### Actualizar una tarea

```bash
curl -X PUT http://localhost:3000/api/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarea actualizada",
    "description": "Nueva descripción",
    "completed": true
  }'
```

#### Eliminar una tarea

```bash
curl -X DELETE http://localhost:3000/api/tasks/:id
```

#### Acceder a la Documentación Swagger

```bash
# Abrir Swagger UI en el navegador
open http://localhost:3000/api-docs

# O obtener la especificación OpenAPI JSON
curl http://localhost:3000/api-docs.json
```

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js >= 18
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar la base de datos**

```bash
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

3. **Configurar variables de entorno**

```bash
# El archivo .env ya está configurado con valores por defecto
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=publi"
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

5. **Acceder a la aplicación**

```bash
# API Principal
http://localhost:3000

# Documentación Swagger UI
http://localhost:3000/api-docs

# Health Check
http://localhost:3000/health

# Endpoints de tareas
http://localhost:3000/api/tasks
```

6. **Compilar para producción**

```bash
npm run build
npm start
```

## 🏛️ Detalles de la Arquitectura

### Capa de Dominio (Domain)

- **Propósito**: Contiene la lógica de negocio pura
- **Responsabilidades**:
  - Definir entidades y reglas de negocio
  - Establecer contratos (interfaces) para repositorios
  - Validaciones de dominio
- **Independencia**: No depende de ninguna otra capa

### Capa de Aplicación (Application)

- **Propósito**: Orquesta los casos de uso de la aplicación
- **Responsabilidades**:
  - Implementar casos de uso específicos
  - Coordinar entre dominio e infraestructura
  - Transformar datos con DTOs
- **Dependencias**: Solo del dominio

### Capa de Infraestructura (Infrastructure)

- **Propósito**: Implementa los detalles técnicos
- **Responsabilidades**:
  - Implementar repositorios concretos
  - Configurar conexiones a base de datos
  - Integrar servicios externos
- **Dependencias**: Del dominio y aplicación

### Capa de Interfaces (Interfaces)

- **Propósito**: Expone la aplicación al mundo exterior
- **Responsabilidades**:
  - Manejar requests/responses HTTP
  - Rutear peticiones
  - Manejar errores
- **Dependencias**: De todas las capas internas

## 🔧 Características Técnicas

### Validaciones

- Validación de DTOs con métodos personalizados
- Validación de entidades en el dominio
- Manejo robusto de errores con middlewares

### Manejo de Errores

- Errores específicos del dominio (`DomainError`, `EntityNotFoundError`, `ValidationError`)
- Middleware centralizado de manejo de errores
- Respuestas HTTP semánticas

### Base de Datos

- ORM: PrismaJS con SQLite (fácil cambio a PostgreSQL/MySQL)
- Migraciones automáticas
- Conexión singleton con pooling

### TypeScript

- Tipado estricto habilitado
- Paths aliases para imports limpios
- Decorators para futura extensibilidad

## 🗄️ Decisión de Base de Datos: PostgreSQL

### ¿Por qué PostgreSQL para esta prueba técnica?

He elegido **PostgreSQL** como base de datos para esta implementación por las siguientes razones técnicas:

#### ✅ **Ventajas para Entornos Profesionales**

- **Robustez Empresarial**: PostgreSQL es ampliamente utilizado en entornos de producción
- **Compatibilidad**: Refleja mejor las decisiones tecnológicas de aplicaciones reales
- **Escalabilidad**: Manejo superior de concurrencia y grandes volúmenes de datos

#### ✅ **Características Técnicas Relevantes**

- **ACID Compliance**: Garantías de transacciones robustas
- **Extensibilidad**: Soporte para JSON, arrays y tipos de datos avanzados
- **Performance**: Optimizaciones automáticas y índices eficientes
- **Integridad Referencial**: Constraints y validaciones a nivel de base de datos

#### ✅ **Beneficios para el Desarrollo**

- **PrismaJS Integration**: Excelente soporte y generación de tipos TypeScript
- **Docker-Friendly**: Fácil containerización para desarrollo y despliegue
- **Tooling**: Abundantes herramientas de administración y monitoreo

#### 🔄 **Flexibilidad de la Arquitectura Hexagonal**

Gracias a la **Arquitectura Hexagonal** implementada, cambiar de PostgreSQL a otra base de datos (MySQL, MongoDB, etc.) requiere únicamente:

1. Modificar la implementación del repositorio en la capa de infraestructura
2. Actualizar la configuración de PrismaJS
3. **La lógica de negocio permanece intacta**

```typescript
// Solo cambiaríamos esta implementación:
// src/infrastructure/repositories/PrismaTaskRepository.ts
// El dominio y aplicación no se ven afectados
```

### Configuración de PostgreSQL

```bash
# Variables de entorno para PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/zurich_tasks_db"

# Docker Compose para desarrollo local
docker-compose up -d postgres
```

Esta decisión demuestra el valor de la **Arquitectura Hexagonal**: podemos tomar decisiones de infraestructura sin comprometer la lógica de negocio, manteniendo la aplicación testeable y flexible.

## 📚 Principios Aplicados

### SOLID

- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Open/Closed**: Extensible sin modificar código existente
- **Liskov Substitution**: Interfaces bien definidas
- **Interface Segregation**: Interfaces específicas y cohesivas
- **Dependency Inversion**: Dependencias hacia abstracciones

### Clean Architecture

- Separación clara de responsabilidades
- Flujo de dependencias hacia el dominio
- Testabilidad mediante inversión de dependencias

### Domain-Driven Design (DDD)

- Entidades con lógica de negocio encapsulada
- Value Objects para conceptos del dominio
- Repositorios como abstracción de persistencia

## 🧪 Testing (Recomendaciones)

La arquitectura facilita el testing en múltiples niveles:

```bash
# Testing unitario del dominio
src/domain/__tests__/

# Testing de casos de uso
src/application/__tests__/

# Testing de integración
src/infrastructure/__tests__/

# Testing end-to-end
src/interfaces/__tests__/
```

## 🚀 Despliegue

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de Entorno para Producción

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/tasks_db"
```

## 👥 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 🎯 Flujo de Comunicación Entre Capas

```
📱 HTTP Request
    ↓
🌐 Controller (Interfaces)
    ↓
📋 Use Case (Application)
    ↓
🏛️ Domain Entity + Repository Interface (Domain)
    ↓
🔧 Repository Implementation (Infrastructure)
    ↓
💾 Database (PrismaJS + SQLite)
    ↓
🔧 Repository Implementation (Infrastructure)
    ↓
🏛️ Domain Entity (Domain)
    ↓
📋 DTO Response (Application)
    ↓
🌐 HTTP Response (Interfaces)
    ↓
📱 Client
```

Este diseño garantiza que los cambios en la infraestructura (base de datos, framework web) no afecten la lógica de negocio, y que la aplicación sea fácilmente testeable y mantenible.
