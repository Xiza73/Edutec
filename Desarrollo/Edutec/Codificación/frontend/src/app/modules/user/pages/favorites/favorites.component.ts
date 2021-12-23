import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientService } from 'src/app/data/services/client.service';
import { Client } from 'src/app/data/types/client';
import { Course } from 'src/app/data/types/course';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public user: Client = {};
  public favorites: Course[] = [];

  constructor(
    private tokenService: TokenService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    const userId = this.tokenService.getClientIdFromToken();
    if (userId) {
      this.clientService.readClient(userId)
        .pipe(
          switchMap(response => {
            this.user = response.data;
            return this.clientService.readFavorites(this.user._id!);
          })
        )
        .subscribe(response => {
          this.favorites = response.data;
        });
    }
  }

}
