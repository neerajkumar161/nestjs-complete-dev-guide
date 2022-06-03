import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto)
    session.userId = user.id
    return user
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.authService.login(loginUserDto)
    session.userId = user.id
    return user
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    session.userId = null
  }

  @Get()
  findAll(@Session() session: any): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  // @Serialize(UserDto) -- used on Controller Decorator
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
