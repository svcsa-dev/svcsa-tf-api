// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type {
  BbSeasonteamplayer,
  BbSeasonteamplayerData,
  BbSeasonteamplayerPatch,
  BbSeasonteamplayerQuery
} from './seasonteamplayer.schema'

export type { BbSeasonteamplayer, BbSeasonteamplayerData, BbSeasonteamplayerPatch, BbSeasonteamplayerQuery }

export interface BbSeasonteamplayerParams extends KnexAdapterParams<BbSeasonteamplayerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbSeasonteamplayerService<
  ServiceParams extends Params = BbSeasonteamplayerParams
> extends KnexService<
  BbSeasonteamplayer,
  BbSeasonteamplayerData,
  BbSeasonteamplayerParams,
  BbSeasonteamplayerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_seasonteamplayer',
    id: 'PlayerID'
  }
}
