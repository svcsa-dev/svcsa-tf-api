import type { TObject, Static } from '@feathersjs/typebox'

export function toLowerCaseProperty<T extends TObject>(rawData: any, schema: T): Static<typeof schema> {
  
  const keys = Object.keys(rawData);

  const returnData: Record<string, any> = {};

  keys.forEach((key) => {
    const lowerKey = key.toLowerCase();

    if (schema.properties.hasOwnProperty(lowerKey)) {
      returnData[lowerKey] = rawData[key];
    }
  });
  return returnData;
}