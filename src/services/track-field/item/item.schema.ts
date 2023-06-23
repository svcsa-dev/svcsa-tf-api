// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';

// Main data model schema
export const tfItemSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    issingle: Type.Number(),
    istrack: Type.Number(),
    heatsize: Type.Number(),
  },
  { $id: 'TfItem', additionalProperties: false }
)
export type TfItem = Static<typeof tfItemSchema>
export const tfItemValidator = getValidator(tfItemSchema, dataValidator)
export const tfItemResolver = resolve<TfItem, HookContext>({}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, tfItemSchema)
  } 
});


export const tfItemExternalResolver = resolve<TfItem, HookContext>({})

// Schema for creating new entries
export const tfItemDataSchema = Type.Pick(tfItemSchema, ['name'], {
  $id: 'TfItemData'
})
export type TfItemData = Static<typeof tfItemDataSchema>
export const tfItemDataValidator = getValidator(tfItemDataSchema, dataValidator)
export const tfItemDataResolver = resolve<TfItem, HookContext>({})

// Schema for updating existing entries
export const tfItemPatchSchema = Type.Partial(tfItemSchema, {
  $id: 'TfItemPatch'
})
export type TfItemPatch = Static<typeof tfItemPatchSchema>
export const tfItemPatchValidator = getValidator(tfItemPatchSchema, dataValidator)
export const tfItemPatchResolver = resolve<TfItem, HookContext>({})

// Schema for allowed query properties
export const tfItemQueryProperties = Type.Pick(tfItemSchema, ['id', 'name', 'issingle','istrack','heatsize'])
export const tfItemQuerySchema = Type.Intersect(
  [
    querySyntax(tfItemQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TfItemQuery = Static<typeof tfItemQuerySchema>
export const tfItemQueryValidator = getValidator(tfItemQuerySchema, queryValidator)
export const tfItemQueryResolver = resolve<TfItemQuery, HookContext>({})
