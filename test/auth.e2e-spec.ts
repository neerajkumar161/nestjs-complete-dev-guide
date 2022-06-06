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

  it('resolve signup request', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'asdf123@test.com', name: 'Neeraj', password: '1234' })
      .expect(201)

    expect(body.id).toBeDefined()
    expect(body.email).toBe('asdf123@test.com')
  })

  it('resolve login request with signup user first', async () => {
    const appServer = request(app.getHttpServer())
    const postRes = await appServer
      .post('/auth/signup')
      .send({ email: 'asdf123@test.com', name: 'Neeraj', password: '1234' })
      .expect(201)

    const { body } = await appServer
      .get('/auth/whoami')
      .set('Cookie', postRes.get('Set-Cookie'))
      // .send({ email: 'asdf123@test.com', password: '1234' })
      .expect(200)

    expect(body.id).toBeDefined()
    expect(body.email).toBe('asdf123@test.com')
  })
})
