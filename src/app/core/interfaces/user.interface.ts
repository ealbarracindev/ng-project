
export interface IUserDto {
    id: string;
    email: string;
    name:string;
    password:string;
}

export type IUserCreateDto = Omit<IUserDto, 'id'>;

