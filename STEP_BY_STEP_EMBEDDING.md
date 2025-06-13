# Complete Step-by-Step HVAC Calculator Embedding Process

## STEP 1: Download the Calculator File

1. **Right-click** on `pragmaticpe-integration/hvac-calculator-optimized.js` in your project files
2. **Select "Download"** or **Copy the entire contents** of the file
3. **Save it** as `hvac-calculator-optimized.js` on your computer

## STEP 2: Upload to Your Website

### If you use cPanel/File Manager:
1. **Log into your cPanel**
2. **Open File Manager**
3. **Navigate to** `public_html` (or your website root folder)
4. **Create a folder** called `js` (if it doesn't exist)
5. **Open the `js` folder**
6. **Click "Upload"**
7. **Select** the `hvac-calculator-optimized.js` file
8. **Upload it**

### If you use FTP (FileZilla, etc.):
1. **Connect to your website** via FTP
2. **Navigate to** your website root folder (usually `public_html` or `www`)
3. **Create a folder** called `js` (if it doesn't exist)
4. **Upload** `hvac-calculator-optimized.js` to the `js` folder

### If you use WordPress:
1. **Go to** WordPress Admin → Appearance → Theme Editor
2. **OR** use FTP to access `/wp-content/themes/your-theme/js/`
3. **Upload** the file to the theme's `js` folder

## STEP 3: Test the File Upload

**Open this URL in your browser:**
`https://yourwebsite.com/js/hvac-calculator-optimized.js`

**You should see:** JavaScript code (not a 404 error)

## STEP 4: Add Calculator to a Page

### Method A: Edit Existing Page
1. **Go to** the page where you want the calculator
2. **Edit the page** (in WordPress: Edit Page, in HTML: open the file)
3. **Add this code** where you want the calculator to appear:

```html
<!-- HVAC Calculator -->
<div id="hvac-calculator"></div>

<script src="/js/hvac-calculator-optimized.js"></script>
<script>
new PragmaticPECalculator('hvac-calculator', {
    showBranding: false,
    showLeadCapture: false
});
</script>
<!-- End HVAC Calculator -->
```

### Method B: Create New Page
1. **Create a new page** called "HVAC Calculator"
2. **Add this complete HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HVAC Duct CFM Calculator</title>
</head>
<body>
    <h1>HVAC Duct CFM Calculator</h1>
    <p>Calculate optimal duct sizes for your HVAC system:</p>
    
    <div id="hvac-calculator"></div>
    
    <script src="/js/hvac-calculator-optimized.js"></script>
    <script>
    new PragmaticPECalculator('hvac-calculator', {
        showBranding: false,
        showLeadCapture: false
    });
    </script>
</body>
</html>
```

## STEP 5: WordPress-Specific Instructions

### If using WordPress Page/Post Editor:
1. **Edit the page/post**
2. **Switch to "Text" or "Code" view** (not Visual)
3. **Add this code:**

```html
<div id="hvac-calculator"></div>

<script src="/js/hvac-calculator-optimized.js"></script>
<script>
new PragmaticPECalculator('hvac-calculator');
</script>
```

### If using WordPress Block Editor (Gutenberg):
1. **Add a "Custom HTML" block**
2. **Paste the code above**
3. **Save the page**

## STEP 6: Test the Calculator

1. **Visit your page** in a web browser
2. **You should see:**
   - Calculator title and inputs
   - Velocity and Friction input fields
   - Results table
   - Professional styling

3. **Test functionality:**
   - Change velocity value
   - Change friction value
   - Verify results update automatically
   - Check that table shows calculations

## STEP 7: Troubleshooting

### If calculator doesn't appear:
1. **Check browser console** (F12 → Console tab)
2. **Look for errors** like "404" or "file not found"
3. **Verify file path:** `/js/hvac-calculator-optimized.js`

### If styling looks broken:
1. **Your website CSS might be interfering**
2. **Try adding this CSS to override:**

```html
<style>
.pragmaticpe-calculator {
    all: initial;
    font-family: Arial, sans-serif !important;
}
</style>
```

### If calculator appears but doesn't work:
1. **Check browser console for JavaScript errors**
2. **Make sure the script loads before the initialization**

## STEP 8: Customization Options

### Remove all branding and CTAs:
```javascript
new PragmaticPECalculator('hvac-calculator', {
    showBranding: false,
    showLeadCapture: false
});
```

### Set custom starting values:
```javascript
new PragmaticPECalculator('hvac-calculator', {
    initialVelocity: 3000,
    initialFriction: 0.12,
    showBranding: false
});
```

### Smaller width:
```javascript
new PragmaticPECalculator('hvac-calculator', {
    width: '80%',
    maxWidth: '800px'
});
```

## File Checklist

✅ **File uploaded:** `/js/hvac-calculator-optimized.js`  
✅ **File accessible:** `yourwebsite.com/js/hvac-calculator-optimized.js`  
✅ **Code added:** HTML with script and container div  
✅ **Page saved:** Calculator page published  
✅ **Tested:** Calculator loads and functions properly

That's the complete process. The calculator should now be fully functional on your website!