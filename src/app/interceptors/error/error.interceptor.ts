import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { catchError, throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast.service';

/**
 * Interceptor to handle errors from HTTP requests.
 * @param req The HTTP request.
 * @param next The next interceptor in the chain.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService); // Inject the toast service

  return next(req).pipe(
    catchError((err: HttpErrorResponse ) => {

      // Gracefully notify message to the user
      toastService.showToast({
        message: err.message.slice(1, 10).concat('...').concat(err.statusText),
        color: 'danger'
      });

      // Re-throw the error to propagate it further
      return throwError(() => new Error('Huh, throwError is also deprecated? They force the other way of doing it.')); 
    })
  );
};
