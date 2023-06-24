// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  TfAgegroup,
  TfAgegroupData,
  TfAgegroupPatch,
  TfAgegroupQuery,
  TfAgegroupService
} from './agegroup.class'

export type { TfAgegroup, TfAgegroupData, TfAgegroupPatch, TfAgegroupQuery }

export type TfAgegroupClientService = Pick<
  TfAgegroupService<Params<TfAgegroupQuery>>,
  (typeof tfAgegroupMethods)[number]
>

export const tfAgegroupPath = 'track-field/agegroup'

export const tfAgegroupMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tfAgegroupClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tfAgegroupPath, connection.service(tfAgegroupPath), {
    methods: tfAgegroupMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [tfAgegroupPath]: TfAgegroupClientService
  }
}
