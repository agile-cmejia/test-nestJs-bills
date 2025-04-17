export class Options {
  method?: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  body?: string;
  headers?: any;

  constructor(method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE', headers?: object, body?: string) {
    this.body = body;
    this.headers = headers;
    this.method = method;
  }
}
