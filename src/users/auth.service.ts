import { BadRequestException, Injectable } from '@nestjs/common'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UsersService } from './users.service'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.find({ email: createUserDto.email })
    if (user) throw new BadRequestException('User already exists!')

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer // To get little bit of help for TS

    const result = salt + '.' + hash.toString('hex')
    createUserDto.password = result

    const newUser = this.userService.create(createUserDto)
    return newUser
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.find({ email: loginUserDto.email })
    if (!user) throw new BadRequestException('User not exists!')

    const [salt, passHash] = user.password.split('.')
    const hash = (await scrypt(loginUserDto.password, salt, 32)) as Buffer

    if (passHash !== hash.toString('hex'))
      throw new BadRequestException('Invalid Credentials!')

    return user
  }
}
