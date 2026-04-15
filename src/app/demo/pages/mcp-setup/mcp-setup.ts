import { Component } from '@angular/core';
import { HviHeading, HviLink, HviParagraph, HviTag } from '@helsevestikt/hviktor';

@Component({
  selector: 'app-mcp-setup',
  imports: [HviHeading, HviLink, HviParagraph, HviTag],
  templateUrl: './mcp-setup.html',
})
export class McpSetup {}
