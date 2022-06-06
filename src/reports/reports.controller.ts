import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { AdminGuard } from 'src/guards/admin.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { ApproveReportDto } from './dto/approve-report.dto'
import { CreateReportDto } from './dto/create-report.dto'
import { GetEstimateDto } from './dto/get-estimate.dto'
import { ReportDto } from './dto/report.dto'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(createReportDto, user)
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  // @Serialize(ReportDto)
  approveReport(
    @Param('id') id: string,
    @Body() approveReportDto: ApproveReportDto
  ) {
    return this.reportsService.approveReport(+id, approveReportDto)
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id)
  }
}
