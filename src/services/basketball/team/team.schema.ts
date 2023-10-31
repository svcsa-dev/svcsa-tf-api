// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

// Main data model schema
export const bbTeamSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    shortname: Type.String(),
    captain: Type.String(),
    email: Type.String(),
    tel: Type.String(),
    wechat: Type.String(),
    logosrc: Type.String(),
    photosrc: Type.String(),
    description: Type.Optional(Type.String())
  },
  { $id: 'BbTeam', additionalProperties: false }
)
export type BbTeam = Static<typeof bbTeamSchema>
export const bbTeamValidator = getValidator(bbTeamSchema, dataValidator)
export const bbTeamResolver = resolve<BbTeam, HookContext>(
  {
    photosrc: async (value) => {
      // Return the photo avatar URL
      return `http://svcsa.org/uploads/${value}`
    },
    logosrc: async (value) => {
      // Return the photo avatar URL
      return `http://svcsa.org/uploads/${value}`
    }
  },
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbTeamSchema)
    }
  }
)

export const bbTeamExternalResolver = resolve<BbTeam, HookContext>({})

// Schema for creating new entries
export const bbTeamDataSchema = Type.Pick(bbTeamSchema, ['name', 'logosrc', 'shortname'], {
  $id: 'BbTeamData'
})
export type BbTeamData = Static<typeof bbTeamDataSchema>
export const bbTeamDataValidator = getValidator(bbTeamDataSchema, dataValidator)
export const bbTeamDataResolver = resolve<BbTeam, HookContext>({})

// Schema for updating existing entries
export const bbTeamPatchSchema = Type.Partial(bbTeamSchema, {
  $id: 'BbTeamPatch'
})
export type BbTeamPatch = Static<typeof bbTeamPatchSchema>
export const bbTeamPatchValidator = getValidator(bbTeamPatchSchema, dataValidator)
export const bbTeamPatchResolver = resolve<BbTeam, HookContext>({})

// Schema for allowed query properties
export const bbTeamQueryProperties = Type.Pick(bbTeamSchema, ['id', 'name'])
export const bbTeamQuerySchema = Type.Intersect(
  [
    querySyntax(bbTeamQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbTeamQuery = Static<typeof bbTeamQuerySchema>
export const bbTeamQueryValidator = getValidator(bbTeamQuerySchema, queryValidator)
export const bbTeamQueryResolver = resolve<BbTeamQuery, HookContext>({})
