export const globalData = {
  logoPath: "/logo/gbd-logo.png",
  contact: {
    email: "info@gbddoner.com",
    copyright: "© Great British Doner. All Rights Reserved 2026."
  },
  footerLists: {
    about: { 
      title: "ABOUT US", 
      links: [
        { label: "Our Story", href: "/our-story" }, 
        { label: "Locations", href: "/locations" }
      ] 
    },
    explore: { 
      title: "EXPLORE", 
      links: [
        { label: "Menu", href: "/menu" }, 
        { label: "Allergen Guide", href: "/allergen-guide" }, 
        { label: "Catering", href: "/catering" }
      ] 
    },
    follow: { 
      title: "FOLLOW US", 
      links: [
        { label: "Instagram", href: "https://www.instagram.com/greatbritishdoner/" }, 
        { label: "TikTok", href: "https://www.tiktok.com/@greatbritishdoner" }, 
        { label: "Facebook", href: "https://www.facebook.com/p/Great-British-Doner-61580394281827/" }
      ] 
    }
  },
  newsletter: {
    heading: "JOIN THE GBD COMMUNITY",
    subtext: "Enter your email address to receive updates, exclusive offers, new launches, and latest news from Great British Doner."
  }
};

export const storyData = {
  sections: [
    {
      title: "WHO WE ARE",
      paragraphs: [
        "Great British Doner is a modern fast-casual food brand redefining the traditional doner experience across the UK.", 
        "Built around quality ingredients, bold flavours, and operational simplicity, GBD delivers a cleaner, faster, and more consistent way to enjoy one of the nation’s favourite foods."
      ],
      images: ["/Story/1.png"]
    },
    {
      title: "OUR VISION",
      paragraphs: [
        "To bring doner into a more elevated everyday dining experience without losing its authenticity, flavour, or street-food soul.", 
        "From quick lunch breaks to late-night cravings, GBD is designed to fit seamlessly into modern urban lifestyles."
      ],
      images: ["/Story/2.png", "/Story/3.png", "/Story/4.png"]
    },
    {
      title: "THE EXPERIENCE",
      paragraphs: [
        "GBD combines the speed of fast casual dining with the energy of a contemporary food brand.", 
        "Whether dining in, ordering online, or grabbing food on the go, the experience is designed to feel seamless, vibrant, and accessible.", 
        "Made for everyday moments. Built for long-term growth."
      ],
      images: ["/Story/5.png", "/Story/6.png", "/Story/7.png"]
    }
  ]
};

export const blogData = {
  article: {
    category: "BLOG",
    title: "WHY VEGAN DONER IS CHANGING FAST FOOD IN THE UK",
    heroImage: "/blog/1.png",
    contentPart1: [
      "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining.",
      "Today’s customers are looking for more than just speed and convenience. They want bold flavour, better ingredients, and food choices that fit modern lifestyles without losing the comfort and satisfaction of traditional street food.",
      "That’s why vegan doner is growing rapidly."
    ],
    inlineGallery: ["/blog/2.png", "/blog/3.png", "/blog/4.png"],
    contentPart2: [
      "At Great British Doner, we believe plant-based food should feel just as exciting, indulgent, and flavour-packed as the original experience. From rich seasoning and authentic texture to fresh ingredients and fast service, vegan doner brings a cleaner and more modern take to one of the UK’s favourite foods.",
      "As more people explore flexible eating habits and plant-based alternatives, vegan fast food is no longer a niche category — it’s becoming part of everyday dining culture.",
      "Modern flavour. Plant-based energy. A new generation of doner."
    ]
  }
};

export const feedData = {
  featuredArticle: {
    category: "BLOG",
    title: "WHY VEGAN DONER IS CHANGING FAST FOOD IN THE UK",
    excerpt: "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining. Today’s customers are looking for more than just speed and convenience.",
    image: "/blog/1.png",
    slug: "/feed/vegan-doner"
  },
  gridArticles: [
    // We will populate more articles here later. For now, render placeholders or leave empty if none exist.
  ] as Array<{ category: string; title: string; excerpt: string; image: string; slug: string }>
};