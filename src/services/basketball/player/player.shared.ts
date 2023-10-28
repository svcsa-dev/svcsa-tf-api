// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { BbPlayer, BbPlayerData, BbPlayerPatch, BbPlayerQuery, BbPlayerService } from './player.class'

export type { BbPlayer, BbPlayerData, BbPlayerPatch, BbPlayerQuery }

export type BbPlayerClientService = Pick<
  BbPlayerService<Params<BbPlayerQuery>>,
  (typeof bbPlayerMethods)[number]
>

export const bbPlayerPath = 'basketball/player'

export const bbPlayerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbPlayerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbPlayerPath, connection.service(bbPlayerPath), {
    methods: bbPlayerMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbPlayerPath]: BbPlayerClientService
  }
}
