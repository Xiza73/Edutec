import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdminService } from 'src/app/data/services/admin.service';
import { ClientService } from 'src/app/data/services/client.service';
import { RoleService } from 'src/app/data/services/role.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private tokenService: TokenService,
    private clientService: ClientService,
    private adminService: AdminService,
    private roleService: RoleService
  ) { 
    if (this.tokenService.isValidToken() && this.tokenService.getIdFromToken()) {
      const rolId = this.tokenService.getRoleIdFromToken()!;
      const id = this.tokenService.getIdFromToken()!;

      this.roleService.readRole(rolId)
        .pipe(
          switchMap(response => {
            const role = response.data.description;
            if (role === 'client') {
              return this.clientService.getUserProfile(id);
            }
            return this.adminService.getUserProfile(id);
          })
        )
        .subscribe(
          response => {
            const { username } = response.body.data;
            this.username.next(username);
          }
        );
    }
  }
}
