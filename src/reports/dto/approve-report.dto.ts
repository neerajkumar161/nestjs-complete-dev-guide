import { IsBoolean } from 'class-validator'
import { Report } from '../entities/report.entity'

export class ApproveReportDto implements Partial<Report> {
  @IsBoolean()
  approved: boolean
}
