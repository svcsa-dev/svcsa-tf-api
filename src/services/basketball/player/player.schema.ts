// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { toLowerCaseProperty } from '../../../utilities/property-name-converter';

// Main data model schema
export const bbPlayerSchema = Type.Object(
  {
    id: Type.Number(),
    birth: Type.String({ format: 'date-time' }),
    height: Type.Number(),
    weight: Type.Number(),
    photosrc: Type.String(),
    sex: Type.String(),
    email: Type.String(),
    name: Type.String(),
    birthday: Type.Object({
      month: Type.Number(),
      day: Type.Number(),
    })
  },
  { $id: 'BbPlayer', additionalProperties: false }
)
export type BbPlayer = Static<typeof bbPlayerSchema>
export const bbPlayerValidator = getValidator(bbPlayerSchema, dataValidator)
export const bbPlayerResolver = resolve<BbPlayer, HookContext>({
  photosrc: async (value) => {
    // Return the photo avatar URL
    return `http://www.svcsa.org/uploads/${value}`;
  },
  height: async (value) => {
    if (!value) {
      return;
    }
    // Calculate to cm, if it is in inch
    if (value < 10) {
      return value * 33;
    }
    return value
  },
  birthday: async (_, player) => {
    const dateObj = new Date(player["birth"])

    return {
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate()
    }
  },
  birth: async () => undefined,
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, bbPlayerSchema);
  }
})

export const bbPlayerExternalResolver = resolve<BbPlayer, HookContext>({})

// Schema for creating new entries
export const bbPlayerDataSchema = Type.Pick(bbPlayerSchema, ['name', 'birth', 'height', 'weight', 'sex', 'email'], {
  $id: 'BbPlayerData'
})
export type BbPlayerData = Static<typeof bbPlayerDataSchema>
export const bbPlayerDataValidator = getValidator(bbPlayerDataSchema, dataValidator)
export const bbPlayerDataResolver = resolve<BbPlayer, HookContext>({})

// Schema for updating existing entries
export const bbPlayerPatchSchema = Type.Partial(bbPlayerSchema, {
  $id: 'BbPlayerPatch'
})
export type BbPlayerPatch = Static<typeof bbPlayerPatchSchema>
export const bbPlayerPatchValidator = getValidator(bbPlayerPatchSchema, dataValidator)
export const bbPlayerPatchResolver = resolve<BbPlayer, HookContext>({})

// Schema for allowed query properties
export const bbPlayerQueryProperties = Type.Pick(bbPlayerSchema, ['name'])
export const bbPlayerQuerySchema = Type.Intersect(
  [
    querySyntax(bbPlayerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BbPlayerQuery = Static<typeof bbPlayerQuerySchema>
export const bbPlayerQueryValidator = getValidator(bbPlayerQuerySchema, queryValidator)
export const bbPlayerQueryResolver = resolve<BbPlayerQuery, HookContext>({})
