// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbMatch, BbMatchData, BbMatchPatch, BbMatchQuery } from './match.schema'

export type { BbMatch, BbMatchData, BbMatchPatch, BbMatchQuery }

export interface BbMatchParams extends KnexAdapterParams<BbMatchQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbMatchService<ServiceParams extends Params = BbMatchParams> extends KnexService<
  BbMatch,
  BbMatchData,
  BbMatchParams,
  BbMatchPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_match'
  }
}
