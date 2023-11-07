// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbTeam, BbTeamData, BbTeamPatch, BbTeamQuery } from './team.schema'

export type { BbTeam, BbTeamData, BbTeamPatch, BbTeamQuery }

export interface BbTeamParams extends KnexAdapterParams<BbTeamQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbTeamService<ServiceParams extends Params = BbTeamParams> extends KnexService<
  BbTeam,
  BbTeamData,
  BbTeamParams,
  BbTeamPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'bb_team'
  }
}
