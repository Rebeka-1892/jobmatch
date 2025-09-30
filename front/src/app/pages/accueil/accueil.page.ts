import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, CommonModule, FormsModule]
})
export class AccueilPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }
  
  ngOnInit() {}

  signIn() {
    this.navCtrl.navigateForward('/login');
  }

  signUp() {
    this.navCtrl.navigateForward('/user-selection');
  }

}
