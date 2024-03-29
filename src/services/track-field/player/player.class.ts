// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { TfPlayer, TfPlayerData, TfPlayerPatch, TfPlayerQuery } from './player.schema'

export type { TfPlayer, TfPlayerData, TfPlayerPatch, TfPlayerQuery }

export interface TfPlayerParams extends KnexAdapterParams<TfPlayerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TfPlayerService<ServiceParams extends Params = TfPlayerParams> extends KnexService<
  TfPlayer,
  TfPlayerData,
  TfPlayerParams,
  TfPlayerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'ctfc_player'
  }
}
