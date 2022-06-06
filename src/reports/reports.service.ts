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
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: getEstimateDto.make })
      .andWhere('model = :model', { model: getEstimateDto.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: getEstimateDto.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: getEstimateDto.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: getEstimateDto.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: getEstimateDto.mileage })
      .limit(3)
      .getRawOne()
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
