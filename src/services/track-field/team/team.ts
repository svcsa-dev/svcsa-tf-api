// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  teamDataValidator,
  teamPatchValidator,
  teamQueryValidator,
  teamResolver,
  teamExternalResolver,
  teamDataResolver,
  teamPatchResolver,
  teamQueryResolver
} from './team.schema'

import type { Application } from '../../../declarations'
import { TeamService, getOptions } from './team.class'
import { teamPath, teamMethods } from './team.shared'

export * from './team.class'
export * from './team.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfTeam = (app: Application) => {
  // Register our service on the Feathers application
  app.use(teamPath, new TeamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: teamMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(teamPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(teamExternalResolver), schemaHooks.resolveResult(teamResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(teamQueryValidator), schemaHooks.resolveQuery(teamQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(teamDataValidator), schemaHooks.resolveData(teamDataResolver)],
      patch: [schemaHooks.validateData(teamPatchValidator), schemaHooks.resolveData(teamPatchResolver)],
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
    [teamPath]: TeamService
  }
}
