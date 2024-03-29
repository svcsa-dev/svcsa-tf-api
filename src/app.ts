// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
// dotenv replaces all environmental variables from ~/.env in ~/config/custom-environment-variables.json
import * as dotenv from 'dotenv'
const dotEnvPath = process.env.NODE_ENV === "development" ? ".env.development" : ".env"

dotenv.config({path: dotEnvPath});

import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'

import { configurationValidator } from './configuration'
import type { Application } from './declarations'
import { logError } from './hooks/log-error'
import { mysql } from './mysql'
import { services } from './services/index'
import { channels } from './channels'
import swagger from 'feathers-swagger'


const app: Application = koa(feathers())
// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

// Configure services and transports
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(channels)
app.configure(mysql)
// Docs route
app.configure(
  swagger({
    prefix: /(basketball|track-field)/,
    specs: {
      info: {
        title: 'SVCSA API Docs',
        description: 'API specs for svcsa api for both basketball and track&field',
        version: '0.0.1'
      }
    },
    ui: swagger.swaggerUI({}),
    defaults: {
      operationGenerators: {
        create: () => false,
        patch: () => false,
        remove: () => false
      }
    }
  })
)
app.configure(services)



// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
