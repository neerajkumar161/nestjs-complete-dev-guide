import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Authguad is running')
    const request = context.switchToHttp().getRequest()
    return request.session.userId
  }
}
