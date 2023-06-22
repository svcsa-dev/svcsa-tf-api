// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { TfItem, TfItemData, TfItemPatch, TfItemQuery, TfItemService } from './item.class'

export type { TfItem, TfItemData, TfItemPatch, TfItemQuery }

export type TfItemClientService = Pick<TfItemService<Params<TfItemQuery>>, (typeof tfItemMethods)[number]>

export const tfItemPath = 'track-field/item'

export const tfItemMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tfItemClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tfItemPath, connection.service(tfItemPath), {
    methods: tfItemMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [tfItemPath]: TfItemClientService
  }
}
