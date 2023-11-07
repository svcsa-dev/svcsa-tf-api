// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type {
  BbCompetition,
  BbCompetitionData,
  BbCompetitionPatch,
  BbCompetitionQuery
} from './competition.schema'

export type { BbCompetition, BbCompetitionData, BbCompetitionPatch, BbCompetitionQuery }

export interface BbCompetitionParams extends KnexAdapterParams<BbCompetitionQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbCompetitionService<ServiceParams extends Params = BbCompetitionParams> extends KnexService<
  BbCompetition,
  BbCompetitionData,
  BbCompetitionParams,
  BbCompetitionPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_competition'
  }
}
