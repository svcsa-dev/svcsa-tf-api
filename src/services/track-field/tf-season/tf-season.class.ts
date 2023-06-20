import type { Application } from '../../../declarations'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Season, SeasonData, SeasonPatch, SeasonQuery } from './tf-season.schema'
export type { Season, SeasonData, SeasonPatch, SeasonQuery }

export interface SeasonParams extends KnexAdapterParams<SeasonQuery> {}
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SeasonService<ServiceParams extends Params = SeasonParams> extends KnexService<
  Season,
  SeasonData,
  SeasonParams,
  SeasonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
      paginate: app.get('paginate'),
      Model: app.get('mysqlClient'),
      name: 'ctfc_season'
    }
  }