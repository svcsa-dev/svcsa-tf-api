// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application, HookContext } from '../../../declarations'
import { BbTeamrankService, getOptions } from './teamrank.class'
import { bbTeamrankPath, bbTeamrankMethods } from './teamrank.shared'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { resolve, virtual } from '@feathersjs/schema'

export * from './teamrank.class'
import type { BbTeamrank } from './teamrank.class'

// A configure function that registers the service and its hooks via `app.configure`
export const bbTeamrank = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbTeamrankPath, new BbTeamrankService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbTeamrankMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bbTeamrankPath).hooks({
    around: {
      all: [schemaHooks.resolveResult(teamResolver)]
    },
    before: {
      find: [],
      all: []
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
    [bbTeamrankPath]: BbTeamrankService
  }
}


const teamResolver = resolve<BbTeamrank, HookContext>({
  team: virtual(async (teamrank, context) => {
    return await context.app.service('basketball/team').get(teamrank.teamid)
    
  })
})