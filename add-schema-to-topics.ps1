# PowerShell script to add Schema.org structured data to topic pages

$topicFiles = Get-ChildItem -Path "topic" -Filter "*.html"

foreach ($file in $topicFiles) {
    $filePath = $file.FullName
    $fileName = $file.Name
    $topicName = ($fileName -replace '\.html$', '') -replace '-', ' '
    $topicNameTitle = (Get-Culture).TextInfo.ToTitleCase($topicName)
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    # Skip if schema already exists
    if ($content -match '@type.*LegalService') {
        Write-Host "Skipping $fileName - Schema already exists"
        continue
    }
    
    # Create schema markup
    $schema = @"

    
    <!-- Structured Data - Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "name": "Texas Lawyer Referral Service - $topicNameTitle",
          "url": "https://txlrs.org/topic/$fileName",
          "description": "Connect with qualified $topicName attorneys through Texas Lawyer Referral Service. State Bar certified referrals.",
          "provider": {
            "@type": "Organization",
            "name": "Texas Lawyer Referral Service",
            "telephone": "+17135107100"
          },
          "areaServed": {
            "@type": "State",
            "name": "Texas"
          }
        },
        {
          "@type": "Attorney",
          "name": "$topicNameTitle Attorneys Network",
          "description": "Network of experienced $topicName attorneys serving Texas",
          "memberOf": {
            "@type": "Organization",
            "name": "Texas Lawyer Referral Service"
          }
        },
        {
          "@type": "WebPage",
          "@id": "https://txlrs.org/topic/$fileName",
          "url": "https://txlrs.org/topic/$fileName",
          "name": "$topicNameTitle - Texas Lawyer Referral Service",
          "isPartOf": {
            "@id": "https://txlrs.org/#website"
          },
          "about": {
            "@type": "Thing",
            "name": "$topicName"
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
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://txlrs.org/topic/$fileName">
    <meta property="og:site_name" content="Texas Lawyer Referral Service">
    
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

Write-Host "`nCompleted processing $($topicFiles.Count) topic files"
