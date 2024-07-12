import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Interceptor to add the API key to the request
 * @param req The request to intercept
 * @param next The next interceptor in the chain
 * @returns The response from the next interceptor
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const KEYS: {
    [key: string]: string;
  } = environment.api.servers.primary.keys; // All the keys for the primary server

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
