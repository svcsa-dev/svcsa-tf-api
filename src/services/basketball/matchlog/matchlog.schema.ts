// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import type { BbMatchlogService } from './matchlog.class'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

// Main data model schema
export const bbMatchlogSchema = Type.Object(
  {
    logid: Type.Number(),
    matchid: Type.String(),
    playerid: Type.Number(),
    event: Type.String(),
    teamid: Type.Number() // Add proper resolution of
  },
  { $id: 'BbMatchlog', additionalProperties: false }
)
export type BbMatchlog = Static<typeof bbMatchlogSchema>
export const bbMatchlogValidator = getValidator(bbMatchlogSchema, dataValidator)
export const bbMatchlogResolver = resolve<BbMatchlog, HookContext<BbMatchlogService>>(
  {},
  {
    converter: async (rawData) => {
      return toLowerCaseProperty(rawData, bbMatchlogSchema)
    }
  }
)

export const bbMatchlogExternalResolver = resolve<BbMatchlog, HookContext<BbMatchlogService>>({})

// Schema for creating new entries
export const bbMatchlogDataSchema = Type.Pick(bbMatchlogSchema, ['matchid', 'teamid', 'playerid', 'event'], {
  $id: 'BbMatchlogData'
})
export type BbMatchlogData = Static<typeof bbMatchlogDataSchema>
export const bbMatchlogDataValidator = getValidator(bbMatchlogDataSchema, dataValidator)
export const bbMatchlogDataResolver = resolve<BbMatchlog, HookContext<BbMatchlogService>>({})

// Schema for updating existing entries
export const bbMatchlogPatchSchema = Type.Partial(bbMatchlogSchema, {
  $id: 'BbMatchlogPatch'
})
export type BbMatchlogPatch = Static<typeof bbMatchlogPatchSchema>
export const bbMatchlogPatchValidator = getValidator(bbMatchlogPatchSchema, dataValidator)
export const bbMatchlogPatchResolver = resolve<BbMatchlog, HookContext<BbMatchlogService>>({})

// Schema for allowed query properties
export const bbMatchlogQueryProperties = Type.Pick(bbMatchlogSchema, ['matchid', 'teamid'])
export const bbMatchlogQuerySchema = Type.Intersect(
  [
    querySyntax(bbMatchlogQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbMatchlogQuery = Static<typeof bbMatchlogQuerySchema>
export const bbMatchlogQueryValidator = getValidator(bbMatchlogQuerySchema, queryValidator)
export const bbMatchlogQueryResolver = resolve<BbMatchlogQuery, HookContext<BbMatchlogService>>({})
