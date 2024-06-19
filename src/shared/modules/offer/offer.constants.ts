import { SortType } from '../../models/sort-type.enum.js';

const OffersDefault = {
  LIMIT: 60,
  PREMIUM_LIMIT: 3,
  OFFSET: 0,
  SORT: SortType.Down,
} as const;

export { OffersDefault };
