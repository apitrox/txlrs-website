# PowerShell script to add Schema.org structured data to blog posts

$blogFiles = Get-ChildItem -Path "blog-post" -Filter "*.html"

foreach ($file in $blogFiles) {
    $filePath = $file.FullName
    $fileName = $file.Name
    $blogTitle = ($fileName -replace '\.html$', '') -replace '-', ' '
    $blogTitleCase = (Get-Culture).TextInfo.ToTitleCase($blogTitle)
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # Skip if schema already exists
    if ($content -match '@type.*Article') {
        Write-Host "Skipping $fileName - Schema already exists"
        continue
    }
    
    # Extract meta description if exists
    $metaDescription = ""
    if ($content -match '<meta\s+name="description"\s+content="([^"]+)"') {
        $metaDescription = $Matches[1]
    }
    
    # Create schema markup for blog posts
    $schema = @"

    
    <!-- Structured Data - Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": "$blogTitleCase",
          "url": "https://txlrs.org/$fileName",
          "datePublished": "2025-11-26",
          "dateModified": "2025-11-26",
          "author": {
            "@type": "Organization",
            "name": "Texas Lawyer Referral Service",
            "url": "https://txlrs.org"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Texas Lawyer Referral Service",
            "logo": {
              "@type": "ImageObject",
              "url": "https://txlrs.org/assets/images/TxLRS-Logo-Color.png"
            }
          },
          "description": "$metaDescription",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://txlrs.org/$fileName"
          }
        },
        {
          "@type": "WebPage",
          "@id": "https://txlrs.org/$fileName",
          "url": "https://txlrs.org/$fileName",
          "name": "$blogTitleCase - Texas Lawyer Referral Service",
          "isPartOf": {
            "@id": "https://txlrs.org/#website"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://txlrs.org/assets/images/TxLRS-Logo-Color.png"
          }
        }
      ]
    }
    </script>
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://txlrs.org/$fileName">
    <meta property="og:site_name" content="Texas Lawyer Referral Service">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://txlrs.org/$fileName">
    
    <!-- Performance Optimization -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
"@
    
    # Insert schema before </head>
    $content = $content -replace '</head>', "$schema</head>"
    
    # Save the file
    Set-Content $filePath -Value $content -Encoding UTF8 -NoNewline
    
    Write-Host "Added schema to $fileName"
}

Write-Host "`nCompleted processing $($blogFiles.Count) blog post files"
