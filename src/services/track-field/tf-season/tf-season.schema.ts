// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';


// Main data model schema

export const seasonSchema = Type.Object(
    {
      id: Type.Number(),
      name: Type.String(),
      date: Type.String({ format: 'date-time' }),
      scheduledDate: Type.Object({
        month: Type.Number(),
        day: Type.Number(),
        year: Type.Number(),
      }),
      venue: Type.String()
    },
    { $id: 'Season', additionalProperties: false }
  )
  

export type Season = Static<typeof seasonSchema>
export const seasonValidator = getValidator(seasonSchema, dataValidator)
export const seasonResolver = resolve<Season, HookContext>({
  scheduledDate: async (_, season) => {
    const dateObj = new Date(season["date"])

    return {
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
      year: dateObj.getFullYear()
    }
  },
  }, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, seasonSchema)
  } 
});

export const seasonExternalResolver = resolve<Season, HookContext>({})

// Schema for creating new entries
export const seasonDataSchema = Type.Pick(seasonSchema, ['name'], {
    $id: 'SeasonData'
  })
  export type SeasonData = Static<typeof seasonDataSchema>
  export const seasonDataValidator = getValidator(seasonDataSchema, dataValidator)
  export const seasonDataResolver = resolve<Season, HookContext>({})
  
  // Schema for updating existing entries
  export const seasonPatchSchema = Type.Partial(seasonSchema, {
    $id: 'SeasonPatch'
  })
  export type SeasonPatch = Static<typeof seasonPatchSchema>
  export const seasonPatchValidator = getValidator(seasonPatchSchema, dataValidator)
  export const seasonPatchResolver = resolve<Season, HookContext>({})
  
  // Schema for allowed query properties
  export const seasonQueryProperties = Type.Pick(seasonSchema, ['id', 'name'])
  export const seasonQuerySchema = Type.Intersect(
    [
      querySyntax(seasonQueryProperties),
      // Add additional query properties here
      Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
  )
  export type SeasonQuery = Static<typeof seasonQuerySchema>
  export const seasonQueryValidator = getValidator(seasonQuerySchema, queryValidator)
  export const seasonQueryResolver = resolve<SeasonQuery, HookContext>({})

  