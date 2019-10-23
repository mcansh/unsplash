import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class UserAPI extends RESTDataSource {
  public baseURL = 'https://api.unsplash.com';

  public willSendRequest(request: RequestOptions) {
    const token = this.context.req.headers.authorization;
    if (!token) {
      throw new Error('Not Authenticated');
    }
    request.headers.set('Authorization', token);
    request.headers.set('Accept-Version', 'v1');
  }

  public getCurrentUser() {
    return this.get('/me');
  }
}

export { UserAPI };
