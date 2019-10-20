import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

import { getUrl, UrlOptions } from '~/utils/get-unsplash-query';

class PhotoAPI extends RESTDataSource {
  public baseURL = 'https://api.unsplash.com';

  public willSendRequest(request: RequestOptions) {
    const token = this.context.req.headers.authorization;
    request.headers.set(
      'Authorization',
      token || `Client-ID ${process.env.KEY}`
    );
    request.headers.set('Accept-Version', 'v1');
  }

  public getRandomPhotos(args: UrlOptions) {
    const query = getUrl({ ...args, random: true });
    return this.get('/photos/random', query);
  }

  public getPhotoById(photo: { id: string; width?: number; height?: number }) {
    const query = getUrl(photo);
    return this.get(`/photos/${photo.id}`, query);
  }

  public downloadPhoto(photo: { id: string }) {
    return this.get(`/photos/${photo.id}/download`);
  }

  public likePhoto(photo: { id: string }) {
    return this.post(`/photos/${photo.id}/like`);
  }
}

export { PhotoAPI };
