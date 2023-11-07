// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { BbPlayerseasonaverageService } from './playerseasonaverage.class'

import { bbPlayerSchema } from './../player/player.schema'
import { bbSeasonSchema } from '../season/season.schema'
import { bbTeamSchema } from '../team/team.schema'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'
// Main data model schema
export const bbPlayerseasonaverageSchema = Type.Object(
  {
    id: Type.Number(),
    foul: Type.Number(),
    points: Type.Number(),
    assist: Type.Number(),
    steal: Type.Number(),
    block: Type.Number(),
    offensiverebound: Type.Number(),
    rebound: Type.Number(),
    '3gp': Type.Number(),
    fgp: Type.Number(),
    ftp: Type.Number(),
    seasonid: Type.String(),
    teamid: Type.String(),
    playerid: Type.String(),
    playernumber: Type.Number(),
    team: Type.Optional(Type.Ref(bbTeamSchema)),
    season: Type.Optional(Type.Ref(bbSeasonSchema)),
    player: Type.Optional(Type.Ref(bbPlayerSchema))
  },
  { $id: 'BbPlayerseasonaverage', additionalProperties: false }
)
export type BbPlayerseasonaverage = Static<typeof bbPlayerseasonaverageSchema>
export const bbPlayerseasonaverageValidator = getValidator(bbPlayerseasonaverageSchema, dataValidator)
export const bbPlayerseasonaverageResolver = resolve<
  BbPlayerseasonaverage,
  HookContext<BbPlayerseasonaverageService>
>(
  {
    team: virtual(async (data, context) => {
      return context.app.service('basketball/team').get(data.teamid)
    }),
    season: virtual(async (data, context) => {
      return context.app.service('basketball/season').get(data.seasonid)
    }),
    player: virtual(async (data, context) => {
      return context.app.service('basketball/player').get(data.playerid)
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbPlayerseasonaverageSchema)
    }
  }
)

export const bbPlayerseasonaverageExternalResolver = resolve<
  BbPlayerseasonaverage,
  HookContext<BbPlayerseasonaverageService>
>({})

// Schema for creating new entries
export const bbPlayerseasonaverageDataSchema = Type.Pick(bbPlayerseasonaverageSchema, ['playerid'], {
  $id: 'BbPlayerseasonaverageData'
})
export type BbPlayerseasonaverageData = Static<typeof bbPlayerseasonaverageDataSchema>
export const bbPlayerseasonaverageDataValidator = getValidator(bbPlayerseasonaverageDataSchema, dataValidator)
export const bbPlayerseasonaverageDataResolver = resolve<
  BbPlayerseasonaverage,
  HookContext<BbPlayerseasonaverageService>
>({})

// Schema for updating existing entries
export const bbPlayerseasonaveragePatchSchema = Type.Partial(bbPlayerseasonaverageSchema, {
  $id: 'BbPlayerseasonaveragePatch'
})
export type BbPlayerseasonaveragePatch = Static<typeof bbPlayerseasonaveragePatchSchema>
export const bbPlayerseasonaveragePatchValidator = getValidator(
  bbPlayerseasonaveragePatchSchema,
  dataValidator
)
export const bbPlayerseasonaveragePatchResolver = resolve<
  BbPlayerseasonaverage,
  HookContext<BbPlayerseasonaverageService>
>({})

// Schema for allowed query properties
export const bbPlayerseasonaverageQueryProperties = Type.Pick(bbPlayerseasonaverageSchema, [
  'seasonid',
  'playerid',
  'teamid'
])
export const bbPlayerseasonaverageQuerySchema = Type.Intersect(
  [
    querySyntax(bbPlayerseasonaverageQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbPlayerseasonaverageQuery = Static<typeof bbPlayerseasonaverageQuerySchema>
export const bbPlayerseasonaverageQueryValidator = getValidator(
  bbPlayerseasonaverageQuerySchema,
  queryValidator
)
export const bbPlayerseasonaverageQueryResolver = resolve<
  BbPlayerseasonaverageQuery,
  HookContext<BbPlayerseasonaverageService>
>({})
