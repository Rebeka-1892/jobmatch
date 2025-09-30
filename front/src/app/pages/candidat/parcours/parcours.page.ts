import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.page.html',
  styleUrls: ['./parcours.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
  // imports: [IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ParcoursPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  svgPaths = {
    backArrow: 'M12.0692 3L3.23752 11.8317C3.10634 11.9629 3.10634 12.1756 3.23752 12.3067L12.0692 21.1385',
    plusIcon: 'M29.5 18.9997C29.5 18.1713 28.8284 17.4997 28 17.4997L23.5 17.4997L23.5 12.9997C23.5 12.1713 22.8284 11.4997 22 11.4997C21.1716 11.4997 20.5 12.1713 20.5 12.9997V17.4997L16 17.4997C15.1716 17.4997 14.5 18.1713 14.5 18.9997C14.5 19.8282 15.1716 20.4997 16 20.4997L20.5 20.4997L20.5 24.9997C20.5 25.8282 21.1716 26.4997 22 26.4997C22.8284 26.4997 23.5 25.8282 23.5 24.9997L23.5 20.4997L28 20.4997C28.8284 20.4997 29.5 19.8282 29.5 18.9997Z'
  };

  onBack() {
    // Handle back navigation
    this.router.navigate(['/previous-page']);
  }

  onAddFormation() {
    // Handle add formation
    console.log('Add formation clicked');
  }

  onContinue() {
    // Handle continue
    console.log('Continue clicked');
  }

}
