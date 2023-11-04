// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbSeasonteamplayer,
  BbSeasonteamplayerData,
  BbSeasonteamplayerPatch,
  BbSeasonteamplayerQuery,
  BbSeasonteamplayerService
} from './seasonteamplayer.class'

export type { BbSeasonteamplayer, BbSeasonteamplayerData, BbSeasonteamplayerPatch, BbSeasonteamplayerQuery }

export type BbSeasonteamplayerClientService = Pick<
  BbSeasonteamplayerService<Params<BbSeasonteamplayerQuery>>,
  (typeof bbSeasonteamplayerMethods)[number]
>

export const bbSeasonteamplayerPath = 'basketball/seasonteamplayer'

export const bbSeasonteamplayerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbSeasonteamplayerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbSeasonteamplayerPath, connection.service(bbSeasonteamplayerPath), {
    methods: bbSeasonteamplayerMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbSeasonteamplayerPath]: BbSeasonteamplayerClientService
  }
}
