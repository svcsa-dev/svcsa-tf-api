// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { toLowerCaseProperty } from '../../utilities/property-name-converter';

// Main data model schema
export const playerSchema = Type.Object(
  {
    id: Type.Number(),
    birthday: Type.String({ format: 'date-time' }),
    photosrc: Type.String(),
    sex: Type.String(),
    email: Type.String(),
    name: Type.String(),
    birthyear: Type.Number()
  },
  { $id: 'Player', additionalProperties: false }
)
export type Player = Static<typeof playerSchema>
export const playerValidator = getValidator(playerSchema, dataValidator)
export const playerResolver = resolve<Player, HookContext>({
  photosrc: async (value) => {
    // Return the photo avatar URL
    return `http://svcsa.org/uploads/${value}`;
  },

  birthyear: async (_, player) => {
    const dateObj = new Date(player["birthday"])

    return dateObj.getFullYear();
  },
  birthday: async () => undefined,
}, {
  converter: async (rawData) => {
    return toLowerCaseProperty(rawData, playerSchema);
  }
});

export const playerExternalResolver = resolve<Player, HookContext>({})

// Schema for creating new entries
export const playerDataSchema = Type.Pick(playerSchema, ['name'], {
  $id: 'PlayerData'
})
export type PlayerData = Static<typeof playerDataSchema>
export const playerDataValidator = getValidator(playerDataSchema, dataValidator)
export const playerDataResolver = resolve<Player, HookContext>({})

// Schema for updating existing entries
export const playerPatchSchema = Type.Partial(playerSchema, {
  $id: 'PlayerPatch'
})
export type PlayerPatch = Static<typeof playerPatchSchema>
export const playerPatchValidator = getValidator(playerPatchSchema, dataValidator)
export const playerPatchResolver = resolve<Player, HookContext>({})

// Schema for allowed query properties
export const playerQueryProperties = Type.Pick(playerSchema, ['id', 'name'])
export const playerQuerySchema = Type.Intersect(
  [
    querySyntax(playerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PlayerQuery = Static<typeof playerQuerySchema>
export const playerQueryValidator = getValidator(playerQuerySchema, queryValidator)
export const playerQueryResolver = resolve<PlayerQuery, HookContext>({})
