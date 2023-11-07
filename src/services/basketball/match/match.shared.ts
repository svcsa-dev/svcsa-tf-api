// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { BbMatch, BbMatchData, BbMatchPatch, BbMatchQuery, BbMatchService } from './match.class'

export type { BbMatch, BbMatchData, BbMatchPatch, BbMatchQuery }

export type BbMatchClientService = Pick<BbMatchService<Params<BbMatchQuery>>, (typeof bbMatchMethods)[number]>

export const bbMatchPath = 'basketball/match'

export const bbMatchMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbMatchClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbMatchPath, connection.service(bbMatchPath), {
    methods: bbMatchMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbMatchPath]: BbMatchClientService
  }
}
