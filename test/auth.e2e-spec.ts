import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('Authentication System', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('resolve signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'asdf11@test.com', name: 'Neeraj', password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body
        expect(id).toBeDefined()
        expect(email).toBe('asdf1@test.com')
      })
  })
})
