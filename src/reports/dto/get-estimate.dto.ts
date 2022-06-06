import { Transform } from 'class-transformer'
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'
import { Report } from '../entities/report.entity'

export class GetEstimateDto implements Partial<Report> {
  @IsOptional()
  @IsString()
  make?: string

  @IsOptional()
  @IsString()
  model?: string

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year?: number

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(100000)
  mileage?: number

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsLongitude()
  lng?: number

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsLatitude()
  lat?: number
}
