# Simple HVAC Calculator Integration

## Method 1: Single File Upload (Easiest)

Upload `embed/hvac-calculator-embed.html` to your website and link to it:

```html
<a href="/hvac-calculator.html">HVAC Calculator</a>
```

Or embed it in an iframe:
```html
<iframe src="/hvac-calculator.html" width="100%" height="800" frameborder="0"></iframe>
```

## Method 2: JavaScript Widget Integration

### Step 1: Upload Files
- Upload `pragmaticpe-integration/hvac-calculator-optimized.js` to your `/js/` folder

### Step 2: Add to Any Page
```html
<!-- Include the script -->
<script src="/js/hvac-calculator-optimized.js"></script>

<!-- Add container -->
<div id="hvac-calculator"></div>

<!-- Initialize -->
<script>
new PragmaticPECalculator('hvac-calculator');
</script>
```

## Method 3: Copy and Paste

Use `embed/hvac-calculator-widget.js` for a self-contained widget:

```html
<!-- Include widget script -->
<script src="/path/to/hvac-calculator-widget.js"></script>

<!-- Add calculator with data attributes (auto-initializes) -->
<div id="calc1" data-hvac-calculator></div>
```

## Customization Options

```javascript
// Minimal setup
new PragmaticPECalculator('container-id');

// With options
new PragmaticPECalculator('container-id', {
    showBranding: false,     // Hide PragmaticPE branding
    showLeadCapture: false,  // Hide consultation CTAs
    initialVelocity: 2500,   // Starting velocity value
    initialFriction: 0.15    // Starting friction value
});
```

Choose whichever method works best for your website setup.