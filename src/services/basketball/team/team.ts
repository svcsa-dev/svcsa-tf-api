// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbTeamSchema,
  bbTeamDataValidator,
  bbTeamPatchValidator,
  bbTeamQueryValidator,
  bbTeamResolver,
  bbTeamExternalResolver,
  bbTeamDataResolver,
  bbTeamPatchResolver,
  bbTeamQueryResolver
} from './team.schema'

import type { Application } from '../../../declarations'
import { BbTeamService, getOptions } from './team.class'
import { bbTeamPath, bbTeamMethods } from './team.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './team.class'
export * from './team.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbTeam = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbTeamPath, new BbTeamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbTeamMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbTeamSchema },
      docs: {
        tag: 'Team Service - Basketball',
        description: 'A service to get team data'
      }
    })
  })
  // Initialize hooks
  app.service(bbTeamPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(bbTeamExternalResolver), schemaHooks.resolveResult(bbTeamResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(bbTeamQueryValidator), schemaHooks.resolveQuery(bbTeamQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(bbTeamDataValidator), schemaHooks.resolveData(bbTeamDataResolver)],
      patch: [schemaHooks.validateData(bbTeamPatchValidator), schemaHooks.resolveData(bbTeamPatchResolver)],
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
    [bbTeamPath]: BbTeamService
  }
}
