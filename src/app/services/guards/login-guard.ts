import { map, Observable, tap } from "rxjs";
import { GuardService } from "./guard.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

function checkAuthStatus ():boolean | Observable<boolean>{
    const guardService = inject(GuardService);
    const router = inject(Router);
    return guardService.getToken().pipe(
        tap(isAuthenticated =>{
            if(isAuthenticated) router.navigate(['dashboard']);
        }),
        map(isAuthenticated => !isAuthenticated)
    )
}

export const LoginGuard = ()=>{
    return checkAuthStatus();
}