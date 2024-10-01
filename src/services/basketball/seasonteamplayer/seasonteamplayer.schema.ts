// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

import { toLowerCaseProperty } from '../../../utilities/property-name-converter'
import { gracefulPromise } from '../../../utilities/graceful-promise';

import { bbTeamSchema } from '../team/team.schema'
import { bbSeasonSchema } from '../season/season.schema'
import { bbPlayerSchema } from '../player/player.schema'

// Main data model schema
export const bbSeasonteamplayerSchema = Type.Object(
  {
    seasonid: Type.Number(),
    teamid: Type.Number(),
    playerid: Type.Number(),
    playernumber: Type.Number(),
    team: Type.Optional(Type.Ref(bbTeamSchema)),
    season: Type.Optional(Type.Ref(bbSeasonSchema)),
    player: Type.Optional(Type.Ref(bbPlayerSchema))
  },
  { $id: 'BbSeasonteamplayer', additionalProperties: false }
)
export type BbSeasonteamplayer = Static<typeof bbSeasonteamplayerSchema>
export const bbSeasonteamplayerValidator = getValidator(bbSeasonteamplayerSchema, dataValidator)
export const bbSeasonteamplayerResolver = resolve<BbSeasonteamplayer, HookContext>(
  {
    team: virtual(async (seasonteamplayer, context) => {
      return gracefulPromise(context.app.service('basketball/team').get(seasonteamplayer.teamid))
    }),
    season: virtual(async (seasonteamplayer, context) => {
      return gracefulPromise(context.app.service('basketball/season').get(seasonteamplayer.seasonid))
    }),
    player: virtual(async (seasonteamplayer, context) => {
      return gracefulPromise(context.app.service('basketball/player').get(seasonteamplayer.playerid))
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbSeasonteamplayerSchema)
    }
  }
)

export const bbSeasonteamplayerExternalResolver = resolve<BbSeasonteamplayer, HookContext>({})

// Schema for creating new entries
export const bbSeasonteamplayerDataSchema = Type.Pick(bbSeasonteamplayerSchema, ['teamid', 'playerid', 'seasonid'], {
  $id: 'BbSeasonteamplayerData'
})
export type BbSeasonteamplayerData = Static<typeof bbSeasonteamplayerDataSchema>
export const bbSeasonteamplayerDataValidator = getValidator(bbSeasonteamplayerDataSchema, dataValidator)
export const bbSeasonteamplayerDataResolver = resolve<BbSeasonteamplayer, HookContext>({})

// Schema for updating existing entries
export const bbSeasonteamplayerPatchSchema = Type.Partial(bbSeasonteamplayerSchema, {
  $id: 'BbSeasonteamplayerPatch'
})
export type BbSeasonteamplayerPatch = Static<typeof bbSeasonteamplayerPatchSchema>
export const bbSeasonteamplayerPatchValidator = getValidator(bbSeasonteamplayerPatchSchema, dataValidator)
export const bbSeasonteamplayerPatchResolver = resolve<BbSeasonteamplayer, HookContext>({})

// Schema for allowed query properties
export const bbSeasonteamplayerQueryProperties = Type.Pick(bbSeasonteamplayerSchema, [
  'teamid',
  'playerid',
  'seasonid'
])
export const bbSeasonteamplayerQuerySchema = Type.Intersect(
  [
    querySyntax(bbSeasonteamplayerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbSeasonteamplayerQuery = Static<typeof bbSeasonteamplayerQuerySchema>
export const bbSeasonteamplayerQueryValidator = getValidator(bbSeasonteamplayerQuerySchema, queryValidator)
export const bbSeasonteamplayerQueryResolver = resolve<BbSeasonteamplayerQuery, HookContext>({})
