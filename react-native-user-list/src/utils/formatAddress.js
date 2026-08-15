/**
 * jsonplaceholder returns address as a nested object:
 *   { street, suite, city, zipcode, geo: { lat, lng } }
 * The UI only wants "street, city, zipcode" as a single display string.
 * Isolated here so the transform is unit-testable and reusable outside
 * the Redux layer (e.g. in a detail screen later).
 */
export function formatAddress(address) {
  if (!address) return '';
  const { street, city, zipcode } = address;
  return [street, city, zipcode].filter(Boolean).join(', ');
}
