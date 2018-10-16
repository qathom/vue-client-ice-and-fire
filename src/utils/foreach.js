/**
 * Async foreach
 * @param {Array} array
 * @param {Function} callback
 */
export default async function asyncForEach(array = [], callback) {
  /* eslint no-await-in-loop: 0 */
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
}
