import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator'
import { User } from 'src/users/entities/user.entity'
import { Report } from '../entities/report.entity'

export class CreateReportDto implements Partial<Report> {
  @IsString()
  make: string

  @IsString()
  model: string

  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number

  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage: number

  @IsLongitude()
  lng: number

  @IsLatitude()
  lat: number

  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number

  user?: User
}
