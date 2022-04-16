import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnauthenticableUrls {
  urls: string[] = ['http://localhost:3000/login'];
}
