export enum Role {
    Professor,
    Student
}

export type User = {
    username: string;
    role: Role
};

export type Room = {
    user_list: [User]
}