import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('AuthService', () => {
  let service: AuthService
  let fakeUserService: Partial<UsersService>

  beforeEach(async () => {
    const users: User[] = []
    fakeUserService = {
      find: (userDto: Partial<User>) => {
        const filteredUser = users.filter(
          (user) => user.email === userDto.email
        )
        return Promise.resolve(filteredUser[0])
      },
      create: (createUserDto: CreateUserDto) => {
        const user = { id: users.length + 1, ...createUserDto } as User
        users.push(user)
        return Promise.resolve(user)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it(`resolve valid response of signup method`, async () => {
    const user = await service.signup({
      email: 'test1234@test.com',
      name: 'Test',
      password: 'tester'
    })

    const [salt, hash] = user.password.split('.')
    expect(user.password).not.toEqual('tester')
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it(`resolve error when user exists already in signup method `, async () => {
    try {
      await service.signup({
        email: 'test@test.com',
        password: 'tester',
        name: 'Test'
      })

      await service.signup({
        email: 'test@test.com',
        name: 'Neeraj',
        password: 'tester'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toBe('User already exists!')
    }
  })

  it(`resolve login method when user not exists!`, async () => {
    try {
      await service.login({ email: 'test@test.com', password: 'tester' })
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toBe('User not exists!')
    }
  })

  it(`resolve login method when password in invalid!`, async () => {
    try {
      await service.signup({
        email: 'test@test.com',
        name: 'Test Name',
        password: 'tester123'
      })
      await service.login({ email: 'test@test.com', password: 'tester' })
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toBe('Invalid Credentials!')
    }
  })

  it('resolve valid login method response', async () => {
    await service.signup({
      email: 'test@test.com',
      password: 'tester',
      name: 'Test name'
    })

    const loggedInUser = await service.login({
      email: 'test@test.com',
      password: 'tester'
    })

    expect(loggedInUser).toBeDefined()
  })
})
