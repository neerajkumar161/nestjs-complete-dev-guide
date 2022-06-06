import { PartialType } from '@nestjs/mapped-types'
import { Exclude, Expose, Transform } from 'class-transformer'
import { User } from 'src/users/entities/user.entity'
import { Report } from '../entities/report.entity'

export class ReportDto extends PartialType(Report) {
  @Expose()
  id: number

  @Expose()
  price: number

  @Expose()
  year: number

  @Expose()
  lng: number

  @Expose()
  lat: number

  @Expose()
  make: string

  @Expose()
  model: string

  @Expose()
  mileage: number

  @Exclude()
  user?: User

  @Transform(({ obj }) => {
    console.log({ obj })
    return obj.user.id
  }) // return the user.id and pass to userId
  @Expose()
  userId: number

  @Expose()
  approved: boolean
}
