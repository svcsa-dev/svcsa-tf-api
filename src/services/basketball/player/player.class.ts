// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbPlayer, BbPlayerData, BbPlayerPatch, BbPlayerQuery } from './player.schema'

export type { BbPlayer, BbPlayerData, BbPlayerPatch, BbPlayerQuery }

export interface BbPlayerParams extends KnexAdapterParams<BbPlayerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbPlayerService<ServiceParams extends Params = BbPlayerParams> extends KnexService<
  BbPlayer,
  BbPlayerData,
  BbPlayerParams,
  BbPlayerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_player'
  }
}
