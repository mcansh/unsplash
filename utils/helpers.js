import { parse } from 'somebody';

import { author } from '../package.json';

const { name, email, url } = parse(author);

const twitter = 'loganmcansh';

export { name, email, url, twitter };

export const rel = 'noopener external nofollow';
