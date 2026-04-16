export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
}

export interface CartItem extends Book {
  quantity: number;
}
