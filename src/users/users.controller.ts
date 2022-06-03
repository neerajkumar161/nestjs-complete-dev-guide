import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<User[]> {
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
