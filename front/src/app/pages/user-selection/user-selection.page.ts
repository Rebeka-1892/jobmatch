import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

export type UserType = 'entreprise' | 'candidat' | null;

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.page.html',
  styleUrls: ['./user-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, CommonModule, FormsModule]
})
export class UserSelectionPage implements OnInit {

  selectedType: UserType = null;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  selectUserType(type: UserType) {
    this.selectedType = type;
    console.log('Selected user type:', type);
  }

  continue() {
    if (!this.selectedType) {
      return;
    }

    console.log('Continuing with user type:', this.selectedType);
    
    // Navigate based on selected user type
    if (this.selectedType === 'entreprise') {
      // Navigate to company registration/onboarding
      this.navCtrl.navigateForward('/company-registration');
    } else if (this.selectedType === 'candidat') {
      // Navigate to candidate registration/onboarding
      this.navCtrl.navigateForward('/info');
    }
  }

}
