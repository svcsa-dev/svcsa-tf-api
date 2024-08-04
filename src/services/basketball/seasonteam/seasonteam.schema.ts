// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

import { bbTeamSchema } from '../team/team.schema'
import { bbSeasonSchema } from '../season/season.schema'
import { gracefulPromise } from '../../../utilities/graceful-promise'
// Main data model schema
export const bbSeasonteamSchema = Type.Object(
  {
    seasonid: Type.Number(),
    teamid: Type.String(),
    team: Type.Optional(Type.Ref(bbTeamSchema)),
    season: Type.Optional(Type.Ref(bbSeasonSchema))
  },
  { $id: 'BbSeasonteam', additionalProperties: false }
)
export type BbSeasonteam = Static<typeof bbSeasonteamSchema>
export const bbSeasonteamValidator = getValidator(bbSeasonteamSchema, dataValidator)
export const bbSeasonteamResolver = resolve<BbSeasonteam, HookContext>(
  {
    team: virtual(async (seasonteam, context) => {
      return gracefulPromise(context.app.service('basketball/team').get(seasonteam.teamid))
    }),
    season: virtual(async (seasonteam, context) => {
      return gracefulPromise(context.app.service('basketball/season').get(seasonteam.seasonid))
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbSeasonteamSchema)
    }
  }
)

export const bbSeasonteamExternalResolver = resolve<BbSeasonteam, HookContext>({})

// Schema for creating new entries
export const bbSeasonteamDataSchema = Type.Pick(bbSeasonteamSchema, ['seasonid'], {
  $id: 'BbSeasonteamData'
})
export type BbSeasonteamData = Static<typeof bbSeasonteamDataSchema>
export const bbSeasonteamDataValidator = getValidator(bbSeasonteamDataSchema, dataValidator)
export const bbSeasonteamDataResolver = resolve<BbSeasonteam, HookContext>({})

// Schema for updating existing entries
export const bbSeasonteamPatchSchema = Type.Partial(bbSeasonteamSchema, {
  $id: 'BbSeasonteamPatch'
})
export type BbSeasonteamPatch = Static<typeof bbSeasonteamPatchSchema>
export const bbSeasonteamPatchValidator = getValidator(bbSeasonteamPatchSchema, dataValidator)
export const bbSeasonteamPatchResolver = resolve<BbSeasonteam, HookContext>({})

// Schema for allowed query properties
export const bbSeasonteamQueryProperties = Type.Pick(bbSeasonteamSchema, ['seasonid'])
export const bbSeasonteamQuerySchema = Type.Intersect(
  [
    querySyntax(bbSeasonteamQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbSeasonteamQuery = Static<typeof bbSeasonteamQuerySchema>
export const bbSeasonteamQueryValidator = getValidator(bbSeasonteamQuerySchema, queryValidator)
export const bbSeasonteamQueryResolver = resolve<BbSeasonteamQuery, HookContext>({})
