// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbPlayermatchstatDataValidator,
  bbPlayermatchstatPatchValidator,
  bbPlayermatchstatQueryValidator,
  bbPlayermatchstatResolver,
  bbPlayermatchstatExternalResolver,
  bbPlayermatchstatDataResolver,
  bbPlayermatchstatPatchResolver,
  bbPlayermatchstatQueryResolver
} from './playermatchstat.schema'

import type { Application } from '../../../declarations'
import { BbPlayermatchstatService, getOptions } from './playermatchstat.class'
import { bbPlayermatchstatPath, bbPlayermatchstatMethods } from './playermatchstat.shared'

export * from './playermatchstat.class'
export * from './playermatchstat.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbPlayermatchstat = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbPlayermatchstatPath, new BbPlayermatchstatService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbPlayermatchstatMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbPlayermatchstatPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbPlayermatchstatExternalResolver),
        schemaHooks.resolveResult(bbPlayermatchstatResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbPlayermatchstatQueryValidator),
        schemaHooks.resolveQuery(bbPlayermatchstatQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbPlayermatchstatDataValidator),
        schemaHooks.resolveData(bbPlayermatchstatDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbPlayermatchstatPatchValidator),
        schemaHooks.resolveData(bbPlayermatchstatPatchResolver)
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
    [bbPlayermatchstatPath]: BbPlayermatchstatService
  }
}
