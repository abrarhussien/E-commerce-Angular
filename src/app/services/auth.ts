import { Injectable, signal } from '@angular/core';
import { UserInterFace } from '../models/userInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<UserInterFace | undefined | null>(undefined);
}
