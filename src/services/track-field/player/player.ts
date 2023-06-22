// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tfPlayerDataValidator,
  tfPlayerPatchValidator,
  tfPlayerQueryValidator,
  tfPlayerResolver,
  tfPlayerExternalResolver,
  tfPlayerDataResolver,
  tfPlayerPatchResolver,
  tfPlayerQueryResolver
} from './player.schema'

import type { Application } from '../../../declarations'
import { TfPlayerService, getOptions } from './player.class'
import { tfPlayerPath, tfPlayerMethods } from './player.shared'

export * from './player.class'
export * from './player.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfPlayer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tfPlayerPath, new TfPlayerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tfPlayerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tfPlayerPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tfPlayerExternalResolver), schemaHooks.resolveResult(tfPlayerResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(tfPlayerQueryValidator), schemaHooks.resolveQuery(tfPlayerQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tfPlayerDataValidator), schemaHooks.resolveData(tfPlayerDataResolver)],
      patch: [schemaHooks.validateData(tfPlayerPatchValidator), schemaHooks.resolveData(tfPlayerPatchResolver)],
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
    [tfPlayerPath]: TfPlayerService
  }
}
