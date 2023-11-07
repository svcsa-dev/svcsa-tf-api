// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbMatchlog, BbMatchlogData, BbMatchlogPatch, BbMatchlogQuery } from './matchlog.schema'

export type { BbMatchlog, BbMatchlogData, BbMatchlogPatch, BbMatchlogQuery }

export interface BbMatchlogParams extends KnexAdapterParams<BbMatchlogQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbMatchlogService<ServiceParams extends Params = BbMatchlogParams> extends KnexService<
  BbMatchlog,
  BbMatchlogData,
  BbMatchlogParams,
  BbMatchlogPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_log',
    id: 'LogID'
  }
}
