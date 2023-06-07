import fp from "fastify-plugin"

export default fp((server, opts, next) => {
  server.register(require("fastify-jwt"), {
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
})
