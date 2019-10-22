import { format } from 'url';

import { NextApiRequest } from 'next';
import { getBaseURL } from '@mcansh/next-now-base-url';
import fetch from 'node-fetch';

import { cookies, NextApiResponseWithCookie } from '../../utils/cookies';

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  created_at: number;
}

const auth = async (req: NextApiRequest, res: NextApiResponseWithCookie) => {
  const { code } = req.query;
  if (!code) {
    res.writeHead(302, {
      Location: '/',
    });
    return res.end();
  }

  const base = getBaseURL(req);

  const url = format({
    protocol: 'https',
    hostname: 'unsplash.com',
    pathname: '/oauth/token',
    query: {
      client_id: process.env.UNSPLASH_KEY,
      client_secret: process.env.UNSPLASH_SECRET,
      redirect_uri: `${base}${req.url}`,
      grant_type: 'authorization_code',
      code,
    },
  });

  try {
    const promise = await fetch(url, { method: 'post' });
    const data: AccessTokenResponse = await promise.json();

    if (promise.status !== 200) {
      res.status(promise.status);
      res.end();
    }

    if (data.access_token) {
      res.cookie('jid', data.access_token, {
        sameSite: true,
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 1 month
      });

      res.writeHead(302, {
        Location: '/',
      });

      return res.end();
    }

    throw new Error(`Invalid Request`);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default cookies(auth);
