// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbMatchDataValidator,
  bbMatchPatchValidator,
  bbMatchQueryValidator,
  bbMatchResolver,
  bbMatchExternalResolver,
  bbMatchDataResolver,
  bbMatchPatchResolver,
  bbMatchQueryResolver
} from './match.schema'

import type { Application } from '../../../declarations'
import { BbMatchService, getOptions } from './match.class'
import { bbMatchPath, bbMatchMethods } from './match.shared'

export * from './match.class'
export * from './match.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbMatch = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbMatchPath, new BbMatchService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbMatchMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbMatchPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(bbMatchExternalResolver), schemaHooks.resolveResult(bbMatchResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(bbMatchQueryValidator), schemaHooks.resolveQuery(bbMatchQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(bbMatchDataValidator), schemaHooks.resolveData(bbMatchDataResolver)],
      patch: [schemaHooks.validateData(bbMatchPatchValidator), schemaHooks.resolveData(bbMatchPatchResolver)],
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
    [bbMatchPath]: BbMatchService
  }
}
