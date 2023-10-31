// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbCompetition,
  BbCompetitionData,
  BbCompetitionPatch,
  BbCompetitionQuery,
  BbCompetitionService
} from './competition.class'

export type { BbCompetition, BbCompetitionData, BbCompetitionPatch, BbCompetitionQuery }

export type BbCompetitionClientService = Pick<
  BbCompetitionService<Params<BbCompetitionQuery>>,
  (typeof bbCompetitionMethods)[number]
>

export const bbCompetitionPath = 'basketball/competition'

export const bbCompetitionMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbCompetitionClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbCompetitionPath, connection.service(bbCompetitionPath), {
    methods: bbCompetitionMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbCompetitionPath]: BbCompetitionClientService
  }
}
