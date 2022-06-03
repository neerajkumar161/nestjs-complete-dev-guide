import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import session from 'express-session'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false
    })
  )
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // whitelist will cut out all extra keys in a body
  await app.listen(3000)
}
bootstrap()
