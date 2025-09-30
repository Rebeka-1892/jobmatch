import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput} from '@ionic/angular/standalone';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonInput, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  async signIn() {
    if (!this.email || !this.password) {
      await this.showToast('Veuillez remplir tous les champs');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      await this.showToast('Veuillez entrer un email valide');
      return;
    }

    // Here you would typically call your authentication service
    console.log('Sign in attempt:', { email: this.email, password: this.password });
    
    try {
      // Simulate API call
      await this.simulateLogin();
      
      // Navigate to main app or dashboard
      this.navCtrl.navigateRoot('/dashboard');
      
    } catch (error) {
      await this.showToast('Erreur de connexion. Vérifiez vos identifiants.');
    }
  }

  private async simulateLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful login for demo purposes
        // In real app, replace with actual authentication logic
        if (this.email && this.password.length >= 6) {
          resolve();
        } else {
          reject('Invalid credentials');
        }
      }, 1000);
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
