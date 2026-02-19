import { bootstrapApplication } from '@angular/platform-browser';
import { registerIcons } from './lib/register-icons';

bootstrapApplication(class {}).then(() => {
  registerIcons();
});
