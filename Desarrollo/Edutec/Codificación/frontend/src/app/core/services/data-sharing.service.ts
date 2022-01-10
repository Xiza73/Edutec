import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientService } from 'src/app/data/services/client.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private tokenService: TokenService,
    private clientService: ClientService
  ) { 
    if (this.tokenService.isValidToken() && this.tokenService.getIdFromToken()) {
      const id = this.tokenService.getIdFromToken()!;
      this.clientService.getUserProfile(id).subscribe(
        response => {
          const { username } = response.body.data
          this.username.next(username);
        }
      );
    }
  }
}
