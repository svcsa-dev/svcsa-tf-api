import { tfPlayer } from './track-field/player/player'
import { tfTeam } from './track-field/team/team'
import { tfSeason } from './track-field/season/season'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(tfPlayer)
  app.configure(tfTeam)
  app.configure(tfSeason)
  // All services will be registered here
}
