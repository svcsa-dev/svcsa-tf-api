/* eslint-disable no-prototype-builtins */
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  bbSeasonSchema,
  bbSeasonDataValidator,
  bbSeasonPatchValidator,
  bbSeasonQueryValidator,
  bbSeasonResolver,
  bbSeasonExternalResolver,
  bbSeasonDataResolver,
  bbSeasonPatchResolver,
  bbSeasonQueryResolver
} from './season.schema'

import type { Application, HookContext } from '../../../declarations'
import { BbSeasonService, getOptions } from './season.class'
import { bbSeasonPath, bbSeasonMethods } from './season.shared'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export * from './season.class'
export * from './season.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bbSeason = (app: Application) => {
  // Register our service on the Feathers application
  app.use(bbSeasonPath, new BbSeasonService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bbSeasonMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: { bbSeasonSchema },
      docs: {
        tag: 'Season Service - Basketball',
        description: 'A service to get season data'
      }
    })
  })
  // Initialize hooks
  app.service(bbSeasonPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(bbSeasonExternalResolver),
        schemaHooks.resolveResult(bbSeasonResolver)
      ]
    },
    before: {
      all: [
        async (context: HookContext) => {
          console.log(context.params)
          const { recentSeason, ...rest } = context.params.query

          if (recentSeason) {
            console.log('!!!!!!')
            context.params.query = { ...rest }
            context.params.query['$limit'] = 100;
            context.params.recentSeason = true;
          }

          console.log('_____', context.params)
        },
        schemaHooks.validateQuery(bbSeasonQueryValidator),
        schemaHooks.resolveQuery(bbSeasonQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bbSeasonDataValidator),
        schemaHooks.resolveData(bbSeasonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bbSeasonPatchValidator),
        schemaHooks.resolveData(bbSeasonPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      find: [
        async (context: HookContext) => {
          if (context.params.recentSeason) {
            const { data } = context.result

            const recentSeasonsByCompetition: Record<number, any> = {}

            data.forEach((rawSeason: { CompetitionID: number; StartTime: string }) => {
              const { CompetitionID, StartTime }= rawSeason;
              if(recentSeasonsByCompetition.hasOwnProperty(CompetitionID)) {
                const startTime = new Date(StartTime);
                const recordedStartTime = new Date(recentSeasonsByCompetition[CompetitionID].StartTime)
                if(startTime < recordedStartTime) {
                  return;
                }
              }

              recentSeasonsByCompetition[CompetitionID] = rawSeason;
              
            });
            context.result = {
              total: Object.keys(recentSeasonsByCompetition).length,
              data: Object.values(recentSeasonsByCompetition)
            }
          }
        }
      ]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    [bbSeasonPath]: BbSeasonService
  }
}
