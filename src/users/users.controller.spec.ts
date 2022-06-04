import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController
  let authService: Partial<AuthService>
  let usersService: Partial<UsersService>

  beforeEach(async () => {
    let users: User[] = []
    authService = {
      signup: async (createUserDto: CreateUserDto) => {
        return await usersService.create(createUserDto)
      },
      login: async (loginDto: LoginUserDto) => {
        return Promise.resolve(await usersService.find(loginDto))
      }
    }

    usersService = {
      findOne: (id: number) => {
        const filteredUser = users.filter((user) => user.id === id)
        return Promise.resolve(filteredUser[0] as User)
      },
      findAll: () => Promise.resolve(users),
      update: (id: number, updateUserDto: UpdateUserDto) => {
        const findUserIndex = users.findIndex((user) => user.id === id)
        let existedUser = users[findUserIndex]
        existedUser = { ...existedUser, ...updateUserDto } as User
        return Promise.resolve(existedUser) as any
      },
      remove: (id: number) => {
        const filteredUser = users.filter((user) => user.id === id)
        return Promise.resolve(filteredUser[0])
      },
      create: (createUserDto: CreateUserDto) => {
        const user = { id: users.length + 1, ...createUserDto } as User
        users.push(user)
        return Promise.resolve(user)
      },
      find: (userDto: Partial<UserDto>) => {
        const filteredUser = users.filter(
          (user) => user.email === userDto.email
        )
        return Promise.resolve(filteredUser[0])
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: AuthService, useValue: authService }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('reslove findAll method response', async () => {
    await authService.signup({
      email: 'test@test.com',
      name: 'Test Name',
      password: 'tester'
    })
    const allUsers = await controller.findAll('1')
    expect(allUsers[0].email).toEqual('test@test.com')
  })

  it(`resolve findOne method response`, async () => {
    await authService.signup({
      email: 'test@test.com',
      name: 'Test Name',
      password: 'tester'
    })

    const user = await controller.findOne('1')
    expect(user.email).toEqual('test@test.com')
  })

  it(`resolve update method response`, async () => {
    await authService.signup({
      email: 'test@test.com',
      name: 'Test Name',
      password: 'tester'
    })

    const user = await controller.update('1', { name: 'Updated name' })
    expect(user['name']).toEqual('Updated name')
  })

  it(`resolve remove method response`, async () => {
    await authService.signup({
      email: 'test@test.com',
      name: 'Test Name',
      password: 'tester'
    })

    const user = await controller.remove('1')
    expect(user).toBeDefined()
  })

  it(`resolve create method response `, async () => {
    const user = await controller.create(
      { email: 'test@test.com', name: 'Test Name', password: 'tester' },
      { userId: 1 }
    )

    expect(user).toBeDefined()
  })

  it(`resolve login method response `, async () => {
    await authService.signup({
      email: 'test@test.com',
      name: 'Test Name',
      password: 'tester'
    })

    const user = await controller.login(
      { email: 'test@test.com', password: 'tester' },
      { userId: 1 }
    )

    expect(user).toBeDefined()
  })
})
