// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { tfItemClient } from './services/track-field/item/item.shared'
export type { TfItem, TfItemData, TfItemQuery, TfItemPatch } from './services/track-field/item/item.shared'

import { playerClient } from './services/track-field/player/player.shared'
export type {
  Player,
  PlayerData,
  PlayerQuery,
  PlayerPatch
} from './services/track-field/player/player.shared'

import { seasonClient } from './services/track-field/season/season.shared'
export type {
  Season,
  SeasonData,
  SeasonQuery,
  SeasonPatch
} from './services/track-field/season/season.shared'

import { teamClient } from './services/track-field/team/team.shared'
export type { Team, TeamData, TeamQuery, TeamPatch } from './services/track-field/team/team.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the svcsa-tf-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(playerClient)
  client.configure(seasonClient)
  client.configure(teamClient)
  client.configure(tfItemClient)
  return client
}
