// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { Team, TeamData, TeamPatch, TeamQuery, TeamService } from './tf-team.class'

export type { Team, TeamData, TeamPatch, TeamQuery }

export type TeamClientService = Pick<TeamService<Params<TeamQuery>>, (typeof teamMethods)[number]>

export const teamPath = '/track-field/team'

export const teamMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const teamClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(teamPath, connection.service(teamPath), {
    methods: teamMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [teamPath]: TeamClientService
  }
}
