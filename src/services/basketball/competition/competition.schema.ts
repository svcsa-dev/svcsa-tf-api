// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

// Main data model schema
export const bbCompetitionSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    picture: Type.String(),
    description: Type.String()
  },
  { $id: 'BbCompetition', additionalProperties: false }
)
export type BbCompetition = Static<typeof bbCompetitionSchema>
export const bbCompetitionValidator = getValidator(bbCompetitionSchema, dataValidator)
export const bbCompetitionResolver = resolve<BbCompetition, HookContext>(
  {
    picture: async (value) => {
      // Return the photo avatar URL
      return `http://svcsa.org/uploads/${value}`
    }
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbCompetitionSchema)
    }
  }
)

export const bbCompetitionExternalResolver = resolve<BbCompetition, HookContext>({})

// Schema for creating new entries
export const bbCompetitionDataSchema = Type.Pick(bbCompetitionSchema, ['name'], {
  $id: 'BbCompetitionData'
})
export type BbCompetitionData = Static<typeof bbCompetitionDataSchema>
export const bbCompetitionDataValidator = getValidator(bbCompetitionDataSchema, dataValidator)
export const bbCompetitionDataResolver = resolve<BbCompetition, HookContext>({})

// Schema for updating existing entries
export const bbCompetitionPatchSchema = Type.Partial(bbCompetitionSchema, {
  $id: 'BbCompetitionPatch'
})
export type BbCompetitionPatch = Static<typeof bbCompetitionPatchSchema>
export const bbCompetitionPatchValidator = getValidator(bbCompetitionPatchSchema, dataValidator)
export const bbCompetitionPatchResolver = resolve<BbCompetition, HookContext>({})

// Schema for allowed query properties
export const bbCompetitionQueryProperties = Type.Pick(bbCompetitionSchema, ['name'])
export const bbCompetitionQuerySchema = Type.Intersect(
  [
    querySyntax(bbCompetitionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbCompetitionQuery = Static<typeof bbCompetitionQuerySchema>
export const bbCompetitionQueryValidator = getValidator(bbCompetitionQuerySchema, queryValidator)
export const bbCompetitionQueryResolver = resolve<BbCompetitionQuery, HookContext>({})
