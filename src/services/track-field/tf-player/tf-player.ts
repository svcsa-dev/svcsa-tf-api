// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  playerDataValidator,
  playerPatchValidator,
  playerQueryValidator,
  playerResolver,
  playerExternalResolver,
  playerDataResolver,
  playerPatchResolver,
  playerQueryResolver
} from './tf-player.schema'

import type { Application } from '../../../declarations'
import { PlayerService, getOptions } from './tf-player.class'
import { playerPath, playerMethods } from './tf-player.shared'

export * from './tf-player.class'
export * from './tf-player.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfPlayer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(playerPath, new PlayerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: playerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(playerPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(playerExternalResolver), schemaHooks.resolveResult(playerResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(playerQueryValidator), schemaHooks.resolveQuery(playerQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(playerDataValidator), schemaHooks.resolveData(playerDataResolver)],
      patch: [schemaHooks.validateData(playerPatchValidator), schemaHooks.resolveData(playerPatchResolver)],
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
    [playerPath]: PlayerService
  }
}
