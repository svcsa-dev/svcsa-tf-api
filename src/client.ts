// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { bbNewsClient } from './services/basketball/news/news.shared'
export type { BbNews, BbNewsData, BbNewsQuery, BbNewsPatch } from './services/basketball/news/news.shared'

import { bbTeamrankClient } from './services/basketball/teamrank/teamrank.shared'
export type {
  BbTeamrank,
  BbTeamrankData,
  BbTeamrankQuery,
  BbTeamrankPatch
} from './services/basketball/teamrank/teamrank.shared'

import { bbPlayoffClient } from './services/basketball/playoff/playoff.shared'
export type {
  BbPlayoff,
  BbPlayoffData,
  BbPlayoffQuery,
  BbPlayoffPatch
} from './services/basketball/playoff/playoff.shared'

import { bbPlayerseasonaverageClient } from './services/basketball/playerseasonaverage/playerseasonaverage.shared'
export type {
  BbPlayerseasonaverage,
  BbPlayerseasonaverageData,
  BbPlayerseasonaverageQuery,
  BbPlayerseasonaveragePatch
} from './services/basketball/playerseasonaverage/playerseasonaverage.shared'

import { bbPlayermatchstatClient } from './services/basketball/playermatchstat/playermatchstat.shared'
export type {
  BbPlayermatchstat,
  BbPlayermatchstatData,
  BbPlayermatchstatQuery,
  BbPlayermatchstatPatch
} from './services/basketball/playermatchstat/playermatchstat.shared'

import { bbMatchlogClient } from './services/basketball/matchlog/matchlog.shared'
export type {
  BbMatchlog,
  BbMatchlogData,
  BbMatchlogQuery,
  BbMatchlogPatch
} from './services/basketball/matchlog/matchlog.shared'

import { bbSeasonteamplayerClient } from './services/basketball/seasonteamplayer/seasonteamplayer.shared'
export type {
  BbSeasonteamplayer,
  BbSeasonteamplayerData,
  BbSeasonteamplayerQuery,
  BbSeasonteamplayerPatch
} from './services/basketball/seasonteamplayer/seasonteamplayer.shared'

import { bbSeasonteamClient } from './services/basketball/seasonteam/seasonteam.shared'
export type {
  BbSeasonteam,
  BbSeasonteamData,
  BbSeasonteamQuery,
  BbSeasonteamPatch
} from './services/basketball/seasonteam/seasonteam.shared'

import { bbMatchClient } from './services/basketball/match/match.shared'
export type {
  BbMatch,
  BbMatchData,
  BbMatchQuery,
  BbMatchPatch
} from './services/basketball/match/match.shared'

import { bbSeasonClient } from './services/basketball/season/season.shared'
export type {
  BbSeason,
  BbSeasonData,
  BbSeasonQuery,
  BbSeasonPatch
} from './services/basketball/season/season.shared'

import { bbCompetitionClient } from './services/basketball/competition/competition.shared'
export type {
  BbCompetition,
  BbCompetitionData,
  BbCompetitionQuery,
  BbCompetitionPatch
} from './services/basketball/competition/competition.shared'

import { bbTeamClient } from './services/basketball/team/team.shared'
export type { BbTeam, BbTeamData, BbTeamQuery, BbTeamPatch } from './services/basketball/team/team.shared'

import { bbPlayerClient } from './services/basketball/player/player.shared'
export type {
  BbPlayer,
  BbPlayerData,
  BbPlayerQuery,
  BbPlayerPatch
} from './services/basketball/player/player.shared'

import { tfItemClient } from './services/track-field/item/item.shared'
export type { TfItem, TfItemData, TfItemQuery, TfItemPatch } from './services/track-field/item/item.shared'

import { tfPlayerClient } from './services/track-field/player/player.shared'
export type {
  TfPlayer,
  TfPlayerData,
  TfPlayerQuery,
  TfPlayerPatch
} from './services/track-field/player/player.shared'

import { tfSeasonClient } from './services/track-field/season/season.shared'
export type {
  TfSeason,
  TfSeasonData,
  TfSeasonQuery,
  TfSeasonPatch
} from './services/track-field/season/season.shared'

import { tfTeamClient } from './services/track-field/team/team.shared'
export type { TfTeam, TfTeamData, TfTeamQuery, TfTeamPatch } from './services/track-field/team/team.shared'

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

  client.configure(tfPlayerClient)
  client.configure(tfSeasonClient)
  client.configure(tfTeamClient)
  client.configure(tfItemClient)
  client.configure(bbPlayerClient)
  client.configure(bbTeamClient)
  client.configure(bbCompetitionClient)
  client.configure(bbSeasonClient)
  client.configure(bbMatchClient)
  client.configure(bbSeasonteamClient)
  client.configure(bbSeasonteamplayerClient)
  client.configure(bbMatchlogClient)
  client.configure(bbPlayermatchstatClient)
  client.configure(bbPlayerseasonaverageClient)
  client.configure(bbPlayoffClient)
  client.configure(bbTeamrankClient)
  client.configure(bbNewsClient)
  return client
}
