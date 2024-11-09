export enum Role {
    Professor,
    Student
}

export type User = {
    id: number;
    username: string;
    role: Role;
};

export type Room = {
    user_list: [User]
}