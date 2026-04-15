import { Component } from '@angular/core';
import { HviAlert, HviHeading, HviLink, HviParagraph, HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-mcp-setup',
  standalone: true,
  imports: [HviAlert, HviHeading, HviLink, HviParagraph, HviTag],
  templateUrl: './mcp-setup.html',
})
export class McpSetup {}
