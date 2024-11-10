// Schemas/Schemas.ts
export interface User {
    id: string;
    username: string;
    role: Role;
  }
  
  export enum Role {
    Student = 'Student',
    Teacher = 'Teacher',
  }
  

export type Room = {
    user_list: [User]
}