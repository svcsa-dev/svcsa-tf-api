// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { BbSeason, BbSeasonData, BbSeasonPatch, BbSeasonQuery, BbSeasonService } from './season.class'

export type { BbSeason, BbSeasonData, BbSeasonPatch, BbSeasonQuery }

export type BbSeasonClientService = Pick<
  BbSeasonService<Params<BbSeasonQuery>>,
  (typeof bbSeasonMethods)[number]
>

export const bbSeasonPath = 'basketball/season'

export const bbSeasonMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbSeasonClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbSeasonPath, connection.service(bbSeasonPath), {
    methods: bbSeasonMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbSeasonPath]: BbSeasonClientService
  }
}
