import { bbNews } from './basketball/news/news'
import { bbTeamrank } from './basketball/teamrank/teamrank'
import { bbPlayoff } from './basketball/playoff/playoff'
import { bbPlayerseasonaverage } from './basketball/playerseasonaverage/playerseasonaverage'
import { bbPlayermatchstat } from './basketball/playermatchstat/playermatchstat'
import { bbMatchlog } from './basketball/matchlog/matchlog'
import { bbSeasonteamplayer } from './basketball/seasonteamplayer/seasonteamplayer'
import { bbSeasonteam } from './basketball/seasonteam/seasonteam'
import { bbMatch } from './basketball/match/match'
import { bbSeason } from './basketball/season/season'
import { bbCompetition } from './basketball/competition/competition'
import { bbTeam } from './basketball/team/team'
import { bbPlayer } from './basketball/player/player'
import { tfItem } from './track-field/item/item'
import { tfPlayer } from './track-field/player/player'
import { tfTeam } from './track-field/team/team'
import { tfSeason } from './track-field/season/season'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

/**
 * ORDER MATTERS
 * The order here will affect the generated docs.
 * Please pay more attention to the order when editing this file.
 * @param app
 */
export const services = (app: Application) => {
  app.configure(bbNews)
  app.configure(bbPlayer)
  app.configure(bbTeam)
  app.configure(bbCompetition)
  app.configure(bbMatch)
  app.configure(bbSeason)
  app.configure(bbSeasonteam)
  app.configure(bbSeasonteamplayer)
  app.configure(bbTeamrank)
  app.configure(bbPlayerseasonaverage)
  app.configure(bbPlayermatchstat)
  app.configure(bbMatchlog)
  app.configure(bbPlayoff)
  app.configure(tfItem)
  app.configure(tfPlayer)
  app.configure(tfTeam)
  app.configure(tfSeason)
  // All services will be registered here
}
