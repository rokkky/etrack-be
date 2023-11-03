export const CATEGORY_TYPES = {
  0: 'Expense',
  1: 'Income',
};

export const DEFAULT_CATEGORIES = [
  // Expense categories
  {
    name: 'Rent',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Communal apartment',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Groceries',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Pets',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Medicine',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Gifts',
    type: CATEGORY_TYPES[0],
  },
  {
    name: 'Other',
    type: CATEGORY_TYPES[0],
  },
  //Income categories
  {
    name: 'Other',
    type: CATEGORY_TYPES[1],
  },
  {
    name: 'Salary',
    type: CATEGORY_TYPES[1],
  },
  {
    name: 'Investments',
    type: CATEGORY_TYPES[1],
  },
  {
    name: 'Gifts',
    type: CATEGORY_TYPES[1],
  },
  {
    name: 'Sudden wealth',
    type: CATEGORY_TYPES[1],
  },
];
