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
        "At GBD, we were founded with a simple vision: to adapt traditional shish doner culture to the speed, aesthetics, and lifestyle of modern Britain.",
        "We don’t see ourselves as just another kebab brand. GBD is being built as a new-generation food brand — shaped through its restaurants, product development, technology, design language, and long-term retail vision.",
        "Our starting point was simple: to take a product people already love and transform it into a higher-quality, more consistent, and more contemporary experience.",
        "Today, with stores across Manchester and Liverpool, viral content, award-winning products, and a growing community, GBD has become one of Britain’s standout independent food brands.",
        "We’ve been recognised at the British Kebab Awards, awarded by PETA, featured by The Sun, and appeared on BBC discussing doner culture and the future of modern food brands."
      ],
      images: ["/Story/1.png", "/Story/2.png"]
    },
    {
      title: "THE EXPERIENCE",
      paragraphs: [
        "At GBD, every detail matters.",
        "We use authentic shish doner. We invest heavily in product development. We place technology at the centre of our operations. And we see design not just as aesthetics, but as part of the customer experience itself.",
        "Our approach is built around consistency, quality, and modern hospitality. We stay connected to our roots, but we don’t believe tradition should stand still. To us, tradition should evolve while being preserved.",
        "By developing one of Britain’s first vegan shish doner concepts, we’ve also helped introduce doner culture to new generations and changing consumer habits.",
        "Today, our stores maintain an average Google rating of 4.9 out of 5 — something we see as a reflection of the standards and experience we aim to deliver every single day."
      ],
      images: ["/Story/3.png", "/Story/4.png", "/Story/5.png"]
    },
    {
      title: "OUR VISION",
      paragraphs: [
        "For us, the ambition goes far beyond restaurants.",
        "We see GBD as a modern food ecosystem expanding across restaurants, retail, and foodservice — built for long-term growth and cultural relevance.",
        "Because to us, doner is one of the world’s most powerful street food cultures. And with the right execution, it belongs on a much bigger stage.",
        "We’re building a brand that respects where doner comes from, while redefining where it can go next.",
        "That’s a wrap."
      ],
      images: ["/Story/6.png", "/Story/7.png"]
    }
  ]
};

export const blogData = {
  article: {
    category: "BLOG",
    title: "WHY VEGAN DONER IS CHANGING FAST FOOD IN THE UK",
    heroImage: "/blog/1.webp",
    // All six paragraphs in narrative order — exact, unmodified text.
    // Do not reorder, paraphrase, summarise, or alter wording.
    paragraphs: [
      "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining.",
      "Today’s customers are looking for more than just speed and convenience. They want bold flavour, better ingredients, and food choices that fit modern lifestyles without losing the comfort and satisfaction of traditional street food.",
      "That’s why vegan doner is growing rapidly.",
      "At Great British Doner, we believe plant-based food should feel just as exciting, indulgent, and flavour-packed as the original experience. From rich seasoning and authentic texture to fresh ingredients and fast service, vegan doner brings a cleaner and more modern take to one of the UK’s favourite foods.",
      "As more people explore flexible eating habits and plant-based alternatives, vegan fast food is no longer a niche category — it’s becoming part of everyday dining culture.",
      "Modern flavour. Plant-based energy. A new generation of doner.",
    ],
    inlineGallery: ["/blog/2.webp", "/blog/3.webp", "/blog/4.webp"]
  }
};

export const feedData = {
  featuredArticle: {
    category: "BLOG",
    title: "WHY VEGAN DONER IS CHANGING FAST FOOD IN THE UK",
    excerpt:
      "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining. Today’s customers are looking for more than just speed and convenience. They want bold flavour, better ingredients, and food choices that fit modern lifestyles without losing the comfort and satisfaction of traditional street food.",
    image: "/blog/1.webp",
    slug: "/feed/vegan-doner"
  },
  gridArticles: [
    // We will populate more articles here later. For now, render placeholders or leave empty if none exist.
  ] as Array<{ category: string; title: string; excerpt: string; image: string; slug: string }>
};