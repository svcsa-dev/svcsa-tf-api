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
export const bbMatchSchema = Type.Object(
  {
    id: Type.Number(),
    round: Type.Number(),
    teamaid: Type.Number(),
    teambid: Type.Number(),
    scoreteama: Type.Number(),
    scoreteamb: Type.Number(),
    state: Type.Number(),
    starttime: Type.String({ format: 'date-time' }),
    seasonid: Type.Number(),
    court: Type.String(),
    teama: Type.Optional(Type.Ref(bbTeamSchema)),
    teamb: Type.Optional(Type.Ref(bbTeamSchema)),
    season: Type.Optional(Type.Ref(bbSeasonSchema)),
    groupid: Type.Number()
  },
  { $id: 'BbMatch', additionalProperties: false }
)
export type BbMatch = Static<typeof bbMatchSchema>
export const bbMatchValidator = getValidator(bbMatchSchema, dataValidator)
export const bbMatchResolver = resolve<BbMatch, HookContext>(
  {
    teama: virtual(async (match, context) => {
      return gracefulPromise(context.app.service('basketball/team').get(match.teamaid))
    }),
    teamb: virtual(async (match, context) => {
      return gracefulPromise(context.app.service('basketball/team').get(match.teambid))
    }),
    season: virtual(async (match, context) => {
      return gracefulPromise(context.app.service('basketball/season').get(match.seasonid))
    }),
    groupid: virtual(async (match, context) => {
      return gracefulPromise(
        context.app
          .service('basketball/seasonteam')
          .find({
            query: {
              seasonid: match.seasonid,
              teamid: match.teamaid
            }
          })
          .then((res) => {
            return res.data?.[0]?.groupid ?? 0
          })
      )
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbMatchSchema)
    }
  }
)

export const bbMatchExternalResolver = resolve<BbMatch, HookContext>({})

// Schema for creating new entries
export const bbMatchDataSchema = Type.Pick(bbMatchSchema, ['seasonid'], {
  $id: 'BbMatchData'
})
export type BbMatchData = Static<typeof bbMatchDataSchema>
export const bbMatchDataValidator = getValidator(bbMatchDataSchema, dataValidator)
export const bbMatchDataResolver = resolve<BbMatch, HookContext>({})

// Schema for updating existing entries
export const bbMatchPatchSchema = Type.Partial(bbMatchSchema, {
  $id: 'BbMatchPatch'
})
export type BbMatchPatch = Static<typeof bbMatchPatchSchema>
export const bbMatchPatchValidator = getValidator(bbMatchPatchSchema, dataValidator)
export const bbMatchPatchResolver = resolve<BbMatch, HookContext>({})

// Schema for allowed query properties
export const bbMatchQueryProperties = Type.Pick(bbMatchSchema, ['seasonid', 'starttime', 'state', 'teamaid', 'teambid', 'scoreteama', 'scoreteamb', 'round'])
export const bbMatchQuerySchema = Type.Intersect(
  [
    querySyntax(bbMatchQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbMatchQuery = Static<typeof bbMatchQuerySchema>
export const bbMatchQueryValidator = getValidator(bbMatchQuerySchema, queryValidator)
export const bbMatchQueryResolver = resolve<BbMatchQuery, HookContext>({})
