import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse, NextApiRequest } from 'next';

export interface NextApiResponseWithCookie extends NextApiResponse {
  cookie: (name: string, value: any, options: CookieSerializeOptions) => void;
}

// This sets `cookie` on `res` object
const cookie = (
  res: NextApiResponse,
  name: string,
  value: any,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

// Adds `cookie` function on `res.cookie` to set cookies for response
const cookies = (
  handler: (req: NextApiRequest, res: NextApiResponseWithCookie) => any
) => (req: NextApiRequest, res: NextApiResponseWithCookie) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

export { cookies };
