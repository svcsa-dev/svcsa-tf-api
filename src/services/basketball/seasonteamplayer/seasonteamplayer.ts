// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbSeasonteamplayerSchema,
  bbSeasonteamplayerDataValidator,
  bbSeasonteamplayerPatchValidator,
  bbSeasonteamplayerQueryValidator,
  bbSeasonteamplayerResolver,
  bbSeasonteamplayerExternalResolver,
  bbSeasonteamplayerDataResolver,
  bbSeasonteamplayerPatchResolver,
  bbSeasonteamplayerQueryResolver
} from './seasonteamplayer.schema'

import type { Application } from '../../../declarations'
import { BbSeasonteamplayerService, getOptions } from './seasonteamplayer.class'
import { bbSeasonteamplayerPath, bbSeasonteamplayerMethods } from './seasonteamplayer.shared'

import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './seasonteamplayer.class'
export * from './seasonteamplayer.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbSeasonteamplayer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbSeasonteamplayerPath, new BbSeasonteamplayerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbSeasonteamplayerMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbSeasonteamplayerSchema },
      docs: {
        tag: 'Season Team Player Service - Basketball',
        description: 'A service to get Season Team player data'
      }
    })
  })
  // Initialize hooks
  app.service(bbSeasonteamplayerPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbSeasonteamplayerExternalResolver),
        schemaHooks.resolveResult(bbSeasonteamplayerResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbSeasonteamplayerQueryValidator),
        schemaHooks.resolveQuery(bbSeasonteamplayerQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbSeasonteamplayerDataValidator),
        schemaHooks.resolveData(bbSeasonteamplayerDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbSeasonteamplayerPatchValidator),
        schemaHooks.resolveData(bbSeasonteamplayerPatchResolver)
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
    [bbSeasonteamplayerPath]: BbSeasonteamplayerService
  }
}
