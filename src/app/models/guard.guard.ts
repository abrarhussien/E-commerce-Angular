import { CanActivateFn } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  // if(localStorage.getItem("role")=="admin"){
  return true;
};
