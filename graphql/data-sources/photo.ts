import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

import { getUrl, UrlOptions } from '~/utils/get-unsplash-query';

class PhotoAPI extends RESTDataSource {
  public baseURL = 'https://api.unsplash.com';

  public willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Client-ID ${process.env.KEY}`);
  }

  public getRandomPhotos(args: UrlOptions) {
    const query = getUrl({ ...args, random: true });
    return this.get('/photos/random', query);
  }

  public getPhotoById(args: any) {
    const query = getUrl(args);
    return this.get(`/photos/${args.id}`, query);
  }
}

export { PhotoAPI };
