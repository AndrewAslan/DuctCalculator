# Replit Embedding Guide for PragmaticPE HVAC Calculator

## Simple Replit Embedding Method

Since your HVAC calculator is built on Replit, you can use Replit's built-in embedding feature which is much simpler than hosting separately.

## Your Replit Embed URL

Your current Replit app URL with embed parameter:
```
https://[YOUR-REPLIT-URL]?embed=true
```

## Exact Squarespace Code

Copy and paste this code into a **Code Block** in Squarespace:

```html
<div style="width: 100%; margin: 20px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <iframe 
    src="https://[YOUR-REPLIT-URL]?embed=true"
    width="100%" 
    height="900"
    frameborder="0"
    style="border: none; display: block; min-height: 900px;"
    title="PragmaticPE HVAC Calculator">
    <p>Loading calculator... <a href="https://[YOUR-REPLIT-URL]" target="_blank">Open in new tab</a></p>
  </iframe>
</div>

<style>
@media (max-width: 768px) {
  iframe {
    height: 700px !important;
    min-height: 700px !important;
  }
}
</style>
```

## Step-by-Step Implementation

### Step 1: Get Your Replit URL
1. **Copy your Replit app URL** from the address bar
2. **Add** `?embed=true` to the end
3. **Example:** `https://replit.com/@username/project-name?embed=true`

### Step 2: Add to Squarespace
1. **Edit your Squarespace page**
2. **Click "+"** to add content
3. **Search "Code"** and select **Code Block**
4. **Paste the iframe code** above
5. **Replace** `[YOUR-REPLIT-URL]` with your actual Replit URL
6. **Save the page**

### Step 3: Test
1. **Preview your page**
2. **Verify calculator loads** with PragmaticPE branding
3. **Test all functionality** (inputs, charts, PDF export)

## Benefits of Replit Embedding

✓ **No separate hosting required** - Replit handles everything
✓ **Always up-to-date** - Changes deploy automatically
✓ **Built-in HTTPS** - Secure by default
✓ **Optimized for embedding** - Clean layout without Replit UI
✓ **Fast loading** - CDN-backed delivery

## Alternative Embed Sizes

### Compact Version (for sidebar):
```html
<iframe 
  src="https://[YOUR-REPLIT-URL]?embed=true"
  width="100%" 
  height="600"
  frameborder="0"
  style="border: none;">
</iframe>
```

### Full-Width Version:
```html
<div style="width: 100vw; margin-left: calc(-50vw + 50%); padding: 20px 0;">
  <iframe 
    src="https://[YOUR-REPLIT-URL]?embed=true"
    width="100%" 
    height="900"
    style="border: none; max-width: 1200px; margin: 0 auto; display: block;">
  </iframe>
</div>
```

## Troubleshooting

### If calculator doesn't load:
- **Check your Replit URL** is correct
- **Ensure** `?embed=true` is added
- **Verify** your Replit is public (not private)

### If iframe is cut off:
- **Increase height** to 1000px or higher
- **Check mobile responsiveness** on actual devices

### Squarespace-specific issues:
- **Code blocks require** Business plan or higher (not Personal)
- **Try Embed block** as alternative if Code block doesn't work

## Final Implementation

Replace `[YOUR-REPLIT-URL]` with your actual Replit URL in this final code:

```html
<div style="width: 100%; margin: 20px 0; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <iframe 
    src="[YOUR-REPLIT-URL]?embed=true"
    width="100%" 
    height="900"
    frameborder="0"
    style="border: none; display: block; min-height: 900px;"
    title="PragmaticPE HVAC Calculator">
  </iframe>
</div>
```

This method is significantly simpler than separate hosting and automatically stays updated with any changes you make to the calculator.