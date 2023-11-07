// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbSeasonDataValidator,
  bbSeasonPatchValidator,
  bbSeasonQueryValidator,
  bbSeasonResolver,
  bbSeasonExternalResolver,
  bbSeasonDataResolver,
  bbSeasonPatchResolver,
  bbSeasonQueryResolver
} from './season.schema'

import type { Application } from '../../../declarations'
import { BbSeasonService, getOptions } from './season.class'
import { bbSeasonPath, bbSeasonMethods } from './season.shared'

export * from './season.class'
export * from './season.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbSeason = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbSeasonPath, new BbSeasonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbSeasonMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbSeasonPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbSeasonExternalResolver),
        schemaHooks.resolveResult(bbSeasonResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbSeasonQueryValidator),
        schemaHooks.resolveQuery(bbSeasonQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbSeasonDataValidator),
        schemaHooks.resolveData(bbSeasonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbSeasonPatchValidator),
        schemaHooks.resolveData(bbSeasonPatchResolver)
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
    [bbSeasonPath]: BbSeasonService
  }
}
