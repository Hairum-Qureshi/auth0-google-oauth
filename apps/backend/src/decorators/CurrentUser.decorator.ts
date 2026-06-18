import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import axios from 'axios';

export const CurrentUser = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'] || '';
    const payload = request.user;
    const userProfileURL = payload.aud[1];
    const userProfileData = await axios.get(userProfileURL, {
      headers: {
        Authorization: `${bearerToken}`,
      },
    });

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
  },
);
