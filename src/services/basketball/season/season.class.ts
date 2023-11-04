// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbSeason, BbSeasonData, BbSeasonPatch, BbSeasonQuery } from './season.schema'

export type { BbSeason, BbSeasonData, BbSeasonPatch, BbSeasonQuery }

export interface BbSeasonParams extends KnexAdapterParams<BbSeasonQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbSeasonService<ServiceParams extends Params = BbSeasonParams> extends KnexService<
  BbSeason,
  BbSeasonData,
  BbSeasonParams,
  BbSeasonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_season'
  }
}
