// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbSeasonteam,
  BbSeasonteamData,
  BbSeasonteamPatch,
  BbSeasonteamQuery,
  BbSeasonteamService
} from './seasonteam.class'

export type { BbSeasonteam, BbSeasonteamData, BbSeasonteamPatch, BbSeasonteamQuery }

export type BbSeasonteamClientService = Pick<
  BbSeasonteamService<Params<BbSeasonteamQuery>>,
  (typeof bbSeasonteamMethods)[number]
>

export const bbSeasonteamPath = 'basketball/seasonteam'

export const bbSeasonteamMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbSeasonteamClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbSeasonteamPath, connection.service(bbSeasonteamPath), {
    methods: bbSeasonteamMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbSeasonteamPath]: BbSeasonteamClientService
  }
}
