// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type { BbNews, BbNewsData, BbNewsPatch, BbNewsQuery, BbNewsService } from './news.class'

export type { BbNews, BbNewsData, BbNewsPatch, BbNewsQuery }

export type BbNewsClientService = Pick<BbNewsService<Params<BbNewsQuery>>, (typeof bbNewsMethods)[number]>

export const bbNewsPath = 'basketball/news'

export const bbNewsMethods = ['find', 'get'] as const

export const bbNewsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(bbNewsPath, connection.service(bbNewsPath), {
    methods: bbNewsMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [bbNewsPath]: BbNewsClientService
  }
}
