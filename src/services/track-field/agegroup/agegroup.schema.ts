// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter'

// Main data model schema
export const tfAgegroupSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    minage: Type.Number(),
    maxage: Type.Number()
  },
  { $id: 'TfAgegroup', additionalProperties: false }
)
export type TfAgegroup = Static<typeof tfAgegroupSchema>
export const tfAgegroupValidator = getValidator(tfAgegroupSchema, dataValidator)
export const tfAgegroupResolver = resolve<TfAgegroup, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, tfAgegroupSchema)
  }
});

export const tfAgegroupExternalResolver = resolve<TfAgegroup, HookContext>({})

// Schema for creating new entries
export const tfAgegroupDataSchema = Type.Pick(tfAgegroupSchema, ['name'], {
  $id: 'TfAgegroupData'
})
export type TfAgegroupData = Static<typeof tfAgegroupDataSchema>
export const tfAgegroupDataValidator = getValidator(tfAgegroupDataSchema, dataValidator)
export const tfAgegroupDataResolver = resolve<TfAgegroup, HookContext>({})

// Schema for updating existing entries
export const tfAgegroupPatchSchema = Type.Partial(tfAgegroupSchema, {
  $id: 'TfAgegroupPatch'
})
export type TfAgegroupPatch = Static<typeof tfAgegroupPatchSchema>
export const tfAgegroupPatchValidator = getValidator(tfAgegroupPatchSchema, dataValidator)
export const tfAgegroupPatchResolver = resolve<TfAgegroup, HookContext>({})

// Schema for allowed query properties
export const tfAgegroupQueryProperties = Type.Pick(tfAgegroupSchema, ['id', 'name','minage','maxage'])
export const tfAgegroupQuerySchema = Type.Intersect(
  [
    querySyntax(tfAgegroupQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TfAgegroupQuery = Static<typeof tfAgegroupQuerySchema>
export const tfAgegroupQueryValidator = getValidator(tfAgegroupQuerySchema, queryValidator)
export const tfAgegroupQueryResolver = resolve<TfAgegroupQuery, HookContext>({})
