// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbMatchlog,
  BbMatchlogData,
  BbMatchlogPatch,
  BbMatchlogQuery,
  BbMatchlogService
} from './matchlog.class'

export type { BbMatchlog, BbMatchlogData, BbMatchlogPatch, BbMatchlogQuery }

export type BbMatchlogClientService = Pick<
  BbMatchlogService<Params<BbMatchlogQuery>>,
  (typeof bbMatchlogMethods)[number]
>

export const bbMatchlogPath = 'basketball/matchlog'

export const bbMatchlogMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbMatchlogClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbMatchlogPath, connection.service(bbMatchlogPath), {
    methods: bbMatchlogMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbMatchlogPath]: BbMatchlogClientService
  }
}
