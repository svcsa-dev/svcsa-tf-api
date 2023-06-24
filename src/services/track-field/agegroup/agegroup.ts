// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tfAgegroupDataValidator,
  tfAgegroupPatchValidator,
  tfAgegroupQueryValidator,
  tfAgegroupResolver,
  tfAgegroupExternalResolver,
  tfAgegroupDataResolver,
  tfAgegroupPatchResolver,
  tfAgegroupQueryResolver
} from './agegroup.schema'

import type { Application } from '../../../declarations'
import { TfAgegroupService, getOptions } from './agegroup.class'
import { tfAgegroupPath, tfAgegroupMethods } from './agegroup.shared'

export * from './agegroup.class'
export * from './agegroup.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfAgegroup = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tfAgegroupPath, new TfAgegroupService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tfAgegroupMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tfAgegroupPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(tfAgegroupExternalResolver),
        schemaHooks.resolveResult(tfAgegroupResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(tfAgegroupQueryValidator),
        schemaHooks.resolveQuery(tfAgegroupQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tfAgegroupDataValidator),
        schemaHooks.resolveData(tfAgegroupDataResolver)
      ],
      patch: [
        schemaHooks.validateData(tfAgegroupPatchValidator),
        schemaHooks.resolveData(tfAgegroupPatchResolver)
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
    [tfAgegroupPath]: TfAgegroupService
  }
}
