import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto) // Recommended, help with Entity Validation (Hooks) etc
    return this.repo.save(user)
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find()
  }

  async find(userDto: Partial<User>) {
    return await this.repo.findOneBy({ email: userDto.email })
  }

  async findOne(id: number): Promise<User> {
    if (!id) return null
    const user = await this.repo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('No User Exists!')

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id })
    if (!user) throw new NotFoundException('No user exist!')

    return await this.repo.update({ id: user.id }, updateUserDto)
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id })
    if (!user) throw new NotFoundException('No user exist!')

    return await this.repo.remove(user)
  }
}
