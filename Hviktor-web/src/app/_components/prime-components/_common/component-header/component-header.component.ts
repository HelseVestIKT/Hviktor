import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-component-header',
  standalone: true,
  imports: [DividerModule],
  templateUrl: './component-header.component.html',
  styleUrl: './component-header.component.scss',
})
export class ComponentHeaderComponent {
  @Input() title: string | undefined;
  @Input() primengPath: string | undefined;
  @Input() codePath: string | undefined;

  get primengUrl(): string {
    return `https://v18.primeng.org/${this.primengPath}`;
  }

  get repoUrl(): string {
    return `https://github.com/HelseVestIKT/Hviktor/tree/main/Hviktor-web/src/app/_components/prime-components/${this.codePath}`;
  }
}
