import { OrderDto } from '@just-monorepo/types';

import { isNumber } from './is-number';
import { isFullString } from './is-full-string';

export const isValidOrder = ({ vehicleId, fullName, contacts }: OrderDto) =>
  isNumber(vehicleId) && isFullString(fullName) && isFullString(contacts);
