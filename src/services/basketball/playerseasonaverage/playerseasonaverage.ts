// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbPlayerseasonaverageSchema,
  bbPlayerseasonaverageDataValidator,
  bbPlayerseasonaveragePatchValidator,
  bbPlayerseasonaverageQueryValidator,
  bbPlayerseasonaverageResolver,
  bbPlayerseasonaverageExternalResolver,
  bbPlayerseasonaverageDataResolver,
  bbPlayerseasonaveragePatchResolver,
  bbPlayerseasonaverageQueryResolver
} from './playerseasonaverage.schema'

import type { Application } from '../../../declarations'
import { BbPlayerseasonaverageService, getOptions } from './playerseasonaverage.class'
import { bbPlayerseasonaveragePath, bbPlayerseasonaverageMethods } from './playerseasonaverage.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './playerseasonaverage.class'
export * from './playerseasonaverage.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbPlayerseasonaverage = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbPlayerseasonaveragePath, new BbPlayerseasonaverageService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbPlayerseasonaverageMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbPlayerseasonaverageSchema },
      docs: {
        tag: 'Player season avg Service - Basketball',
        description: 'A service to get player season avg data'
      }
    })
  })
  // Initialize hooks
  app.service(bbPlayerseasonaveragePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbPlayerseasonaverageExternalResolver),
        schemaHooks.resolveResult(bbPlayerseasonaverageResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbPlayerseasonaverageQueryValidator),
        schemaHooks.resolveQuery(bbPlayerseasonaverageQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbPlayerseasonaverageDataValidator),
        schemaHooks.resolveData(bbPlayerseasonaverageDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbPlayerseasonaveragePatchValidator),
        schemaHooks.resolveData(bbPlayerseasonaveragePatchResolver)
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
    [bbPlayerseasonaveragePath]: BbPlayerseasonaverageService
  }
}
