// Externals

import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { addMocksToSchema } from 'graphql-tools'
import cors from 'cors'

// mocks
// eslint-disable-next-line no-restricted-imports
import { schemaString, mocks } from './index'

const app = express()

const schema = buildSchema(schemaString)

app.use(cors())

const buildschema = addMocksToSchema({
  schema,
  mocks,
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildschema,
    graphiql: true,
  })
)

// eslint-disable-next-line no-console
app.listen(4000, () => console.log('Mock Graphql server is listening on port 4000!'))
