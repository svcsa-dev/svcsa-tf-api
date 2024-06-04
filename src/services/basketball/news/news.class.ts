// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { BbNews, BbNewsData, BbNewsPatch, BbNewsQuery } from './news.schema'

export type { BbNews, BbNewsData, BbNewsPatch, BbNewsQuery }

export interface BbNewsParams extends KnexAdapterParams<BbNewsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BbNewsService<ServiceParams extends Params = BbNewsParams> extends KnexService<
  BbNews,
  BbNewsData,
  BbNewsParams,
  BbNewsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'news'
  }
}
