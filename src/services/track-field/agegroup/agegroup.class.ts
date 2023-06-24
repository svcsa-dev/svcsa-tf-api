// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../../declarations'
import type { TfAgegroup, TfAgegroupData, TfAgegroupPatch, TfAgegroupQuery } from './agegroup.schema'

export type { TfAgegroup, TfAgegroupData, TfAgegroupPatch, TfAgegroupQuery }

export interface TfAgegroupParams extends KnexAdapterParams<TfAgegroupQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TfAgegroupService<ServiceParams extends Params = TfAgegroupParams> extends KnexService<
  TfAgegroup,
  TfAgegroupData,
  TfAgegroupParams,
  TfAgegroupPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'ctfc_agegroup'
  }
}
