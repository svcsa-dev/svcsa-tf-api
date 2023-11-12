// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbPlayerDataValidator,
  bbPlayerPatchValidator,
  bbPlayerQueryValidator,
  bbPlayerResolver,
  bbPlayerExternalResolver,
  bbPlayerDataResolver,
  bbPlayerPatchResolver,
  bbPlayerQueryResolver,
  bbPlayerSchema,
} from './player.schema'

import type { Application } from '../../../declarations'
import { BbPlayerService, getOptions } from './player.class'
import { bbPlayerPath, bbPlayerMethods } from './player.shared'

import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './player.class'
export * from './player.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbPlayer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbPlayerPath, new BbPlayerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbPlayerMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbPlayerSchema },
      docs: {
        tag: 'Player Service - Basketball',
        description: 'A service to get player data'
      }
    })
  })
  // Initialize hooks
  app.service(bbPlayerPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbPlayerExternalResolver),
        schemaHooks.resolveResult(bbPlayerResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbPlayerQueryValidator),
        schemaHooks.resolveQuery(bbPlayerQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbPlayerDataValidator),
        schemaHooks.resolveData(bbPlayerDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbPlayerPatchValidator),
        schemaHooks.resolveData(bbPlayerPatchResolver)
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
    [bbPlayerPath]: BbPlayerService
  }
}
