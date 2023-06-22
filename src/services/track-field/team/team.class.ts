import type { Application } from '../../../declarations'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { TfTeam, TfTeamData, TfTeamPatch, TfTeamQuery } from './team.schema'
export type { TfTeam, TfTeamData, TfTeamPatch, TfTeamQuery }

export interface TfTeamParams extends KnexAdapterParams<TfTeamQuery> {}
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TfTeamService<ServiceParams extends Params = TfTeamParams> extends KnexService<
  TfTeam,
  TfTeamData,
  TfTeamParams,
  TfTeamPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
      paginate: app.get('paginate'),
      Model: app.get('mysqlClient'),
      name: 'ctfc_team'
    }
  }