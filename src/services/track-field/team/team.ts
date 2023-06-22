// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tfTeamDataValidator,
  tfTeamPatchValidator,
  tfTeamQueryValidator,
  tfTeamResolver,
  tfTeamExternalResolver,
  tfTeamDataResolver,
  tfTeamPatchResolver,
  tfTeamQueryResolver
} from './team.schema'

import type { Application } from '../../../declarations'
import { TfTeamService, getOptions } from './team.class'
import { tfTeamPath, tfTeamMethods } from './team.shared'

export * from './team.class'
export * from './team.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tfTeam = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tfTeamPath, new TfTeamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tfTeamMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tfTeamPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(tfTeamExternalResolver), schemaHooks.resolveResult(tfTeamResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(tfTeamQueryValidator), schemaHooks.resolveQuery(tfTeamQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tfTeamDataValidator), schemaHooks.resolveData(tfTeamDataResolver)],
      patch: [schemaHooks.validateData(tfTeamPatchValidator), schemaHooks.resolveData(tfTeamPatchResolver)],
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
    [tfTeamPath]: TfTeamService
  }
}
