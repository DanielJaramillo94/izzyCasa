import { FirebaseService } from './../firebase/firebase.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getBearerToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const decodedToken = await this.firebaseService.getDecodedToken(token);
    if (decodedToken == null) {
      throw new UnauthorizedException();
    }
    const firebaseUID = decodedToken.uid;
    const dbUser = await this.userService.getUserIdByFirebaseUId(firebaseUID);
    request.issuer = dbUser;
    return true;
  }

  private getBearerToken(request: { headers: any }): string | undefined {
    const token: string = request.headers.authorization;
    if (!token) {
      return undefined;
    }
    if (!token.startsWith('Bearer ')) {
      return undefined;
    }
    return token.replace('Bearer ', '');
  }
}
