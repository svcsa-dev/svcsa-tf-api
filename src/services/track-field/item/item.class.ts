// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { TfItem, TfItemData, TfItemPatch, TfItemQuery } from './item.schema'

export type { TfItem, TfItemData, TfItemPatch, TfItemQuery }

export interface TfItemParams extends KnexAdapterParams<TfItemQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TfItemService<ServiceParams extends Params = TfItemParams> extends KnexService<
  TfItem,
  TfItemData,
  TfItemParams,
  TfItemPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'ctfc_item'
  }
}
