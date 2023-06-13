import type { Application } from '../../declarations'
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'
import type { Team, TeamData, TeamPatch, TeamQuery } from './tf-team.schema'
export type { Team, TeamData, TeamPatch, TeamQuery }

export interface TeamParams extends KnexAdapterParams<TeamQuery> {}
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TeamService<ServiceParams extends Params = TeamParams> extends KnexService<
  Team,
  TeamData,
  TeamParams,
  TeamPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
      paginate: app.get('paginate'),
      Model: app.get('mysqlClient'),
      name: 'ctfc_team'
    }
  }