import { Component } from '@angular/core';
import { MainHeroComponent } from '../../features/main-hero/main-hero.component';
import { FeaturesComponent } from '../../features/features/features.component';
import { PricingComponent } from '../../features/pricing/pricing.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainHeroComponent,
    FeaturesComponent,
    PricingComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomePageComponent {}
