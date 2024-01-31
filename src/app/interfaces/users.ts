export interface Users {
    _name: string;
    _sename: string;
    password: string;
    email: string;
    birthday: string;
}

export interface UsersNew {
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}