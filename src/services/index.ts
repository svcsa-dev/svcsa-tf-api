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

export const services = (app: Application) => {
  app.configure(bbPlayoff)
  app.configure(bbPlayerseasonaverage)
  app.configure(bbPlayermatchstat)
  app.configure(bbMatchlog)
  app.configure(bbSeasonteamplayer)
  app.configure(bbSeasonteam)
  app.configure(bbMatch)
  app.configure(bbSeason)
  app.configure(bbCompetition)
  app.configure(bbTeam)
  app.configure(bbPlayer)
  app.configure(tfItem)
  app.configure(tfPlayer)
  app.configure(tfTeam)
  app.configure(tfSeason)
  // All services will be registered here
}
