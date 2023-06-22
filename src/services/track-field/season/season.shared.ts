// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { Season, SeasonData, SeasonPatch, SeasonQuery, SeasonService } from './season.class'

export type { Season, SeasonData, SeasonPatch, SeasonQuery }

export type SeasonClientService = Pick<SeasonService<Params<SeasonQuery>>, (typeof seasonMethods)[number]>

export const seasonPath = '/track-field/season'

export const seasonMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const seasonClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(seasonPath, connection.service(seasonPath), {
    methods: seasonMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [seasonPath]: SeasonClientService
  }
}
