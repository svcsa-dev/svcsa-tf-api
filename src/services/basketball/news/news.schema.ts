// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

// Main data model schema
export const bbNewsSchema = Type.Object(
  {
    id: Type.Number(),
    seasonid: Type.Number(),
    matchid: Type.Number(),
    playerid: Type.Number(),
    image: Type.String(),
    category: Type.String(),
    title: Type.String(),
    content: Type.String(),
  },
  { $id: 'BbNews', additionalProperties: false }
)
export type BbNews = Static<typeof bbNewsSchema>
export const bbNewsValidator = getValidator(bbNewsSchema, dataValidator)
export const bbNewsResolver = resolve<BbNews, HookContext>({
  image: async (value) => {
    return `http://svcsa.org/uploads/${value}`
  }
},
{
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, bbNewsSchema)
  }
}
)

export const bbNewsExternalResolver = resolve<BbNews, HookContext>({})

// Schema for creating new entries
export const bbNewsDataSchema = Type.Pick(bbNewsSchema, ['seasonid'], {
  $id: 'BbNewsData'
})
export type BbNewsData = Static<typeof bbNewsDataSchema>
export const bbNewsDataValidator = getValidator(bbNewsDataSchema, dataValidator)
export const bbNewsDataResolver = resolve<BbNews, HookContext>({})

// Schema for updating existing entries
export const bbNewsPatchSchema = Type.Partial(bbNewsSchema, {
  $id: 'BbNewsPatch'
})
export type BbNewsPatch = Static<typeof bbNewsPatchSchema>
export const bbNewsPatchValidator = getValidator(bbNewsPatchSchema, dataValidator)
export const bbNewsPatchResolver = resolve<BbNews, HookContext>({})

// Schema for allowed query properties
export const bbNewsQueryProperties = Type.Pick(bbNewsSchema, ['id', 'seasonid', 'matchid', 'playerid', 'image', 'category', 'title', 'content'])
export const bbNewsQuerySchema = Type.Intersect(
  [
    querySyntax(bbNewsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbNewsQuery = Static<typeof bbNewsQuerySchema>
export const bbNewsQueryValidator = getValidator(bbNewsQuerySchema, queryValidator)
export const bbNewsQueryResolver = resolve<BbNewsQuery, HookContext>({})
