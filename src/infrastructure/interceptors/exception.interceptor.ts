import {
  ConflictException,
  ExceptionBase,
  NotFoundException,
} from '@libs/exceptions';
import {
  CallHandler,
  // To avoid confusion between internal app exceptions and NestJS exceptions
  ConflictException as NestConflictException,
  ExecutionContext,
  NestInterceptor,
  NotFoundException as NestNotFoundException,
} from '@nestjs/common';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
      _context: ExecutionContext,
      next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
        catchError((err) => {
        /**
         * Custom exceptions are converted to nest.js exceptions.
         * This way we are not tied to a framework or HTTP protocol.
         */
          if (err instanceof NotFoundException) {
            throw new NestNotFoundException(err.message);
          }
          if (err instanceof ConflictException) {
            throw new NestConflictException(err.message);
          }
          return throwError(err);
        }),
    );
  }
}
