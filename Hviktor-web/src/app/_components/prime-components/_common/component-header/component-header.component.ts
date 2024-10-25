import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-header',
  standalone: true,
  imports: [],
  templateUrl: './component-header.component.html',
  styleUrl: './component-header.component.scss'
})
export class ComponentHeaderComponent {
  @Input() title: string | undefined;
  @Input() primengPath: string | undefined;
  @Input() codePath: string | undefined;

  get primengUrl(): string {
    return `https://primeng.org/${this.primengPath}`;
  }

  get repoUrl(): string {
    return `https://dev.azure.com/hvikt-utv/_git/Hviktor?path=/Hviktor-web/src/app/_components/prime-components/${this.codePath}`;
  }

}
