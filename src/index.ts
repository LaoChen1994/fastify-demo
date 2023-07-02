import createServer from "./server"

const PORT = process.env.PORT || "3000"
const server = createServer()

server.listen({
  port: +PORT,
}, (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
