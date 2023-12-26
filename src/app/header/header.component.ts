import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuth = false;

  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeData();
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
