// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaveragePatch,
  BbPlayerseasonaverageQuery,
  BbPlayerseasonaverageService
} from './playerseasonaverage.class'

export type {
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaveragePatch,
  BbPlayerseasonaverageQuery
}

export type BbPlayerseasonaverageClientService = Pick<
  BbPlayerseasonaverageService<Params<BbPlayerseasonaverageQuery>>,
  (typeof bbPlayerseasonaverageMethods)[number]
>

export const bbPlayerseasonaveragePath = 'basketball/playerseasonaverage'

export const bbPlayerseasonaverageMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const bbPlayerseasonaverageClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbPlayerseasonaveragePath, connection.service(bbPlayerseasonaveragePath), {
    methods: bbPlayerseasonaverageMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbPlayerseasonaveragePath]: BbPlayerseasonaverageClientService
  }
}
