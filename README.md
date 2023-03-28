<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# **Gym API**<br />
![Github][github.badge] ![GitHub Actions][githubActions.badge] ![Node.JS][nodejs.badge] ![TypeScript][typeScript.badge] ![Fastify][Fastify.badge] ![Prisma][Prisma.badge] ![PostgreSQL][PostgreSQL.badge] ![Vitest][Vitest.badge] ![Swagger][Swagger.badge]
----
<br />

<table>
<tr>
<td align="center">
Efficient, maintainable, and reliable gym software backend utilizing SOLID principles and advanced technologies.
</td>
</tr>
</table>
<br />

[Summary](#summary) •
[Solution](#solution) •
[Requirements](#requirements) •
[Quickstart](#quickstart) •
[Test](#test) 

</div>

## **Summary**

This project is a REST API that serves as the backend for a gym software. The project implements SOLID principles to ensure efficient, maintainable, and reliable code. It also utilizes various technologies such as Vitest, Typescript, Prisma, GitHubActions, and Fastify to support its functionality.

## **Solution**

This project is a REST API that serves as the backend for a gym software. The API has been developed with a focus on implementing SOLID principles to ensure efficient, maintainable, and reliable code.

To support its functionality, the project utilizes various advanced technologies, including:

- Vitest for both unit testing and end-to-end testing, ensuring robust and reliable code
Typescript for improved type safety and maintainability, enabling more efficient code development
- Prisma for database management, streamlining database operations and enhancing performance
- GitHubActions for continuous integration and deployment, enabling automated and efficient deployment processes
- Fastify as a web framework for high-performance and scalability, ensuring efficient and responsive API operations
- JWT for authentication, implementing both auth token and refresh token

In addition, the build package for this project was created using the tsup package.

Overall, this project was a great learning experience that allowed me to work with a variety of powerful tools and technologies. I am excited to share my work with others and hope that it can be useful to those looking to explore these tools further.

## **Requirements**

- Node.JS: 18.14.0
    - NPM Package: 9.3.1

## **Quickstart**

Below are the step-by-step instructions for running the project and accessing the endpoints specified throughout this document:
<br />

### **Development**

1. Build and run a PostgreSQL container 
    + `docker-compose up -d --build`
    > **Warning** <br />
    Note that this step is only necessary if you do not already have a database instance set up. If you do have an instance set up, you can simply specify the connection details for that instance in the project's environment file (.env), and skip this step.
2. Create a `.env` file with NODE_ENV, JWT_SECRET and DATABASE_URL environment variable (check the example file [.env.example])
3. Run the Prisma library migrate to update the database schema
    + `npx prisma migrate dev`
    > **Warning** <br />
    Please note that the `npx prisma migrate dev` command is intended for use only in the development environment. In production, it's not necessary to run migrate dev during deployment because there's no need to check for differences between an existing schema and its updated version. Instead, you can simply use the `npx prisma migrate deploy` command to apply pending migrations. 
4. Install npm packages:
    + `npm install`
5. To run the project in Watch mode use:
    + `npm run start:dev`
<br />

### **Production**

1. Create a `.env` file with NODE_ENV, JWT_SECRET and DATABASE_URL environment variable (check the example file [.env.example])
2. Run the Prisma library migrate to update the database schema
    + `npx prisma migrate deploy`
3. Run the command tsup to transpile the TypeScript code to JavaScript. This will generate the JavaScript files in the ./build directory:
    + `npm run build`
4. Once the transpilation is complete, to start the server and access the endpoints, run the following code:
    + `npm run start` or `node ./build/server.js`
<br />

### **API Documentation**

Access API Documentation on your browser:
    `http://localhost:3333/docs`
<br />

> **Warning** <br /> * This API uses a cookie to hold the JWT refresh token, so it needs to be sent to renew the access token. Regarding the Access Token, this is a JWT token too and is carried in the request header.

## **Test**

To run tests, use the following command:

1. Unit tests
    + `npm run test`

2. End to End (e2e) tests:
    + `npm run test:e2e`
    

> **Warning** <br /> * To run the End to End (e2e) tests, it is mandatory to fill in the .env file with a valid PostgreSQL database URL, as it will be used together with vittest (schemas will be created and deleted during these tests). Regarding the unit test, these use structures in memory aiming at greater speed, as suggested by Martin Fowler in his article [In Memory Test Database][InMemoryTestDatabase.MartinFowler]

[github.badge]: https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white
[githubActions.badge]: https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white
[nodejs.badge]: https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white
[typeScript.badge]: https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white
[Fastify.badge]: https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white
[Prisma.badge]: https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white
[PostgreSQL.badge]: https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white
[Vitest.badge]: https://img.shields.io/badge/Vitest-6E9F18.svg?style=for-the-badge&logo=Vitest&logoColor=white
[Swagger.badge]: https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black
[InMemoryTestDatabase.MartinFowler]: https://martinfowler.com/bliki/InMemoryTestDatabase.html
[.env.example]: .env.example
[.env.test.example]: .env.test.example