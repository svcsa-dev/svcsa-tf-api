export async function gracefulPromise<T>(promise: Promise<T>): Promise<T | undefined> {
  try {
    const result = await promise;
    return result;
  } catch (error) {
    // Handle the error gracefully
    // TODO: Add Log
    console.error('Failed to fetch:', error);

    // Return undefined
    return undefined;

  }
}
