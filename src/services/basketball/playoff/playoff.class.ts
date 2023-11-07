// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbPlayoff, BbPlayoffData, BbPlayoffPatch, BbPlayoffQuery } from './playoff.schema'

export type { BbPlayoff, BbPlayoffData, BbPlayoffPatch, BbPlayoffQuery }

export interface BbPlayoffParams extends KnexAdapterParams<BbPlayoffQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbPlayoffService<ServiceParams extends Params = BbPlayoffParams> extends KnexService<
  BbPlayoff,
  BbPlayoffData,
  BbPlayoffParams,
  BbPlayoffPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_playoff'
  }
}
