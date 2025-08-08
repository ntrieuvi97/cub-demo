import { Browser, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
  browser?: Browser;
  page?: Page;
  homePage?: HomePage;

  constructor(options: IWorldOptions) {
    // Optionally initialize values here
  }
}

setWorldConstructor(CustomWorld);
