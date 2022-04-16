// import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response';
import { of } from 'rxjs';
import { asyncError } from './observable-testing-helpers';
import { InMemoryStorageFake } from './in-memory-storage-fake';
import { AuthCredentials } from '../models/auth-credentials';
import * as moment from 'moment';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;
  let storageFake: InMemoryStorageFake;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    storageFake = new InMemoryStorageFake();
    service = new AuthService(storageFake, httpClientSpy);
  });

  afterEach(() => {
    storageFake.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Login', () => {
    describe('When the server response is successful', () => {
      describe('When the server response contains a JWT', () => {
        let expectedToken: string;
        let authCredentials: AuthCredentials;
        let expectedResponse: AuthResponse;

        beforeEach(() => {
          expectedToken = 'fake-jwt-token';
          authCredentials = { username: 'username', password: 'password' };
          expectedResponse = new AuthResponse(expectedToken, '10');
          httpClientSpy.post.and.returnValue(of(expectedResponse));
        });

        it('login should be successful', () => {
          service.login(authCredentials).subscribe((result) => {
            expect(result).withContext('expected auth response').toEqual(true);
          });
        });

        it('login should make one post call to the login endpoint', () => {
          service.login(authCredentials).subscribe((result) => {});
          expect(httpClientSpy.post.calls.count())
            .withContext('one call')
            .toBe(1);
        });

        it('should store the token', () => {
          service.login(authCredentials).subscribe((result) => {
            expect(storageFake.values.get('id_token')).toEqual(expectedToken);
          });
        });

        it('should store the expiration date', () => {
          let fakeTime = new Date(2000, 3, 28, 16, 0, 0, 0);
          let expectedMoment = moment([2000, 3, 28, 16, 10]);
          let expected = JSON.stringify(expectedMoment.valueOf());
          jasmine.clock().mockDate(fakeTime);

          service.login(authCredentials).subscribe((result) => {
            expect(storageFake.values.get('expires_at')).toEqual(expected);
          });
        });
      });
      describe('When the server response does not contains a JWT', () => {
        it('login should fail', () => {
          let authCredentials = { username: 'username', password: 'password' };
          let expectedResponse = { expiresIn: '10s' };
          httpClientSpy.post.and.returnValue(of(expectedResponse));

          service.login(authCredentials).subscribe((result) => {
            expect(result).withContext('expected auth response').toEqual(false);
          });

          expect(httpClientSpy.post.calls.count())
            .withContext('one call')
            .toBe(1);
        });
      });
    });

    describe('When the server response fails', () => {
      it('login should fail', (done: DoneFn) => {
        let authCredentials = { username: 'username', password: 'password' };
        const errorResponse = new HttpErrorResponse({
          error: 'test 404 error',
          status: 404,
          statusText: 'Not Found',
        });

        httpClientSpy.post.and.returnValue(asyncError(errorResponse));

        service.login(authCredentials).subscribe({
          next: (loginResult) =>
            done.fail('expected an error not a login result'),
          error: (error) => {
            expect(error.message).toContain('404 Not Found');
            done();
          },
        });

        expect(httpClientSpy.post.calls.count())
          .withContext('one call')
          .toBe(1);
      });
    });
  });
  describe('Logout', () => {
    it('should remove the token from the storage', () => {
      storageFake.setItem('id_token', 'fake-test-token');
      service.logout();
      expect(storageFake.getItem('id_token')).toEqual(null);
    });

    it('should remove the expiration time from the storage', () => {
      storageFake.setItem('expires_at', '10m');
      service.logout();
      expect(storageFake.getItem('expires_at')).toEqual(null);
    });
  });
  describe('Checking the login status', () => {
    beforeEach(() => {
      storageFake.setItem('expires_at', '10m');
    });

    it('should be logged in if token has not expired', () => {
      let date = new Date(2000, 3, 28, 16, 0, 0, 0);
      let lessThan10MinsLater = new Date(2000, 3, 28, 16, 9, 0, 0);

      // Mock the expiration date
      jasmine.clock().mockDate(date);
      const expiresAt = moment().add('10', 'minutes');
      storageFake.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

      jasmine.clock().mockDate(lessThan10MinsLater);
      expect(service.loggedIn()).toEqual(true);
    });

    it('should not be logged in if token has expired', () => {
      let date = new Date(2000, 3, 28, 16, 0, 0, 0);
      let tenMinsLater = new Date(2000, 3, 28, 16, 10, 0, 0);
      let moreThan10MinsLater = new Date(2000, 3, 28, 16, 10, 0, 1);

      // Mock the expiration date
      jasmine.clock().mockDate(date);
      const expiresAt = moment().add('10', 'minutes');
      storageFake.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

      // Mock the current time
      jasmine.clock().mockDate(tenMinsLater);
      expect(service.loggedIn()).toEqual(false);

      jasmine.clock().mockDate(moreThan10MinsLater);
      expect(service.loggedIn()).toEqual(false);
    });
  });
  describe('Retrieving the auth token', () => {
    it('should retrieve the stored value', () => {
      storageFake.setItem('id_token', 'fake-test-token');
      expect(storageFake.getItem('id_token')).toEqual('fake-test-token');
    });

    it('should return null if not has been stored', () => {
      expect(storageFake.getItem('id_token')).toEqual(null);
    });
  });
});
