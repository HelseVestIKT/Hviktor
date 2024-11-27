import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HeaderComponent } from './_components/header/header.component';
import { AccordionComponent } from './_components/prime-components/accordion/accordion.component';
import { CheckboxComponent } from './_components/prime-components/checkbox/checkbox.component';
import { ChipComponent } from './_components/prime-components/chip/chip.component';
import { DialogComponent } from './_components/prime-components/dialog/dialog.component';
import { DropdownComponent } from './_components/prime-components/dropdown/dropdown.component';
import { MultiselectComponent } from './_components/prime-components/multiselect/multiselect.component';
import { RadiobuttonComponent } from './_components/prime-components/radiobutton/radiobutton.component';
import { TableComponent } from './_components/prime-components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//PRIME
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { providePrimeNG } from 'primeng/config';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { Hviktor } from 'src/theme/hviktor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    DialogComponent,
    TableComponent,
    MultiselectComponent,
    AccordionComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    ChipComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    DividerModule,
    MultiSelectModule,
    DropdownModule,
    MenubarModule,
    TableModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    TabViewModule,
    AccordionModule,
    CardModule,
    CheckboxModule,
    RadioButtonModule,
    ChipModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Hviktor,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, hviktor-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
  ],
})
export class AppModule {}
