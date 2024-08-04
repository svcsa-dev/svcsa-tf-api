// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { BbPlayermatchstatService } from './playermatchstat.class'
import { bbPlayerSchema } from './../player/player.schema'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'
import { gracefulPromise } from '../../../utilities/graceful-promise'

// Main data model schema
export const bbPlayermatchstatSchema = Type.Object(
  {
    id: Type.Number(),
    playerid: Type.Number(),
    matchid: Type.Number(),
    starter: Type.Number(),
    foul: Type.Number(),
    points: Type.Number(),
    assist: Type.Number(),
    steal: Type.Number(),
    block: Type.Number(),
    turnover: Type.Number(),
    offensiverebound: Type.Number(),
    rebound: Type.Number(),
    '3pointshit': Type.Number(),
    '2pointshit': Type.Number(),
    '1pointshit': Type.Number(),
    hit: Type.Number(),
    '3pointsshot': Type.Number(),
    '2pointsshot': Type.Number(),
    '1pointsshot': Type.Number(),
    shot: Type.Number(),
    player: Type.Optional(Type.Ref(bbPlayerSchema))
  },
  { $id: 'BbPlayermatchstat', additionalProperties: false }
)
export type BbPlayermatchstat = Static<typeof bbPlayermatchstatSchema>
export const bbPlayermatchstatValidator = getValidator(bbPlayermatchstatSchema, dataValidator)
export const bbPlayermatchstatResolver = resolve<BbPlayermatchstat, HookContext<BbPlayermatchstatService>>(
  {
    
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbPlayermatchstatSchema)
    }
  }
)

export const bbPlayermatchstatExternalResolver = resolve<BbPlayermatchstat, HookContext<BbPlayermatchstatService>>({
  player: virtual(async (playermatchstat, context) => {
    return gracefulPromise(context.app.service('basketball/player').get(playermatchstat.playerid))
  })
})

// Schema for creating new entries
export const bbPlayermatchstatDataSchema = Type.Pick(bbPlayermatchstatSchema, ['id'], {
  $id: 'BbPlayermatchstatData'
})
export type BbPlayermatchstatData = Static<typeof bbPlayermatchstatDataSchema>
export const bbPlayermatchstatDataValidator = getValidator(bbPlayermatchstatDataSchema, dataValidator)
export const bbPlayermatchstatDataResolver = resolve<
  BbPlayermatchstat,
  HookContext<BbPlayermatchstatService>
>({})

// Schema for updating existing entries
export const bbPlayermatchstatPatchSchema = Type.Partial(bbPlayermatchstatSchema, {
  $id: 'BbPlayermatchstatPatch'
})
export type BbPlayermatchstatPatch = Static<typeof bbPlayermatchstatPatchSchema>
export const bbPlayermatchstatPatchValidator = getValidator(bbPlayermatchstatPatchSchema, dataValidator)
export const bbPlayermatchstatPatchResolver = resolve<
  BbPlayermatchstat,
  HookContext<BbPlayermatchstatService>
>({})

// Schema for allowed query properties
export const bbPlayermatchstatQueryProperties = Type.Pick(bbPlayermatchstatSchema, ['matchid', 'playerid'])
export const bbPlayermatchstatQuerySchema = Type.Intersect(
  [
    querySyntax(bbPlayermatchstatQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbPlayermatchstatQuery = Static<typeof bbPlayermatchstatQuerySchema>
export const bbPlayermatchstatQueryValidator = getValidator(bbPlayermatchstatQuerySchema, queryValidator)
export const bbPlayermatchstatQueryResolver = resolve<
  BbPlayermatchstatQuery,
  HookContext<BbPlayermatchstatService>
>({})
