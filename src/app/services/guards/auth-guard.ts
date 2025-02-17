import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { GuardService } from "./guard.service";


function checkAuthStatus ():boolean | Observable<boolean>{
    const guardService = inject(GuardService);
    const router = inject(Router);
    return guardService.getToken().pipe(
        tap(isAuthenticated =>{
            if(!isAuthenticated) router.navigate(['/home']);
        }),
    )
}

export const AuthGuard = ()=>{
    return checkAuthStatus();
}