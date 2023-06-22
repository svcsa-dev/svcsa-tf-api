// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { TfSeason, TfSeasonData, TfSeasonPatch, TfSeasonQuery, TfSeasonService } from './season.class'

export type { TfSeason, TfSeasonData, TfSeasonPatch, TfSeasonQuery }

export type TfSeasonClientService = Pick<TfSeasonService<Params<TfSeasonQuery>>, (typeof tfSeasonMethods)[number]>

export const tfSeasonPath = '/track-field/season'

export const tfSeasonMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tfSeasonClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tfSeasonPath, connection.service(tfSeasonPath), {
    methods: tfSeasonMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [tfSeasonPath]: TfSeasonClientService
  }
}
