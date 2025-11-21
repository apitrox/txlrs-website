# Required Images

Place the following images in this directory:

## Required Files

1. **logo.png**
   - TxLRS logo
   - Recommended size: 200x80px (or larger with same aspect ratio)
   - Format: PNG with transparent background
   - Used in: Header, footer, contact card

2. **favicon.png**
   - Website favicon/icon
   - Recommended sizes: 32x32px, 192x192px
   - Format: PNG
   - Used in: Browser tab, mobile home screen

3. **seal.png**
   - TxLRS Seal/Badge
   - Recommended size: 200x200px (square)
   - Format: PNG with transparent background
   - Used in: Homepage content section

4. **service.jpg**
   - General service/office image
   - Recommended size: 300x200px (or larger)
   - Format: JPG or PNG
   - Used in: Homepage content (floating image)

## Where to Find Images

### From WordPress Mirror
Check the following locations in `txlrs-website-wpengine`:

```
txlrs-website-wpengine/
├── texaslawyerss.com/
│   └── wp-content/
│       ├── uploads/
│       └── themes/
```

### Image Extraction Command
Run from txlrs-website-wpengine directory:
```powershell
Get-ChildItem -Recurse -Include *.png,*.jpg,*.jpeg | Where-Object { $_.Name -match "logo|seal|favicon" }
```

## After Adding Images

1. Verify all images are properly sized
2. Optimize images for web (compress if needed)
3. Test website display on mobile and desktop
4. Update this README to mark completion

## Status

- [ ] logo.png
- [ ] favicon.png
- [ ] seal.png
- [ ] service.jpg
