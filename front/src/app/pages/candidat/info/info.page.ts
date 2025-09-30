import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { NavController, ActionSheetController, ToastController } from '@ionic/angular';

interface PersonalInfo {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, IonLabel, IonIcon, CommonModule, FormsModule]
})
export class InfoPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  personalInfo: PersonalInfo = {
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    country: '',
    city: ''
  };

  profilePhoto: string | null = null;

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sélectionner une photo',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'images',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  openCamera() {
    // In a real app, you would use Capacitor Camera plugin
    console.log('Opening camera...');
    this.showToast('Fonctionnalité camera à implémenter');
  }

  openGallery() {
    // Trigger the hidden file input
    this.fileInput.nativeElement.click();
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async continue() {
    // Validate required fields
    if (!this.personalInfo.name.trim()) {
      await this.showToast('Veuillez saisir votre nom');
      return;
    }

    if (!this.personalInfo.email.trim()) {
      await this.showToast('Veuillez saisir votre email');
      return;
    }

    if (!this.personalInfo.password.trim()) {
      await this.showToast('Veuillez saisir votre mot de passe');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.personalInfo.email)) {
      await this.showToast('Veuillez entrer un email valide');
      return;
    }

    // Validate password length
    if (this.personalInfo.password.length < 6) {
      await this.showToast('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    console.log('Personal info form data:', this.personalInfo);
    console.log('Profile photo:', this.profilePhoto);

    // Navigate to next step
    this.navCtrl.navigateForward('/next-step', {
      state: {
        personalInfo: this.personalInfo,
        profilePhoto: this.profilePhoto
      }
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

}
