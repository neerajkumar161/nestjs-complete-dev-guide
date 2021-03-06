import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'
import { User } from '../entities/user.entity'

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsString()
  password: string

  @IsOptional()
  @IsBoolean()
  admin: boolean
}
