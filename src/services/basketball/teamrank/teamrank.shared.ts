// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbTeamrank,
  BbTeamrankData,
  BbTeamrankPatch,
  BbTeamrankQuery,
  BbTeamrankService
} from './teamrank.class'

export type { BbTeamrank, BbTeamrankData, BbTeamrankPatch, BbTeamrankQuery }

export type BbTeamrankClientService = Pick<
  BbTeamrankService,
  (typeof bbTeamrankMethods)[number]
>

export const bbTeamrankPath = 'basketball/teamrank'

export const bbTeamrankMethods = ['find'] as const

export const bbTeamrankClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbTeamrankPath, connection.service(bbTeamrankPath), {
    methods: bbTeamrankMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbTeamrankPath]: BbTeamrankClientService
  }
}
