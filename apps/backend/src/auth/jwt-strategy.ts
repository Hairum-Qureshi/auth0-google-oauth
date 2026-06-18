import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksRsa from 'jwks-rsa';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly httpService: HttpService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: { id: string; sub: string }) {
    const { id } = payload;
    // const user = await this.userModel.findById(id).exec();
    // if (!user) {
    //   throw new UnauthorizedException('Please log in first');
    // }
    // return user;
  }
}
