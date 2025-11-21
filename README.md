# Texas Lawyer Referral Service - Website

Official Website for the Texas Lawyer Referral Service

Modern static HTML/CSS/JS website built with Tailwind CSS and MDBootstrap.

## Required Images

Please add the following images to complete the website:

### `/assets/images/`
- `logo.png` - TxLRS logo (recommended: 200x80px)
- `favicon.png` - Favicon (recommended: 32x32px and 192x192px)
- `seal.png` - TxLRS Seal (recommended: 200x200px)
- `service.jpg` - Service image for homepage content

### Recommended Image Sources
1. Extract from WordPress mirror: `txlrs-website-wpengine/texaslawyerss.com/`
2. Search in `wp-content/uploads/` directories
3. Use existing brand assets

## File Structure

```
txlrs-website/
├── index.html              # Homepage
├── robots.txt              # SEO robots file
├── sitemap.xml             # XML sitemap
├── README.md               # This file
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── script.js       # Interactive features
│   └── images/
│       └── README.md       # Image requirements
```

## Features

- **Responsive Design**: Mobile-first using Tailwind CSS
- **Modern UI**: MDBootstrap components
- **Multi-Language**: Support for 5 languages (Chinese, English, French, Spanish, Vietnamese)
- **Location-Based**: 8 Texas cities with local phone numbers
- **SEO Optimized**: Meta tags, semantic HTML, sitemap
- **Accessibility**: WCAG compliant structure

## Technologies

- HTML5
- Tailwind CSS (via CDN)
- MDBootstrap 6.4.2
- Font Awesome 6.4.0
- Vanilla JavaScript

## Local Development

Simply open `index.html` in a web browser. No build process required.

## Deployment

Upload all files to your web server or GitHub Pages.

## Next Steps

1. Add required images to `/assets/images/`
2. Create additional pages:
   - about.html
   - blog.html
   - faqs.html
   - topics.html
   - privacy-policy.html
   - terms-of-service.html
3. Add language-specific versions (inicio.html for Spanish, etc.)
4. Update CNAME for custom domain
5. Test all functionality
6. Deploy to production

## Contact

Texas Lawyer Referral Service
- Phone: 713-510-7100
- Website: https://www.texaslawyerss.com
