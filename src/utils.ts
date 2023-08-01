// a simple uuid generator that works for our case, as we are resetting data every session
let id = 0;
export function getUniqueId(): string {
  return id++ + '';
}