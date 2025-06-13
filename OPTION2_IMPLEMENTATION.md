# Option 2: JavaScript Widget Implementation

## Step 1: Upload the JavaScript File

Upload this file to your website:
- **Source**: `pragmaticpe-integration/hvac-calculator-optimized.js`
- **Upload to**: `/js/hvac-calculator-optimized.js` (or wherever you keep JavaScript files)

## Step 2: Add Calculator to Any Page

Add this code wherever you want the calculator to appear:

```html
<!-- Include the calculator script -->
<script src="/js/hvac-calculator-optimized.js"></script>

<!-- Create container for calculator -->
<div id="hvac-calculator"></div>

<!-- Initialize the calculator -->
<script>
new PragmaticPECalculator('hvac-calculator');
</script>
```

## Step 3: Customization Options (Optional)

### Basic Setup (No Branding/CTAs)
```html
<script src="/js/hvac-calculator-optimized.js"></script>
<div id="hvac-calculator"></div>
<script>
new PragmaticPECalculator('hvac-calculator', {
    showBranding: false,
    showLeadCapture: false
});
</script>
```

### Custom Starting Values
```html
<script src="/js/hvac-calculator-optimized.js"></script>
<div id="hvac-calculator"></div>
<script>
new PragmaticPECalculator('hvac-calculator', {
    initialVelocity: 3000,
    initialFriction: 0.12,
    showBranding: false
});
</script>
```

### Different Container ID
If you want multiple calculators or different IDs:
```html
<div id="my-hvac-tool"></div>
<script>
new PragmaticPECalculator('my-hvac-tool');
</script>
```

## Complete Example Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>HVAC Calculator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>HVAC Duct CFM Calculator</h1>
    <p>Calculate optimal duct sizes for your HVAC system:</p>
    
    <!-- Calculator goes here -->
    <div id="hvac-calculator"></div>
    
    <!-- Load and initialize calculator -->
    <script src="/js/hvac-calculator-optimized.js"></script>
    <script>
    new PragmaticPECalculator('hvac-calculator');
    </script>
</body>
</html>
```

That's it! The calculator will automatically load with professional styling and all functionality included.