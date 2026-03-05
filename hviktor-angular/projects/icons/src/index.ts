import { bootstrapApplication } from '@angular/platform-browser';
import { registerIconsAsCustomElements } from './lib/register-elements';

bootstrapApplication(class {}).then(() => {
  registerIconsAsCustomElements();
});
