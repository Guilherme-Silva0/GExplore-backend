import { fastify } from 'fastify'

const app = fastify()
export type ServerType = typeof app

const PORT = (process.env.PORT as number | undefined) || 3001

app.setErrorHandler(({ message }, _, reply) => {
  reply.status(400).send({ error: true, message })
})

app
  .listen({ port: PORT })
  .then(() => {
    console.log(`HTTP Server running on http://localhost:${PORT}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

export { app }
