// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { TfTeam, TfTeamData, TfTeamPatch, TfTeamQuery, TfTeamService } from './team.class'

export type { TfTeam, TfTeamData, TfTeamPatch, TfTeamQuery }

export type TfTeamClientService = Pick<TfTeamService<Params<TfTeamQuery>>, (typeof tfTeamMethods)[number]>

export const tfTeamPath = '/track-field/team'

export const tfTeamMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tfTeamClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tfTeamPath, connection.service(tfTeamPath), {
    methods: tfTeamMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [tfTeamPath]: TfTeamClientService
  }
}
