// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type {
  BbPlayermatchstat,
  BbPlayermatchstatData,
  BbPlayermatchstatPatch,
  BbPlayermatchstatQuery
} from './playermatchstat.schema'

export type { BbPlayermatchstat, BbPlayermatchstatData, BbPlayermatchstatPatch, BbPlayermatchstatQuery }

export interface BbPlayermatchstatParams extends KnexAdapterParams<BbPlayermatchstatQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbPlayermatchstatService<
  ServiceParams extends Params = BbPlayermatchstatParams
> extends KnexService<
  BbPlayermatchstat,
  BbPlayermatchstatData,
  BbPlayermatchstatParams,
  BbPlayermatchstatPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_statistics'
  }
}
