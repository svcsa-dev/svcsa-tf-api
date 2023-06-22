// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tfItemDataValidator,
  tfItemPatchValidator,
  tfItemQueryValidator,
  tfItemResolver,
  tfItemExternalResolver,
  tfItemDataResolver,
  tfItemPatchResolver,
  tfItemQueryResolver
} from './item.schema'

import type { Application } from '../../../declarations'
import { TfItemService, getOptions } from './item.class'
import { tfItemPath, tfItemMethods } from './item.shared'

export * from './item.class'
export * from './item.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfItem = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tfItemPath, new TfItemService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tfItemMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tfItemPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tfItemExternalResolver), schemaHooks.resolveResult(tfItemResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(tfItemQueryValidator), schemaHooks.resolveQuery(tfItemQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tfItemDataValidator), schemaHooks.resolveData(tfItemDataResolver)],
      patch: [schemaHooks.validateData(tfItemPatchValidator), schemaHooks.resolveData(tfItemPatchResolver)],
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
    [tfItemPath]: TfItemService
  }
}
