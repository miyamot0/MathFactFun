/** handleFilterEvent
 *
 * Update interface with filter
 *
 * @param {String} newFilter Filter criteria
 */
export function handleFilterEvent(
  newFilter: string,
  setCurrentFilter: any,
  changeFilter: any
): void {
  setCurrentFilter(newFilter);
  changeFilter(newFilter);
}
