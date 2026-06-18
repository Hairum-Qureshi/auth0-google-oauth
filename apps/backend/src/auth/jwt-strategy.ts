import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Payload } from 'src/types';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>('AUTH0_ISSUER')}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: configService.get<string>('AUTH0_ISSUER'),
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Payload) {
    const bearerToken = req.headers['authorization'];
    const userProfileURL = payload.aud[1];

    const userProfileData = await firstValueFrom(
      this.httpService.post(userProfileURL, null, {
        headers: {
          Authorization: `${bearerToken}`,
        },
      }),
    );

    const {
      given_name,
      family_name,
      nickname,
      name,
      picture,
      updated_at,
      email,
      email_verified,
      sub,
    } = userProfileData.data;

    return {
      firstName: given_name,
      lastName: family_name,
      nickname,
      fullName: name,
      profilePicture: picture,
      updatedAt: updated_at,
      email,
      emailVerified: email_verified,
      userID: sub.replace('google-oauth2|', ''),
    };
  }
}
