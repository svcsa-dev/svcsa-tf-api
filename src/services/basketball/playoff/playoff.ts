// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbPlayoffSchema,
  bbPlayoffDataValidator,
  bbPlayoffPatchValidator,
  bbPlayoffQueryValidator,
  bbPlayoffResolver,
  bbPlayoffExternalResolver,
  bbPlayoffDataResolver,
  bbPlayoffPatchResolver,
  bbPlayoffQueryResolver
} from './playoff.schema'

import type { Application } from '../../../declarations'
import { BbPlayoffService, getOptions } from './playoff.class'
import { bbPlayoffPath, bbPlayoffMethods } from './playoff.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './playoff.class'
export * from './playoff.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbPlayoff = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbPlayoffPath, new BbPlayoffService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbPlayoffMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbPlayoffSchema },
      docs: {
        tag: 'Playoff Service - Basketball',
        description: 'A service to get Playoff data'
      }
    })
  })
  // Initialize hooks
  app.service(bbPlayoffPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbPlayoffExternalResolver),
        schemaHooks.resolveResult(bbPlayoffResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbPlayoffQueryValidator),
        schemaHooks.resolveQuery(bbPlayoffQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbPlayoffDataValidator),
        schemaHooks.resolveData(bbPlayoffDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbPlayoffPatchValidator),
        schemaHooks.resolveData(bbPlayoffPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    [bbPlayoffPath]: BbPlayoffService
  }
}
