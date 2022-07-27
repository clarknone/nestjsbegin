import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import JWTConfig from 'src/config/jwt.conf';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTConfig.secret,
    });
  }
  async validate(data: any) {
    // console.log(data);
    return data;
  }

  // async validate(payload: any) {
  //   return { userId: payload.id, username: payload.username };
  // }
}
