// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbNewsDataValidator,
  bbNewsPatchValidator,
  bbNewsQueryValidator,
  bbNewsResolver,
  bbNewsExternalResolver,
  bbNewsDataResolver,
  bbNewsPatchResolver,
  bbNewsQueryResolver
} from './news.schema'

import type { Application } from '../../../declarations'
import { BbNewsService, getOptions } from './news.class'
import { bbNewsPath, bbNewsMethods } from './news.shared'

export * from './news.class'
export * from './news.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbNews = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbNewsPath, new BbNewsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbNewsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbNewsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(bbNewsExternalResolver), schemaHooks.resolveResult(bbNewsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(bbNewsQueryValidator), schemaHooks.resolveQuery(bbNewsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(bbNewsDataValidator), schemaHooks.resolveData(bbNewsDataResolver)],
      patch: [schemaHooks.validateData(bbNewsPatchValidator), schemaHooks.resolveData(bbNewsPatchResolver)],
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
    [bbNewsPath]: BbNewsService
  }
}
