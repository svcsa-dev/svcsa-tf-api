// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbPlayermatchstat,
  BbPlayermatchstatData,
  BbPlayermatchstatPatch,
  BbPlayermatchstatQuery,
  BbPlayermatchstatService
} from './playermatchstat.class'

export type { BbPlayermatchstat, BbPlayermatchstatData, BbPlayermatchstatPatch, BbPlayermatchstatQuery }

export type BbPlayermatchstatClientService = Pick<
  BbPlayermatchstatService<Params<BbPlayermatchstatQuery>>,
  (typeof bbPlayermatchstatMethods)[number]
>

export const bbPlayermatchstatPath = 'basketball/playermatchstat'

export const bbPlayermatchstatMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbPlayermatchstatClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbPlayermatchstatPath, connection.service(bbPlayermatchstatPath), {
    methods: bbPlayermatchstatMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbPlayermatchstatPath]: BbPlayermatchstatClientService
  }
}
