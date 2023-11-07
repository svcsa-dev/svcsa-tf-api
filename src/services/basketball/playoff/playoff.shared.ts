// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbPlayoff,
  BbPlayoffData,
  BbPlayoffPatch,
  BbPlayoffQuery,
  BbPlayoffService
} from './playoff.class'

export type { BbPlayoff, BbPlayoffData, BbPlayoffPatch, BbPlayoffQuery }

export type BbPlayoffClientService = Pick<
  BbPlayoffService<Params<BbPlayoffQuery>>,
  (typeof bbPlayoffMethods)[number]
>

export const bbPlayoffPath = 'basketball/playoff'

export const bbPlayoffMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbPlayoffClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbPlayoffPath, connection.service(bbPlayoffPath), {
    methods: bbPlayoffMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbPlayoffPath]: BbPlayoffClientService
  }
}
