// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbMatchlogSchema,
  bbMatchlogDataValidator,
  bbMatchlogPatchValidator,
  bbMatchlogQueryValidator,
  bbMatchlogResolver,
  bbMatchlogExternalResolver,
  bbMatchlogDataResolver,
  bbMatchlogPatchResolver,
  bbMatchlogQueryResolver
} from './matchlog.schema'

import type { Application } from '../../../declarations'
import { BbMatchlogService, getOptions } from './matchlog.class'
import { bbMatchlogPath, bbMatchlogMethods } from './matchlog.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './matchlog.class'
export * from './matchlog.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbMatchlog = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbMatchlogPath, new BbMatchlogService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbMatchlogMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbMatchlogSchema },
      docs: {
        tag: 'Matchlog Service - Basketball',
        description: 'A service to get matchlog data'
      }
    })
  })
  // Initialize hooks
  app.service(bbMatchlogPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbMatchlogExternalResolver),
        schemaHooks.resolveResult(bbMatchlogResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbMatchlogQueryValidator),
        schemaHooks.resolveQuery(bbMatchlogQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbMatchlogDataValidator),
        schemaHooks.resolveData(bbMatchlogDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbMatchlogPatchValidator),
        schemaHooks.resolveData(bbMatchlogPatchResolver)
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
    [bbMatchlogPath]: BbMatchlogService
  }
}
