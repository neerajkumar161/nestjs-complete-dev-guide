import { PartialType } from '@nestjs/mapped-types'
import { Expose, Transform } from 'class-transformer'
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

  @Transform(({ obj }) => obj.user.id) // return the user.id and pass to userId
  @Expose()
  userId: number
}
