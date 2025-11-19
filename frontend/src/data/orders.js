import { DUMMY_PLANTS } from './plants.js';

export const DUMMY_ORDERS = [
  {
    id: 'o1',
    date: '2025-10-01',
    items: [
      {
        ...DUMMY_PLANTS[0], // Monstera Deliciosa
        quantity: 1,
      },
      {
        ...DUMMY_PLANTS[2], // Fiddle Leaf Fig
        quantity: 1,
      },
    ],
    total: 3198,
  },
];
