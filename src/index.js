const { ApolloServer, UserInputError } = require('apollo-server-express')
const express = require('express')
const { PrismaClient } = require('@prisma/client')
const {schema} = require('./schema.js')
const port=8081
const app = express()
const prisma = new PrismaClient()


async function startServer() {
  const server = new ApolloServer({schema})
  await server.start()
  server.applyMiddleware({ app })
}

startServer()

app.listen(port, ()=>{
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})