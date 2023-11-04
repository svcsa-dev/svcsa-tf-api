// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbSeasonteamDataValidator,
  bbSeasonteamPatchValidator,
  bbSeasonteamQueryValidator,
  bbSeasonteamResolver,
  bbSeasonteamExternalResolver,
  bbSeasonteamDataResolver,
  bbSeasonteamPatchResolver,
  bbSeasonteamQueryResolver
} from './seasonteam.schema'

import type { Application } from '../../../declarations'
import { BbSeasonteamService, getOptions } from './seasonteam.class'
import { bbSeasonteamPath, bbSeasonteamMethods } from './seasonteam.shared'

export * from './seasonteam.class'
export * from './seasonteam.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbSeasonteam = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbSeasonteamPath, new BbSeasonteamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbSeasonteamMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbSeasonteamPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbSeasonteamExternalResolver),
        schemaHooks.resolveResult(bbSeasonteamResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbSeasonteamQueryValidator),
        schemaHooks.resolveQuery(bbSeasonteamQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbSeasonteamDataValidator),
        schemaHooks.resolveData(bbSeasonteamDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbSeasonteamPatchValidator),
        schemaHooks.resolveData(bbSeasonteamPatchResolver)
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
    [bbSeasonteamPath]: BbSeasonteamService
  }
}
