// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type {
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaveragePatch,
  BbPlayerseasonaverageQuery
} from './playerseasonaverage.schema'

export type {
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaveragePatch,
  BbPlayerseasonaverageQuery
}

export interface BbPlayerseasonaverageParams extends KnexAdapterParams<BbPlayerseasonaverageQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbPlayerseasonaverageService<
  ServiceParams extends Params = BbPlayerseasonaverageParams
> extends KnexService<
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaverageParams,
  BbPlayerseasonaveragePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_seasonplayerstatistics_view',
    id: 'TeamId'
  }
}
