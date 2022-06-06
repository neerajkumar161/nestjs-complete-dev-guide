import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { ApproveReportDto } from './dto/approve-report.dto'
import { CreateReportDto } from './dto/create-report.dto'
import { GetEstimateDto } from './dto/get-estimate.dto'
import { Report } from './entities/report.entity'

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create(createReportDto)
    report.user = user
    return this.repo.save(report)
  }

  getEstimate(getEstimateDto: GetEstimateDto) {
    return `This action returns all reports`
  }

  findOne(id: number) {
    return `This action returns a #${id} report`
  }

  async approveReport(id: number, approveReportDto: ApproveReportDto) {
    if (!id) return null
    const report = await this.repo.findOneBy({ id })
    if (!report) throw new NotFoundException('Report not found!')

    report.approved = approveReportDto.approved
    return this.repo.save(report)
  }

  remove(id: number) {
    return `This action removes a #${id} report`
  }
}
