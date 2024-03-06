export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    dob: Date;
}

export interface Roles {
    id: number;
    name: string;
}

export interface Hobbies {
    id: number;
    name: string;
}

export interface UserRoles {
    id?: number;
    userId: number;
    roleId: number;
}

export interface UserHobbies {
    id?: number;
    userId: number;
    hobbyId: number;
}