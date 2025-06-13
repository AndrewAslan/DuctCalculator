# PragmaticPE HVAC Calculator Implementation Guide

## Step-by-Step Integration

### 1. Upload Files to Your Website

Upload these files to your website server:
```
/js/hvac-calculator-optimized.js
/tools/hvac-calculator/index.html (see example below)
```

### 2. Add to Existing Pages

Add the calculator to any existing page with this simple code:

```html
<!-- Include the script (once per page) -->
<script src="/js/hvac-calculator-optimized.js"></script>

<!-- Add calculator container -->
<div id="hvac-calculator-main"></div>

<!-- Initialize the calculator -->
<script>
new PragmaticPECalculator('hvac-calculator-main', {
    showLeadCapture: true,
    showBranding: true,
    trackAnalytics: true
});
</script>
```

### 3. Recommended Page Implementations

#### A. Dedicated Tool Page (/tools/hvac-calculator/)
Create a dedicated page that ranks for HVAC calculator keywords.

#### B. Service Pages Integration
Add calculator sections to:
- HVAC Design services
- Duct sizing consultation pages
- Commercial HVAC pages

#### C. Blog Post Integration
Include in educational content:
- "How to Size HVAC Ducts Properly"
- "HVAC System Design Best Practices"
- "Energy Efficiency in Commercial Buildings"

### 4. SEO Optimization

#### Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Professional HVAC Duct CFM Calculator | PragmaticPE</title>
    <meta name="description" content="Free professional HVAC duct CFM calculator. Calculate optimal duct sizing for velocity and friction limits. Professional engineering tool by PragmaticPE.">
    <meta name="keywords" content="HVAC calculator, duct sizing, CFM calculator, HVAC engineering, duct design">
    
    <!-- Schema markup for tools -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "HVAC Duct CFM Calculator",
        "description": "Professional HVAC duct sizing calculator for engineering calculations",
        "applicationCategory": "EngineeringApplication",
        "operatingSystem": "Web Browser",
        "provider": {
            "@type": "Organization",
            "name": "PragmaticPE",
            "url": "https://pragmaticpe.com"
        }
    }
    </script>
</head>
```

#### Content Strategy Keywords
Target these high-value keywords:
- "HVAC duct calculator"
- "CFM calculator"
- "Duct sizing tool"
- "HVAC engineering calculator"
- "Professional duct design"

### 5. Analytics Tracking

The calculator automatically tracks:
- Widget loads
- Calculations performed
- PDF exports
- Button clicks
- Lead generation events

#### Google Analytics Setup
```javascript
// The calculator will automatically send events to GA4 if gtag is available
gtag('config', 'GA_MEASUREMENT_ID');
```

#### Custom Event Tracking
```javascript
new PragmaticPECalculator('calculator', {
    onEvent: function(eventName, data) {
        // Custom tracking logic
        console.log('Calculator Event:', eventName, data);
        
        // Send to your analytics platform
        if (eventName === 'calculation_performed') {
            // Track successful calculations
        }
    }
});
```

### 6. Lead Generation Optimization

#### A. Contact Form Integration
```html
<div id="hvac-calculator"></div>

<!-- Add contact form below calculator -->
<div class="lead-capture-form">
    <h3>Need Professional HVAC Design?</h3>
    <form action="/contact" method="POST">
        <input type="hidden" name="source" value="hvac_calculator">
        <input type="email" name="email" placeholder="Your Email" required>
        <input type="tel" name="phone" placeholder="Phone Number">
        <textarea name="project_details" placeholder="Tell us about your project"></textarea>
        <button type="submit">Get Free Consultation</button>
    </form>
</div>
```

#### B. Progressive Disclosure
Start with the calculator, then progressively show more lead capture options based on engagement.

### 7. Content Marketing Strategy

#### High-Value Content Pages
1. **"Complete Guide to HVAC Duct Sizing"** `/guides/hvac-duct-sizing/`
   - Comprehensive educational content
   - Embedded calculator for practical application
   - Target: "how to size HVAC ducts"

2. **"HVAC Energy Efficiency Calculator"** `/tools/hvac-energy-calculator/`
   - Modified version focusing on energy savings
   - Target: "HVAC energy efficiency"

3. **"Commercial HVAC Design Tools"** `/commercial-hvac/tools/`
   - Business-focused landing page
   - Target: "commercial HVAC design"

#### Blog Post Integration
```markdown
# How to Calculate HVAC Duct Sizes: A Professional Guide

When designing HVAC systems, proper duct sizing is crucial for efficiency...

## Use Our Professional Calculator

<div id="blog-calculator"></div>
<script>
new PragmaticPECalculator('blog-calculator', {
    maxWidth: '800px',
    showLeadCapture: false,
    showBranding: false
});
</script>

The calculator above uses industry-standard formulas...
```

### 8. Technical Specifications

#### Performance
- **Load time**: <200ms (minified)
- **Bundle size**: ~15KB gzipped
- **Mobile optimized**: Responsive design
- **Browser support**: Modern browsers (ES6+)

#### Dependencies
- No external dependencies for basic functionality
- Optional: jsPDF for PDF export (loads on demand)

#### Customization Options
```javascript
{
    width: '100%',              // Widget width
    maxWidth: '1200px',         // Maximum width
    initialVelocity: 2500,      // Starting velocity
    initialFriction: 0.15,      // Starting friction
    showBranding: true,         // Show PragmaticPE branding
    showLeadCapture: true,      // Show consultation CTA
    trackAnalytics: true,       // Enable event tracking
    theme: 'pragmaticpe'        // Color scheme
}
```

### 9. Conversion Optimization

#### A/B Testing Opportunities
1. **Lead capture placement**: Above vs below calculator
2. **CTA button text**: "Get Consultation" vs "Speak with Engineer"
3. **Calculator prominence**: Full width vs sidebar
4. **Content length**: Short description vs detailed explanation

#### Conversion Funnel
1. **Awareness**: User finds calculator through search/content
2. **Engagement**: User performs calculations
3. **Interest**: User exports PDF or explores results
4. **Action**: User clicks consultation CTA
5. **Conversion**: User submits contact form

### 10. Maintenance & Updates

#### Regular Tasks
- Monitor calculator usage analytics
- Update engineering formulas if needed
- A/B test different lead capture approaches
- Create new calculator variations for different markets

#### Content Updates
- Add seasonal HVAC content
- Create case studies using calculator results
- Develop advanced calculators for specific industries

This implementation will transform your HVAC calculator into a powerful traffic generation and lead capture tool while establishing PragmaticPE as the authority in HVAC engineering calculations.