import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import session from 'express-session'
import { env } from 'process'
import * as ormConfig from '../ormconfig'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReportsModule } from './reports/reports.module'
import { UsersModule } from './users/users.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}` || env.dev
    }),
    ReportsModule,
    UsersModule,
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false
        })
      )
      .forRoutes('*')
  }
}
