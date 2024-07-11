import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const KEYS: {
    [key: string]: string;
  } = environment.api.servers.primary.keys;

  const url = req.url;

  // Check if the request is going to the primary server
  if (url.startsWith(environment.api.servers.primary.url)) {

    // Find the targeted endpoint
    const endPoint = Object.keys(KEYS).filter((endpoint) => url.includes(endpoint))[0] || "";

    // Add the key to the request
    const authReq = req.clone({
      setParams: { 
        ['appid']: KEYS[endPoint]
      }
    });

    return next(authReq);
  }

  return next(req);
};
