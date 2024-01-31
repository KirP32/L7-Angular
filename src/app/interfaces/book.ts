export interface Book {
    name: string,
    author_name: string,
    author_sename: string;
}


export interface IEditBook {
    id: number,
    name: string,
    author_name: string,
    author_sename: string;
}

export interface IBook {
    id: string,
    userId: string,
    author: string;
    name: string,
}

export interface BookRequest {
    author: string,
    name: string;
}
