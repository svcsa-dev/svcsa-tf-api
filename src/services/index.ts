import { tfPlayer } from './track-field/tf-player/tf-player'
import { tfTeam } from './track-field/tf-team/tf-team'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(tfPlayer)
  app.configure(tfTeam)
  // All services will be registered here
}
