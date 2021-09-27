import { OrderDto } from '@just-monorepo/types';

import { isInteger } from './is-integer';
import { isFullString } from './is-full-string';

/**
 * Returns true if Order is valid, i.e:
 *
 *   - Has a `vehicleId` property which is valid integer number
 *   - Has a `fullName` property which is valid non-empty string
 *   - Has a `contacts` property which is valid non-empty string
 * @param order
 * @returns
 */
export const isValidOrder = ({ vehicleId, fullName, contacts }: OrderDto) =>
  isInteger(vehicleId) && isFullString(fullName) && isFullString(contacts);
