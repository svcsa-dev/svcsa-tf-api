// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tfSeasonDataValidator,
  tfSeasonPatchValidator,
  tfSeasonQueryValidator,
  tfSeasonResolver,
  tfSeasonExternalResolver,
  tfSeasonDataResolver,
  tfSeasonPatchResolver,
  tfSeasonQueryResolver
} from './season.schema'

import type { Application } from '../../../declarations'
import { TfSeasonService, getOptions } from './season.class'
import { tfSeasonPath, tfSeasonMethods } from './season.shared'

export * from './season.class'
export * from './season.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfSeason = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tfSeasonPath, new TfSeasonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tfSeasonMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tfSeasonPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tfSeasonExternalResolver), schemaHooks.resolveResult(tfSeasonResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(tfSeasonQueryValidator), schemaHooks.resolveQuery(tfSeasonQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tfSeasonDataValidator), schemaHooks.resolveData(tfSeasonDataResolver)],
      patch: [schemaHooks.validateData(tfSeasonPatchValidator), schemaHooks.resolveData(tfSeasonPatchResolver)],
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
    [tfSeasonPath]: TfSeasonService
  }
}
