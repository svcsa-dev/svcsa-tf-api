import type { Application } from '../../../declarations'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { TfSeason, TfSeasonData, TfSeasonPatch, TfSeasonQuery } from './season.schema'
export type { TfSeason, TfSeasonData, TfSeasonPatch, TfSeasonQuery }

export interface TfSeasonParams extends KnexAdapterParams<TfSeasonQuery> {}
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TfSeasonService<ServiceParams extends Params = TfSeasonParams> extends KnexService<
  TfSeason,
  TfSeasonData,
  TfSeasonParams,
  TfSeasonPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
      paginate: app.get('paginate'),
      Model: app.get('mysqlClient'),
      name: 'ctfc_season'
    }
  }