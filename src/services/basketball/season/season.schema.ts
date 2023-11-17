// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'
import { bbCompetitionSchema } from '../competition/competition.schema'

// Main data model schema
export const bbSeasonSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    teamnumber: Type.Number(),
    groupnumber: Type.Number(),
    playoffgroupnumber: Type.Number(),
    rules: Type.Number(),
    competitionid: Type.Number(),
    starttime: Type.String({ format: 'date-time' }),
    startdate: Type.Object({
      month: Type.Number(),
      day: Type.Number(),
      year: Type.Number()
    }),
    competition: Type.Optional(Type.Ref(bbCompetitionSchema))
  },
  { $id: 'BbSeason', additionalProperties: false }
)
export type BbSeason = Static<typeof bbSeasonSchema>
export const bbSeasonValidator = getValidator(bbSeasonSchema, dataValidator)
export const bbSeasonResolver = resolve<BbSeason, HookContext>(
  {
    startdate: async (_, season) => {
      const dateObj = new Date(season['starttime'])

      return {
        month: dateObj.getMonth() + 1,
        day: dateObj.getDate(),
        year: dateObj.getFullYear()
      }
    },
    competition: virtual(async (playoff, context) => {
      return context.app.service('basketball/competition').get(playoff.competitionid)
    })
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbSeasonSchema)
    }
  }
)

export const bbSeasonExternalResolver = resolve<BbSeason, HookContext>({})

// Schema for creating new entries
export const bbSeasonDataSchema = Type.Pick(bbSeasonSchema, ['name'], {
  $id: 'BbSeasonData'
})
export type BbSeasonData = Static<typeof bbSeasonDataSchema>
export const bbSeasonDataValidator = getValidator(bbSeasonDataSchema, dataValidator)
export const bbSeasonDataResolver = resolve<BbSeason, HookContext>({})

// Schema for updating existing entries
export const bbSeasonPatchSchema = Type.Partial(bbSeasonSchema, {
  $id: 'BbSeasonPatch'
})
export type BbSeasonPatch = Static<typeof bbSeasonPatchSchema>
export const bbSeasonPatchValidator = getValidator(bbSeasonPatchSchema, dataValidator)
export const bbSeasonPatchResolver = resolve<BbSeason, HookContext>({})

// Schema for allowed query properties
export const bbSeasonQueryProperties = Type.Pick(bbSeasonSchema, ['name', 'starttime', 'competitionid'])
export const bbSeasonQuerySchema = Type.Intersect(
  [
    querySyntax(bbSeasonQueryProperties),
    // Add additional query properties here
    Type.Object({})
  ],
  { additionalProperties: false }
)
// console.log(bbSeasonQuerySchema)
export type BbSeasonQuery = Static<typeof bbSeasonQuerySchema>
export const bbSeasonQueryValidator = getValidator(bbSeasonQuerySchema, queryValidator)
export const bbSeasonQueryResolver = resolve<BbSeasonQuery, HookContext>({})
