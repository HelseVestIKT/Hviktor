import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_components/header/header.component';
import { DropdownComponent } from './_components/prime-components/dropdown/dropdown.component';
import { DialogComponent } from './_components/prime-components/dialog/dialog.component';
import { TableComponent } from './_components/prime-components/table/table.component';
import { MultiselectComponent } from './_components/prime-components/multiselect/multiselect.component';
import { AccordionComponent } from './_components/prime-components/accordion/accordion.component';
import { CheckboxComponent } from './_components/prime-components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './_components/prime-components/radiobutton/radiobutton.component';
import { ChipComponent } from './_components/prime-components/chip/chip.component';

//PRIME
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { providePrimeNG } from 'primeng/config';
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
