# Squarespace iframe Integration - Step by Step

## STEP 1: Host the Calculator File

### Option A: Upload to Your Own Server
1. **Upload** `squarespace-integration/hvac-calculator-iframe.html` to your web hosting
2. **Example URL**: `https://yourwebsite.com/hvac-calculator.html`

### Option B: Use GitHub Pages (Free)
1. **Create GitHub account** (if you don't have one)
2. **Create new repository** called "hvac-calculator"
3. **Upload** `hvac-calculator-iframe.html` to the repository
4. **Rename it** to `index.html`
5. **Go to** Settings → Pages
6. **Enable** GitHub Pages
7. **Your URL** will be: `https://yourusername.github.io/hvac-calculator/`

### Option C: Use Netlify (Free)
1. **Go to** netlify.com
2. **Drag and drop** the `hvac-calculator-iframe.html` file
3. **Rename it** to `index.html` if prompted
4. **Get your URL**: `https://random-name.netlify.app/`

## STEP 2: Add iframe to Squarespace

### Method 1: Code Block (Recommended)
1. **Edit your Squarespace page**
2. **Click the "+" to add content**
3. **Search for "Code"** and select **"Code Block"**
4. **Paste this code:**

```html
<iframe 
  src="https://your-calculator-url.com/hvac-calculator.html" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; border-radius: 8px;">
</iframe>
```

5. **Replace** `https://your-calculator-url.com/hvac-calculator.html` with your actual URL
6. **Save the page**

### Method 2: Embed Block
1. **Edit your Squarespace page**
2. **Click the "+" to add content**
3. **Search for "Embed"** and select **"Embed Block"**
4. **Paste your calculator URL** directly
5. **Squarespace will create an iframe automatically**

## STEP 3: Customize iframe Size

### Responsive iframe (Recommended)
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%; overflow: hidden;">
  <iframe 
    src="https://your-calculator-url.com/hvac-calculator.html"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0">
  </iframe>
</div>
```

### Fixed Height iframe
```html
<iframe 
  src="https://your-calculator-url.com/hvac-calculator.html" 
  width="100%" 
  height="900" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### Mobile-Optimized iframe
```html
<iframe 
  src="https://your-calculator-url.com/hvac-calculator.html" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; max-width: 100%;">
</iframe>

<style>
@media (max-width: 768px) {
  iframe {
    height: 600px !important;
  }
}
</style>
```

## STEP 4: Test on Squarespace

1. **Save your page**
2. **Preview the page**
3. **Check that:**
   - Calculator loads properly
   - Input fields work
   - Charts display correctly
   - PDF export functions
   - Mobile view works

## STEP 5: Troubleshooting

### If iframe doesn't show:
- **Check the URL** - make sure it's accessible in a browser
- **Try different height** - increase to 1000px
- **Check Squarespace plan** - some features need paid plans

### If calculator appears cut off:
- **Increase iframe height** to 900px or 1000px
- **Use responsive iframe code** above

### If mobile view is broken:
- **Use mobile-optimized iframe code**
- **Test on actual mobile device**

## STEP 6: Optional Enhancements

### Add Loading Message
```html
<div id="calculator-loading" style="text-align: center; padding: 40px;">
  <p>Loading HVAC Calculator...</p>
</div>

<iframe 
  src="https://your-calculator-url.com/hvac-calculator.html" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none;"
  onload="document.getElementById('calculator-loading').style.display='none';">
</iframe>
```

### Add Custom Styling
```html
<div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
  <h2 style="text-align: center; margin-bottom: 20px;">HVAC Duct Calculator</h2>
  
  <iframe 
    src="https://your-calculator-url.com/hvac-calculator.html" 
    width="100%" 
    height="800" 
    frameborder="0"
    style="border: none; border-radius: 8px;">
  </iframe>
</div>
```

## Complete Example for Squarespace

**Copy this entire code into a Squarespace Code Block:**

```html
<div style="margin: 20px 0; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  <iframe 
    src="https://your-calculator-url.com/hvac-calculator.html" 
    width="100%" 
    height="850" 
    frameborder="0"
    style="border: none; display: block;">
  </iframe>
</div>

<style>
@media (max-width: 768px) {
  div iframe {
    height: 650px !important;
  }
}
</style>
```

**Remember to replace** `https://your-calculator-url.com/hvac-calculator.html` **with your actual calculator URL.**

The calculator will be fully functional with charts, PDF export, and mobile responsiveness within your Squarespace site.