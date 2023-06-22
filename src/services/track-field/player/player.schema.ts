// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';

// Main data model schema
export const tfPlayerSchema = Type.Object(
  {
    id: Type.Number(),
    birthday: Type.String({ format: 'date-time' }),
    photosrc: Type.Optional(Type.String()),
    sex: Type.String(),
    email: Type.String(),
    name: Type.String(),
    birthyear: Type.Number()
  },
  { $id: 'TfPlayer', additionalProperties: false }
)
export type TfPlayer = Static<typeof tfPlayerSchema>
export const tfPlayerValidator = getValidator(tfPlayerSchema, dataValidator)
export const tfPlayerResolver = resolve<TfPlayer, HookContext>({
  photosrc: async (value) => {
    // Return the photo avatar URL
    if(!value) {
      return 'null';
    }
    return `http://svcsa.org/uploads/${value}`;
  },

  birthyear: async (_, tfPlayer) => {
    const dateObj = new Date(tfPlayer["birthday"])

    return dateObj.getFullYear();
  },
  birthday: async () => undefined,
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, tfPlayerSchema);
  }
});

export const tfPlayerExternalResolver = resolve<TfPlayer, HookContext>({})

// Schema for creating new entries
export const tfPlayerDataSchema = Type.Pick(tfPlayerSchema, ['name'], {
  $id: 'TfPlayerData'
})
export type TfPlayerData = Static<typeof tfPlayerDataSchema>
export const tfPlayerDataValidator = getValidator(tfPlayerDataSchema, dataValidator)
export const tfPlayerDataResolver = resolve<TfPlayer, HookContext>({})

// Schema for updating existing entries
export const tfPlayerPatchSchema = Type.Partial(tfPlayerSchema, {
  $id: 'TfPlayerPatch'
})
export type TfPlayerPatch = Static<typeof tfPlayerPatchSchema>
export const tfPlayerPatchValidator = getValidator(tfPlayerPatchSchema, dataValidator)
export const tfPlayerPatchResolver = resolve<TfPlayer, HookContext>({})

// Schema for allowed query properties
export const tfPlayerQueryProperties = Type.Pick(tfPlayerSchema, ['id', 'name'])
export const tfPlayerQuerySchema = Type.Intersect(
  [
    querySyntax(tfPlayerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TfPlayerQuery = Static<typeof tfPlayerQuerySchema>
export const tfPlayerQueryValidator = getValidator(tfPlayerQuerySchema, queryValidator)
export const tfPlayerQueryResolver = resolve<TfPlayerQuery, HookContext>({})
