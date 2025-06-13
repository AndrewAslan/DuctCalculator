# Embedding HVAC Calculator in Your Website

## Method 1: iframe Embedding (Recommended)

Once deployed on Vercel, you can embed the entire calculator using an iframe:

```html
<iframe 
  src="https://your-app-name.vercel.app" 
  width="100%" 
  height="800"
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### Responsive iframe:
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe 
    src="https://your-app-name.vercel.app"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    frameborder="0">
  </iframe>
</div>
```

## Method 2: Direct Integration (Build Files)

For direct integration, you'll need the built files from your Vercel deployment:

1. After building (`vite build`), copy files from `dist/public/`
2. Upload to your website's directory
3. Include in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HVAC Calculator</title>
  <!-- Copy the CSS from the built index.html -->
  <link rel="stylesheet" href="path/to/built-styles.css">
</head>
<body>
  <div id="hvac-calculator-root"></div>
  <!-- Copy the JS from the built index.html -->
  <script type="module" src="path/to/built-script.js"></script>
</body>
</html>
```

## Method 3: WordPress Integration

### Using iframe in WordPress:
```html
[iframe src="https://your-app-name.vercel.app" width="100%" height="800"]
```

Or add to your theme's template:
```php
<div class="hvac-calculator-container">
  <iframe 
    src="https://your-app-name.vercel.app" 
    width="100%" 
    height="800"
    frameborder="0">
  </iframe>
</div>
```

## Method 4: Custom Container Integration

For more control, create a dedicated container:

```html
<div id="hvac-calculator-embed" style="
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
">
  <iframe 
    src="https://your-app-name.vercel.app"
    width="100%" 
    height="900"
    frameborder="0"
    style="display: block;">
  </iframe>
</div>
```

## Method 5: Subdomain Integration

Set up a subdomain (e.g., `calculator.yourdomain.com`) pointing to your Vercel deployment:

1. In Vercel dashboard, add custom domain
2. Point subdomain CNAME to your Vercel app
3. Embed using your custom domain

## Communication Between Parent and iframe

If you need the parent page to interact with the calculator:

```javascript
// Parent page JavaScript
window.addEventListener('message', function(event) {
  if (event.origin !== 'https://your-app-name.vercel.app') return;
  
  // Handle messages from calculator
  console.log('Calculator data:', event.data);
});

// Send message to calculator
document.querySelector('iframe').contentWindow.postMessage({
  action: 'setValues',
  velocity: 2500,
  friction: 0.15
}, 'https://your-app-name.vercel.app');
```

## Styling Integration

### Match your website theme:
```css
.hvac-calculator-embed {
  /* Match your site's colors */
  --primary-color: #your-brand-color;
  --background-color: #your-bg-color;
  
  /* Seamless integration */
  border: none;
  box-shadow: none;
  border-radius: 0;
}

/* Hide iframe borders completely */
.hvac-calculator-embed iframe {
  border: none;
  outline: none;
}
```

## Performance Considerations

1. **Lazy Loading**: Load iframe only when needed
```javascript
// Lazy load iframe
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const iframe = entry.target;
      iframe.src = iframe.dataset.src;
      observer.unobserve(iframe);
    }
  });
});

observer.observe(document.querySelector('.hvac-calculator-iframe'));
```

2. **Preload for faster loading**:
```html
<link rel="preload" href="https://your-app-name.vercel.app" as="document">
```

## Security Considerations

- Use HTTPS for both parent site and embedded app
- Set appropriate iframe sandbox attributes if needed:
```html
<iframe 
  src="https://your-app-name.vercel.app"
  sandbox="allow-scripts allow-same-origin allow-forms">
</iframe>
```

## Mobile Optimization

```css
@media (max-width: 768px) {
  .hvac-calculator-embed {
    height: 600px; /* Reduced height for mobile */
    margin: 0;
    border-radius: 0;
  }
}
```

Choose the method that best fits your website's architecture and requirements!