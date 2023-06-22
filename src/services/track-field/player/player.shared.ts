// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { Player, PlayerData, PlayerPatch, PlayerQuery, PlayerService } from './player.class'

export type { Player, PlayerData, PlayerPatch, PlayerQuery }

export type PlayerClientService = Pick<PlayerService<Params<PlayerQuery>>, (typeof playerMethods)[number]>

export const playerPath = '/track-field/player'

export const playerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const playerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(playerPath, connection.service(playerPath), {
    methods: playerMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [playerPath]: PlayerClientService
  }
}
