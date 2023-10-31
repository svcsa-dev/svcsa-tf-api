// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbCompetitionDataValidator,
  bbCompetitionPatchValidator,
  bbCompetitionQueryValidator,
  bbCompetitionResolver,
  bbCompetitionExternalResolver,
  bbCompetitionDataResolver,
  bbCompetitionPatchResolver,
  bbCompetitionQueryResolver
} from './competition.schema'

import type { Application } from '../../../declarations'
import { BbCompetitionService, getOptions } from './competition.class'
import { bbCompetitionPath, bbCompetitionMethods } from './competition.shared'

export * from './competition.class'
export * from './competition.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbCompetition = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbCompetitionPath, new BbCompetitionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbCompetitionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbCompetitionPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbCompetitionExternalResolver),
        schemaHooks.resolveResult(bbCompetitionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bbCompetitionQueryValidator),
        schemaHooks.resolveQuery(bbCompetitionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbCompetitionDataValidator),
        schemaHooks.resolveData(bbCompetitionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbCompetitionPatchValidator),
        schemaHooks.resolveData(bbCompetitionPatchResolver)
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
    [bbCompetitionPath]: BbCompetitionService
  }
}
