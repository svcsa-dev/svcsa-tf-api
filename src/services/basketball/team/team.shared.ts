// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { BbTeam, BbTeamData, BbTeamPatch, BbTeamQuery, BbTeamService } from './team.class'

export type { BbTeam, BbTeamData, BbTeamPatch, BbTeamQuery }

export type BbTeamClientService = Pick<BbTeamService<Params<BbTeamQuery>>, (typeof bbTeamMethods)[number]>

export const bbTeamPath = 'basketball/team'

export const bbTeamMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbTeamClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbTeamPath, connection.service(bbTeamPath), {
    methods: bbTeamMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbTeamPath]: BbTeamClientService
  }
}
