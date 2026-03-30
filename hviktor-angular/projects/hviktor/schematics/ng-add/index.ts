import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

const HVIKTOR_PACKAGE = '@helsevestikt/hviktor-angular';
const HVIKTOR_IMPORT = `@import '${HVIKTOR_PACKAGE}/styles.css';`;
const TAILWIND_IMPORT = `@import 'tailwindcss';`;
const ICONS_IMPORT = `import '@helsevestikt/hviktor-icons';`;

function getStylesPath(tree: Tree, project?: string): string {
  const angularJsonContent = tree.read('/angular.json');
  if (!angularJsonContent) {
    return 'src/styles.css';
  }

  const angularJson = JSON.parse(angularJsonContent.toString('utf-8'));
  const projectName =
    project ?? angularJson.defaultProject ?? Object.keys(angularJson.projects ?? {})[0];
  const projectConfig = angularJson.projects?.[projectName];
  if (!projectConfig) {
    return 'src/styles.css';
  }

  const buildTarget = projectConfig.architect?.build ?? projectConfig.targets?.build;
  const styles: (string | { input: string })[] = buildTarget?.options?.styles ?? [];

  for (const style of styles) {
    const stylePath = typeof style === 'string' ? style : style.input;
    if (
      (stylePath.endsWith('.css') || stylePath.endsWith('.scss')) &&
      !stylePath.startsWith('node_modules/')
    ) {
      return stylePath;
    }
  }

  const sourceRoot = projectConfig.sourceRoot ?? 'src';
  return `${sourceRoot}/styles.css`;
}

function getMainFilePath(tree: Tree, project?: string): string {
  const angularJsonContent = tree.read('/angular.json');
  if (!angularJsonContent) {
    return 'src/main.ts';
  }

  const angularJson = JSON.parse(angularJsonContent.toString('utf-8'));
  const projectName =
    project ?? angularJson.defaultProject ?? Object.keys(angularJson.projects ?? {})[0];
  const projectConfig = angularJson.projects?.[projectName];
  if (!projectConfig) {
    return 'src/main.ts';
  }

  const buildTarget = projectConfig.architect?.build ?? projectConfig.targets?.build;
  return buildTarget?.options?.browser ?? buildTarget?.options?.main ?? 'src/main.ts';
}

function addImportToMainTs(tree: Tree, mainPath: string, importStatement: string): void {
  const content = tree.read(mainPath);
  if (!content) {
    return;
  }

  const text = content.toString('utf-8');
  if (text.includes(importStatement)) {
    return;
  }

  tree.overwrite(mainPath, importStatement + '\n' + text);
}

function addPackageJsonDependency(
  tree: Tree,
  name: string,
  version: string,
  devDependency: boolean,
): void {
  const packageJsonPath = '/package.json';
  const content = tree.read(packageJsonPath);
  if (!content) {
    throw new Error('Fant ikke package.json i prosjektet.');
  }

  const json = JSON.parse(content.toString('utf-8'));
  const key = devDependency ? 'devDependencies' : 'dependencies';

  if (!json[key]) {
    json[key] = {};
  }

  if (json[key][name]) {
    return;
  }

  json[key][name] = version;
  tree.overwrite(packageJsonPath, JSON.stringify(json, null, 2) + '\n');
}

function updateStylesCss(tree: Tree, stylesPath: string, imports: string[]): void {
  const existing = tree.read(stylesPath);
  const content = existing ? existing.toString('utf-8') : '';

  const newImports = imports.filter((imp) => !content.includes(imp));
  if (newImports.length === 0) {
    return;
  }

  const updatedContent = newImports.join('\n') + '\n' + content;
  if (existing) {
    tree.overwrite(stylesPath, updatedContent);
  } else {
    tree.create(stylesPath, updatedContent);
  }
}

function createPostcssConfig(tree: Tree): void {
  const configPath = '/.postcssrc.json';
  if (tree.exists(configPath)) {
    return;
  }

  const config = {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  };
  tree.create(configPath, JSON.stringify(config, null, 2) + '\n');
}

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const styleImports: string[] = [];

    // Conditionally: set up Tailwind CSS
    if (options.tailwind) {
      addPackageJsonDependency(tree, 'tailwindcss', '^4.0.0', true);
      addPackageJsonDependency(tree, '@tailwindcss/postcss', '^4.0.0', true);
      addPackageJsonDependency(tree, 'postcss', '^8.5.0', true);

      createPostcssConfig(tree);

      styleImports.push(TAILWIND_IMPORT);
    }

    // Conditionally: install hviktor-icons and add import to main.ts
    if (options.icons !== false) {
      addPackageJsonDependency(tree, '@helsevestikt/hviktor-icons', 'latest', false);
      const mainPath = getMainFilePath(tree, options.project);
      addImportToMainTs(tree, mainPath, ICONS_IMPORT);
    }

    // Hviktor import always comes after tailwind
    styleImports.push(HVIKTOR_IMPORT);
    const stylesPath = getStylesPath(tree, options.project);
    updateStylesCss(tree, stylesPath, styleImports);

    // Schedule npm install
    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}
