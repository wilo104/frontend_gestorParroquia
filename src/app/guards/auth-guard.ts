import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // ✅ El usuario está autenticado
    return true;
  } else {
    // 🚫 No autenticado, redirigir a login
    router.navigate(['/login']);
    return false;
  }
};
