import { parse } from 'somebody';
import { author } from '../package.json';

const { name, email, url } = parse(author);

const twitter = 'loganmcansh';

const rel = 'noopener external nofollow';

export { name, email, url, twitter, rel };
