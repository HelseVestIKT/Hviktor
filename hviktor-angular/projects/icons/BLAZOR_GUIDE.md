# Hviktor Icons - Blazor Integration Guide

## Quick Setup for Blazor Projects

### 1. Install Dependencies

In your Blazor project root, install the package:

```bash
npm install @helsevestikt/hviktor-icons
```

### 2. Copy the Bundle

Copy the Web Components bundle to your `wwwroot` folder:

```powershell
# Option A: Manual copy
Copy-Item "node_modules/@helsevestikt/hviktor-icons/bundles/hviktor-icons.js" -Destination "wwwroot/js/" -Force

# Option B: Add to your .csproj
```

Add this to your `.csproj` file to automate copying:

```xml
<Target Name="CopyIconsBundle" AfterTargets="Build">
  <Copy SourceFiles="$(MSBuildProjectDirectory)\node_modules\@helsevestikt\hviktor-icons\bundles\hviktor-icons.js"
        DestinationFolder="$(MSBuildProjectDirectory)\wwwroot\js"
        SkipUnchangedFiles="true" />
</Target>
```

### 3. Register in Your Layout

Add to `_Host.cshtml`, `_Layout.cshtml`, or `index.html`:

```html
<!-- Before closing </body> tag -->
<script src="~/js/hviktor-icons.js"></script>
<script>
  // Initialize Web Components
  if (window.HvictorIcons) {
    HvictorIcons.register();
  }
</script>
```

### 4. Use in Razor Components

```razor
@page "/dashboard"

<PageTitle>Dashboard</PageTitle>

<div class="header">
  <hvi-icon-home size="lg"></hvi-icon-home>
  <h1>Dashboard</h1>
</div>

<div class="user-profile">
  <hvi-icon-user size="md"></hvi-icon-user>
  <span>User Profile</span>
</div>

<style>
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  hvi-icon-home {
    color: #0078d4;
  }

  hvi-icon-user {
    color: #107c10;
  }
</style>
```

## Available Icons

All icons support three sizes: `sm` (16px), `md` (24px), `lg` (32px)

- `<hvi-icon-user size="md"></hvi-icon-user>`
- `<hvi-icon-home size="lg"></hvi-icon-home>`

## Styling Icons

Icons use `currentColor` for the fill, so they inherit the text color:

```html
<style>
  /* Change color */
  hvi-icon-user {
    color: #ff0000;
  }

  /* Add hover effects */
  hvi-icon-home:hover {
    color: #0078d4;
    cursor: pointer;
  }

  /* Responsive sizing */
  @media (max-width: 768px) {
    hvi-icon-user {
      color: #666;
    }
  }
</style>
```

## TypeScript Support (for .razor.cs files)

If you need to interact with the icons via JavaScript Interop:

```csharp
@inject IJSRuntime JS

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // Ensure icons are registered
            await JS.InvokeVoidAsync("HvictorIcons.register");
        }
    }
}
```

## Troubleshooting

### Icons Not Showing

1. Check browser console for errors
2. Verify the bundle is loaded: check Network tab for `hviktor-icons.js`
3. Ensure `HvictorIcons.register()` is called after the script loads
4. Check that the icon tags match exactly (case-sensitive)

### Styling Not Working

1. Icons use Shadow DOM, so some CSS may not penetrate
2. Use CSS custom properties or style the host element directly
3. The `color` property affects the icon fill

### Build Issues

If icons don't appear after deployment:

1. Ensure the bundle is included in publish output
2. Check the script path matches your hosting setup
3. Verify Content Security Policy allows the script

## Example: Complete Blazor Integration

```razor
@page "/"
@inject IJSRuntime JS

<PageTitle>Home</PageTitle>

<div class="welcome-section">
    <hvi-icon-home size="lg"></hvi-icon-home>
    <h1>Welcome to Hviktor</h1>
</div>

<div class="features">
    <div class="feature-card" @onclick="NavigateToProfile">
        <hvi-icon-user size="md"></hvi-icon-user>
        <span>User Management</span>
    </div>
</div>

@code {
    private async Task NavigateToProfile()
    {
        // Your navigation logic
        await Task.CompletedTask;
    }
}

<style>
    .welcome-section {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        padding: 2rem;
    }

    .feature-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .feature-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }

    hvi-icon-user {
        color: #0078d4;
    }
</style>
```
