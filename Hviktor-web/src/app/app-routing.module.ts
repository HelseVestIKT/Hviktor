import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoursComponent } from './_components/colours/colours.component';
import { HomeComponent } from './_components/home/home.component';
import { TabsComponent } from './_components/prime-components/tabs/tabs.component';
import { TypographyComponent } from './_components/typography/typography.component';
import { ButtonsComponent } from './_components/prime-components/buttons/buttons.component';
import { MenubarComponent } from './_components/prime-components/menubar/menubar.component';
import { AccordionComponent } from './_components/prime-components/accordion/accordion.component';
import { DialogComponent } from './_components/prime-components/dialog/dialog.component';
import { DropdownComponent } from './_components/prime-components/dropdown/dropdown.component';
import { MultiselectComponent } from './_components/prime-components/multiselect/multiselect.component';
import { TableComponent } from './_components/prime-components/table/table.component';
import { IconsComponent } from './_components/icons/icons.component';
import { VariablesComponent } from './_components/variables/variables.component';
import { CheckboxComponent } from './_components/prime-components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './_components/prime-components/radiobutton/radiobutton.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'colours', pathMatch: 'full', component: ColoursComponent },
  { path: 'typography', pathMatch: 'full', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'variables', component: VariablesComponent },

  { path: 'components/accordion', pathMatch: 'full', component: AccordionComponent },
  { path: 'components/buttons', component: ButtonsComponent },
  { path: 'components/checkbox', component: CheckboxComponent },
  { path: 'components/dialog', component: DialogComponent },
  { path: 'components/dropdown', component: DropdownComponent },
  { path: 'components/menubar', component: MenubarComponent },
  { path: 'components/multiselect', component: MultiselectComponent },
  { path: 'components/radiobutton', component: RadiobuttonComponent },
  { path: 'components/table', component: TableComponent },  
  { path: 'components/tabs', component: TabsComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
