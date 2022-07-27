export interface iBook{
    id? :string;
    book_title: string;
    book_price: number;
    author: number|string;
    published_year: string;
    description: string;
}

export interface ibookDataTable{
    total_count: number;
    items: iBook[]
}

export interface iAuthor{
    id? :string,
    name: string
}