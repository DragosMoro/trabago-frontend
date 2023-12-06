export type Id = string;

export type Column = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  color: string;
};

export type Card = {
  id: string;
  company: string;
  position: string;
  location: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  description: string;
  imageUrl: string;
  jobColumn: Column;
};

export type ColumnWithCards = Column & { cards: Card[] };
