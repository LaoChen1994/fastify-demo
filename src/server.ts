import fastify from "fastify"
import cors from "@fastify/cors"
import oas from 'fastify-oas'

import auth from "./plugins/auth"
import db from "./plugins/db-sequelize"
import healthHandler from "./modules/health/routes"
import productsHandler from "./modules/products/routes"
import inventoryHandler from "./modules/inventory/routes"


function createServer() {
  const server = fastify({ logger: true })

  server.register(cors);
  server.register(oas, {
    routePrefix: "/docs",
    exposeRoute: true,
    swagger: {
      info: {
        title: "inventory api",
        description: "api documentation",
        version: "0.1.0"
      },
      servers: [
        { url: "http://localhost:3000", description: "development" },
        {
          url: "https://<production-url>",
          description: "production"
        }
      ],
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      security: [{ bearerAuth: [] }],
      securityDefinitions: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  })

  server.register(auth)
  server.register(db)
  server.register(healthHandler)
  server.register(productsHandler)
  server.register(inventoryHandler)

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}

export default createServer
