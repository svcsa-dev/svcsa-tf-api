// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { TfPlayer, TfPlayerData, TfPlayerPatch, TfPlayerQuery, TfPlayerService } from './player.class'

export type { TfPlayer, TfPlayerData, TfPlayerPatch, TfPlayerQuery }

export type TfPlayerClientService = Pick<TfPlayerService<Params<TfPlayerQuery>>, (typeof tfPlayerMethods)[number]>

export const tfPlayerPath = '/track-field/player'

export const tfPlayerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tfPlayerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tfPlayerPath, connection.service(tfPlayerPath), {
    methods: tfPlayerMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [tfPlayerPath]: TfPlayerClientService
  }
}
