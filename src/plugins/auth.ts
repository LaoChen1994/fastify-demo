import fp from "fastify-plugin"
import fastifyJwt from "@fastify/jwt"

export default fp(async (server, opts, next) => {
  server.register(fastifyJwt, {
    secret: "pd-server-test"
  })

  server.decorate("authenticate", async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  })

  next()
}, {
  name: 'pd-auth'
})
