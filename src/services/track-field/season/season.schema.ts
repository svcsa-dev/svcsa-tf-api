// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';


// Main data model schema

export const tfSeasonSchema = Type.Object(
    {
      id: Type.Number(),
      name: Type.String(),
      date: Type.String({ format: 'date' }),
      venue: Type.String(),
      schedule: Type.Object({
        date: Type.String(),
  
      }),
      startdate: Type.String(),
    },
    { $id: 'Season', additionalProperties: false }
  )
  

export type TfSeason = Static<typeof tfSeasonSchema>
export const tfSeasonValidator = getValidator(tfSeasonSchema, dataValidator)
export const tfSeasonResolver = resolve<TfSeason, HookContext>({
  schedule: async (_, season) => {
    if (!season.date) {
      return undefined;
    }
    const dateObj = new Date(season["date"]);
    const month = dateObj.getMonth() + 1;
    const year=  dateObj.getFullYear();
    const day=  dateObj.getDate();
    return {
      date: `${year}/${month}/${day}`
    }
  },
  date: async () => undefined,   // hiding date property. 
  
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData,tfSeasonSchema )
  } 
});

export const tfSeasonExternalResolver = resolve<TfSeason, HookContext>({})

// Schema for creating new entries
export const tfSeasonDataSchema = Type.Pick(tfSeasonSchema, ['name'], {
    $id: 'TfSeasonData'
  })
  export type TfSeasonData = Static<typeof tfSeasonDataSchema>
  export const tfSeasonDataValidator = getValidator(tfSeasonDataSchema, dataValidator)
  export const tfSeasonDataResolver = resolve<TfSeason, HookContext>({})
  
  // Schema for updating existing entries
  export const tfSeasonPatchSchema = Type.Partial(tfSeasonSchema, {
    $id: 'TfSeasonPatch'
  })
  export type TfSeasonPatch = Static<typeof tfSeasonPatchSchema>
  export const tfSeasonPatchValidator = getValidator(tfSeasonPatchSchema, dataValidator)
  export const tfSeasonPatchResolver = resolve<TfSeason, HookContext>({})
  
  // Schema for allowed query properties
  export const tfSeasonQueryProperties = Type.Pick(tfSeasonSchema, ['id', 'name'])
  export const tfSeasonQuerySchema = Type.Intersect(
    [
      querySyntax(tfSeasonQueryProperties),
      // Add additional query properties here
      Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
  )
  export type TfSeasonQuery = Static<typeof tfSeasonQuerySchema>
  export const tfSeasonQueryValidator = getValidator(tfSeasonQuerySchema, queryValidator)
  export const tfSeasonQueryResolver = resolve<TfSeasonQuery, HookContext>({})

  