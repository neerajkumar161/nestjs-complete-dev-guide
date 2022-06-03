import { PartialType } from '@nestjs/mapped-types'
import { Expose } from 'class-transformer'
import { User } from '../entities/user.entity'

export class UserDto extends PartialType(User) {
  @Expose()
  id: number

  @Expose()
  email: string

  @Expose()
  name: string

  @Expose()
  isActive: boolean
}
