# Complete Squarespace iframe Integration Guide

## STEP 1: Host the Calculator File

### Option A: GitHub Pages (Free - Recommended)
1. **Go to** github.com and sign in (create account if needed)
2. **Click** "New repository" (green button)
3. **Name it** "hvac-calculator" 
4. **Make it Public**
5. **Check** "Add a README file"
6. **Click** "Create repository"
7. **Click** "uploading an existing file"
8. **Upload** `hvac-calculator-iframe.html`
9. **Rename it** to `index.html` during upload
10. **Commit** the file
11. **Go to** Settings tab → Pages (left sidebar)
12. **Under Source** select "Deploy from a branch"
13. **Select** "main" branch and "/ (root)" folder
14. **Save**
15. **Wait 2-3 minutes** - your URL will be: `https://yourusername.github.io/hvac-calculator/`

### Option B: Netlify (Free)
1. **Go to** netlify.com
2. **Sign up** with GitHub, Google, or email
3. **Drag and drop** `hvac-calculator-iframe.html` directly onto the deploy area
4. **It will auto-deploy** and give you a URL like: `https://magical-name-123456.netlify.app/`
5. **Optional:** Change site name in Site settings

### Option C: Your Own Server
1. **Upload** `hvac-calculator-iframe.html` to your web hosting
2. **Place it** in your public web directory (usually `public_html`)
3. **Access via**: `https://yourwebsite.com/hvac-calculator-iframe.html`

## STEP 2: Test Your Hosted Calculator

Before embedding in Squarespace, verify your calculator works:

1. **Open your hosted URL** in a browser
2. **Test all features:**
   - Change velocity and friction values
   - Verify calculations update automatically
   - Check chart displays properly
   - Test PDF export function
   - Verify mobile responsiveness

## STEP 3: Add Calculator to Squarespace

### Method 1: Code Block (Recommended for Squarespace 7.1)

1. **Log into** your Squarespace admin
2. **Navigate to** the page where you want the calculator
3. **Click** "Edit" on the page
4. **Click the "+"** to add a new content block
5. **Search for "Code"** and select **"Code Block"**
6. **Paste this exact code:**

```html
<div style="width: 100%; margin: 20px 0;">
  <iframe 
    src="YOUR_CALCULATOR_URL_HERE"
    width="100%" 
    height="1400"
    frameborder="0"
    scrolling="auto"
    style="
      border: none; 
      border-radius: 8px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      min-height: 1400px;
    ">
    <p>Your browser does not support iframes. <a href="YOUR_CALCULATOR_URL_HERE">Click here to access the calculator</a></p>
  </iframe>
</div>
```

7. **Replace** `YOUR_CALCULATOR_URL_HERE` with your actual hosted URL (both places)
8. **Save** the page

### Method 2: Embed Block (Alternative)

1. **Click the "+"** to add content
2. **Search for "Embed"** and select **"Embed Block"**  
3. **Paste your calculator URL** directly
4. **Squarespace will automatically create an iframe**
5. **Note:** This method gives you less control over styling

## STEP 4: Verify Integration

1. **Save your Squarespace page**
2. **Preview the page** (eye icon in top right)
3. **Test all functionality:**
   - Calculator loads completely
   - Input fields are responsive
   - Charts display and update
   - PDF export downloads properly
   - Mobile view works correctly

## STEP 5: Squarespace-Specific Troubleshooting

### If iframe doesn't appear:
1. **Check your URL** - open it in a new browser tab first
2. **Verify Squarespace plan** - Code blocks require paid plans (not Personal)
3. **Try Embed block** instead of Code block
4. **Check iframe height** - increase to 1000px if content is cut off

### If calculator appears but is cut off:
```html
<!-- Use this taller version -->
<iframe 
  src="YOUR_URL_HERE"
  width="100%" 
  height="1600"
  style="border: none; min-height: 1600px;">
</iframe>
```

### If mobile view has issues:
```html
<!-- Mobile-optimized version -->
<div style="width: 100%; overflow: auto;">
  <iframe 
    src="YOUR_URL_HERE"
    width="100%" 
    height="1200"
    style="border: none; min-width: 800px;">
  </iframe>
</div>
```

### Squarespace 7.0 vs 7.1 Differences:
- **Squarespace 7.1:** Use Code Block (preferred)
- **Squarespace 7.0:** Use Embed Block or Code Injection

## STEP 6: Advanced Integration Options

### Option 1: Full-Width Calculator
```html
<div style="width: 100vw; margin-left: calc(-50vw + 50%); padding: 20px 0;">
  <iframe 
    src="YOUR_URL_HERE"
    width="100%" 
    height="1400"
    style="border: none; max-width: 1200px; margin: 0 auto; display: block;">
  </iframe>
</div>
```

### Option 2: With Loading State
```html
<div id="calc-container">
  <div id="loading" style="text-align: center; padding: 50px;">
    <p>Loading PragmaticPE HVAC Calculator...</p>
  </div>
  <iframe 
    src="YOUR_URL_HERE"
    width="100%" 
    height="1400"
    style="border: none; display: none;"
    onload="document.getElementById('loading').style.display='none'; this.style.display='block';">
  </iframe>
</div>
```

### Option 3: Branded Container
```html
<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 30px; border-radius: 16px; margin: 20px 0;">
  <h2 style="text-align: center; color: #1f2937; margin-bottom: 20px; font-family: Arial, sans-serif;">
    Professional HVAC Duct Calculator
  </h2>
  <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">
    Calculate optimal duct sizes for your HVAC systems
  </p>
  <iframe 
    src="YOUR_URL_HERE"
    width="100%" 
    height="1400"
    style="border: none; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
  </iframe>
</div>
```

## Quick Implementation Checklist

- [ ] Calculator file hosted and accessible
- [ ] URL tested in browser
- [ ] Squarespace page created/selected
- [ ] Code block added with iframe code
- [ ] URL replaced in iframe src
- [ ] Page saved and previewed
- [ ] All calculator features tested
- [ ] Mobile responsiveness verified
- [ ] PDF export functionality confirmed

## Final Notes

- **Squarespace Personal plans** do not support Code blocks - upgrade to Business plan or higher
- **Always test** the hosted URL before embedding
- **Mobile optimization** is included in the iframe file
- **PDF exports** work directly from the embedded calculator
- **All calculations** happen client-side for fast performance

Your PragmaticPE HVAC Calculator will be fully functional within Squarespace with professional branding and all features intact.