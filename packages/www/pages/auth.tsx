import { ServerResponse } from 'http';
import { format } from 'url';
import React from 'react';
import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { setCookie } from 'nookies';

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  created_at: number;
}

const redirect = (
  res: ServerResponse | undefined,
  type: number,
  page: string,
  as: string = page,
  options: { replace?: boolean } = { replace: false }
) => {
  if (res) {
    res.writeHead(type, {
      Location: as,
    });
    res.end();
  } else if (options.replace) {
    Router.replace(page, as);
  } else {
    Router.push(page, as);
  }
};

class AuthPage extends React.Component<{ data: any }> {
  static getInitialProps = async (ctx: NextPageContext) => {
    const { query, res } = ctx;

    if (!query.code) {
      return redirect(res, 302, '/');
    }

    const url = format({
      protocol: 'https',
      hostname: 'unsplash.com/oauth/token',
      query: {
        client_id: process.env.KEY,
        client_secret: process.env.SECRET,
        redirect_uri: 'http://localhost:4000/auth',
        code: query.code,
        grant_type: 'authorization_code',
      },
    });

    const promise = await fetch(url, { method: 'POST' });

    const data: AccessTokenResponse = await promise.json();

    if (data.access_token) {
      setCookie(ctx, 'access_token', data.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 1 month
      });
    }

    return redirect(res, 302, '/');
  };

  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

export default AuthPage;
