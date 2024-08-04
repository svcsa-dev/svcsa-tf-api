// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { BbPlayoffService } from './playoff.class'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'
import { bbCompetitionSchema } from '../competition/competition.schema'
import { bbSeasonSchema } from '../season/season.schema'
import { gracefulPromise } from '../../../utilities/graceful-promise'

// Main data model schema
export const bbPlayoffSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    rule: Type.Number(),
    seasonid: Type.Number(),
    competitionid: Type.Number(),
    season: Type.Optional(Type.Ref(bbSeasonSchema)),
    competition: Type.Optional(Type.Ref(bbCompetitionSchema))
  },
  { $id: 'BbPlayoff', additionalProperties: false }
)
export type BbPlayoff = Static<typeof bbPlayoffSchema>
export const bbPlayoffValidator = getValidator(bbPlayoffSchema, dataValidator)
export const bbPlayoffResolver = resolve<BbPlayoff, HookContext<BbPlayoffService>>(
  {
    competition: virtual(async (playoff, context) => {
      return gracefulPromise(context.app.service('basketball/competition').get(playoff.competitionid))
    }),
    season: virtual(async (playoff, context) => {
      return gracefulPromise(context.app.service('basketball/season').get(playoff.seasonid))
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbPlayoffSchema)
    }
  }
)

export const bbPlayoffExternalResolver = resolve<BbPlayoff, HookContext<BbPlayoffService>>({})

// Schema for creating new entries
export const bbPlayoffDataSchema = Type.Pick(bbPlayoffSchema, ['title', 'rule', 'seasonid', 'competitionid'], {
  $id: 'BbPlayoffData'
})
export type BbPlayoffData = Static<typeof bbPlayoffDataSchema>
export const bbPlayoffDataValidator = getValidator(bbPlayoffDataSchema, dataValidator)
export const bbPlayoffDataResolver = resolve<BbPlayoff, HookContext<BbPlayoffService>>({})

// Schema for updating existing entries
export const bbPlayoffPatchSchema = Type.Partial(bbPlayoffSchema, {
  $id: 'BbPlayoffPatch'
})
export type BbPlayoffPatch = Static<typeof bbPlayoffPatchSchema>
export const bbPlayoffPatchValidator = getValidator(bbPlayoffPatchSchema, dataValidator)
export const bbPlayoffPatchResolver = resolve<BbPlayoff, HookContext<BbPlayoffService>>({})

// Schema for allowed query properties
export const bbPlayoffQueryProperties = Type.Pick(bbPlayoffSchema, ['seasonid', 'competitionid'])
export const bbPlayoffQuerySchema = Type.Intersect(
  [
    querySyntax(bbPlayoffQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbPlayoffQuery = Static<typeof bbPlayoffQuerySchema>
export const bbPlayoffQueryValidator = getValidator(bbPlayoffQuerySchema, queryValidator)
export const bbPlayoffQueryResolver = resolve<BbPlayoffQuery, HookContext<BbPlayoffService>>({})
