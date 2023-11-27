
export type Id = string;


export type Card = {

  id:string,
  jobTitle:string,
  description?:string,
  location:string,
  companyName:string,
  createdAt:string,
  updatedAt:string,
  columnId:string,
  order:number,
  imageUrl:string,
}


export type Column = {
  id: string;
  title: string;
  cards: Card[];
  color: string;
  createdAt: string;
  updatedAt: string;
  order: number;


};
