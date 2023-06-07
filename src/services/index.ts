import { player } from './player/player'
import { team } from './team/team'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(player)
  app.configure(team)
  // All services will be registered here
}
