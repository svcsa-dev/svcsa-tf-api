// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';


// Main data model schema

export const tfTeamSchema = Type.Object(
    {
      id: Type.Number(),
      name: Type.String(),
      shortname: Type.String(),
      logosrc: Type.Optional(Type.String()),
      photosrc: Type.Optional(Type.String()),
      description: Type.String(),
      captainname: Type.String(), 
      capitainemail:Type.String(), 
      capitainphone: Type.String(), 
    },
    { $id: 'Team', additionalProperties: false }
  )
  

export type TfTeam = Static<typeof tfTeamSchema>
export const tfTeamValidator = getValidator(tfTeamSchema, dataValidator)
export const tfTeamResolver = resolve<TfTeam, HookContext>({
  photosrc: async (value) => {
    if(!value) {
      return 'null';
    }
    return `http://www.svcsa.org/uploads/${value}`;
  },

  logosrc: async (value) => {
    if(!value) {
      return 'null';
    }
    return `http://www.svcsa.org/uploads/${value}`;
  }, 
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, tfTeamSchema)
  } 
});

export const tfTeamExternalResolver = resolve<TfTeam, HookContext>({})

// Schema for creating new entries
export const tfTeamDataSchema = Type.Pick(tfTeamSchema, ['name'], {
    $id: 'TfTeamData'
  })
  export type TfTeamData = Static<typeof tfTeamDataSchema>
  export const tfTeamDataValidator = getValidator(tfTeamDataSchema, dataValidator)
  export const tfTeamDataResolver = resolve<TfTeam, HookContext>({})
  
  // Schema for updating existing entries
  export const tfTeamPatchSchema = Type.Partial(tfTeamSchema, {
    $id: 'TfTeamPatch'
  })
  export type TfTeamPatch = Static<typeof tfTeamPatchSchema>
  export const tfTeamPatchValidator = getValidator(tfTeamPatchSchema, dataValidator)
  export const tfTeamPatchResolver = resolve<TfTeam, HookContext>({})
  
  // Schema for allowed query properties
  export const tfTeamQueryProperties = Type.Pick(tfTeamSchema, ['id', 'name'])
  export const tfTeamQuerySchema = Type.Intersect(
    [
      querySyntax(tfTeamQueryProperties),
      // Add additional query properties here
      Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
  )
  export type TfTeamQuery = Static<typeof tfTeamQuerySchema>
  export const tfTeamQueryValidator = getValidator(tfTeamQuerySchema, queryValidator)
  export const tfTeamQueryResolver = resolve<TfTeamQuery, HookContext>({})

  