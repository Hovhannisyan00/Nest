import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;
  @IsString({ message: 'This is not string' })
  password: string;
  @IsNumber()
  age: number;
}
