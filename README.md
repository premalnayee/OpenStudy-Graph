# OSC CourseHub

OSC CourseHub is a backend GraphQL API designed to manage distance learning courses and course collections for Open Study College. It provides operations to create, read, update, and delete course data and user accounts. The API is built with TypeScript, Node.js, Apollo Server, TypeORM, and PostgreSQL, and it includes JWT-based authentication and role-based authorization for secure operations.

## Features

- **GraphQL API:** Built with Apollo Server and TypeGraphQL for a strongly typed API.
- **CRUD Operations:** Create, read, update, and delete courses and collections.
- **User Management:** Register and log in users with JWT-based authentication.
- **Role-based Authorization:** Protect sensitive operations based on user roles.
- **Database Integration:** Uses PostgreSQL with TypeORM for object-relational mapping.
- **Migration Support:** Manage database schema changes with TypeORM migrations.
- **Caching:** Leverage Apollo Server's cache control settings to optimize performance.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v7+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/premalnayee/OpenStudy-Graph.git
   cd OpenStudy-Graph
2. **Install Dependencies**

    ```bash
    npm install
3. **Configure Environment Variables**

    ```env 
    PORT=4000
    DATABASE_URL=postgres://osc_user:your_password@localhost:5432/osc_coursehub
    JWT_SECRET=your_jwt_secret
4. **Database Setup**

        psql -U postgres
        CREATE DATABASE osc_coursehub;

    Then run migrations (using ts-node in transpile-only mode):

    ```bash
    npx ts-node -T ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts
5. Running the Server

    ```bash
    npm run dev
    The server will start on http://localhost:4000/graphql, where you can use the GraphQL Playground to test queries and mutations.

## Usage
### Example Queries
#### Fetch a list of courses:
    query {
    courses(limit: 5, sortOrder: ASC) {
        id
        title
        description
        duration
        outcome
    }
    }

### Example Mutations
#### Register a new user:

    mutation {
    register(username: "testuser", password: "password123") {
        id
        username
        role
    }
    }

#### Log in a user:

    mutation {
    login(username: "testuser", password: "password123") {
        token
        user {
        id
        username
        }
    }
    }
#### Add a new course:

```graphql
mutation {
  addCourse(data: {
    title: "Introduction to GraphQL",
    description: "Learn the basics of GraphQL",
    duration: 120,
    outcome: "Understand GraphQL fundamentals"
  }) {
    id
    title
  }
}
```

## Caching and Performance
### Default Settings via Apollo Server Configuration:
Configure a default maxAge using the ApolloServerPluginCacheControl plugin:

```typescript
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 5 })],
  cache: "bounded", // use a bounded in-memory cache
});
```

## Deployment
OSC CourseHub has been deployed to Render, please message me for a link.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Follow the project’s code style and include tests for new features.

License
This project is licensed under the MIT License.

Contact
For questions or support, please open an issue in the repository.