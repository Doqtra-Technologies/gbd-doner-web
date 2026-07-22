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
        { label: "Allergens", href: "/allergens/Allergens.pdf", download: true }, 
        { label: "Catering", href: "/catering" },
        { label: "Franchise", href: "/franchise" },
        { label: "The Feed", href: "/feed" }
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
    heroImage: "/blog/1.png",
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
    inlineGallery: ["/blog/2.png", "/blog/3.png", "/blog/4.png"]
  }
};

// Structured body content for editorial articles rendered via the shared
// ArticleBody component. Headings render as h2, list blocks as bullet lists —
// all text is exact, unmodified copy from the source article.
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type EditorialArticle = {
  category: string;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string;
  inlineGallery: string[];
  content: ArticleBlock[];
};

export const whyMorePeopleChoosingVeganDonerArticle: EditorialArticle = {
  category: "BLOG",
  title: "WHY MORE PEOPLE ARE CHOOSING VEGAN DONER",
  slug: "why-more-people-choosing-vegan-doner",
  excerpt:
    "The way people eat is changing. Across the UK, more diners are looking for meals that are fresh, flavour-packed and offer greater variety. While traditional doner remains a firm favourite, vegan doner has quickly become one of the most exciting additions to modern menus.",
  heroImage: "/blog/why-more-people-choosing-vegan-doner.jpeg",
  inlineGallery: ["/blog/3.png", "/blog/4.png", "/blog/2.png"],
  content: [
    { type: "paragraph", text: "The way people eat is changing. Across the UK, more diners are looking for meals that are fresh, flavour-packed and offer greater variety. While traditional doner remains a firm favourite, vegan doner has quickly become one of the most exciting additions to modern menus." },
    { type: "paragraph", text: "What was once considered a niche option is now enjoyed by a much wider audience. From committed vegans to flexitarians and anyone simply looking to try something different, vegan doner is proving that you don't need meat to enjoy the bold flavours and satisfying experience of a great doner." },
    { type: "paragraph", text: "At Great British Doner, we believe everyone should be able to enjoy the authentic taste of doner, which is why our Vegan Doner has become one of the most popular choices on our menu." },
    { type: "heading", text: "A New Generation of Food Choices" },
    { type: "paragraph", text: "More people than ever are becoming conscious of what they eat. While taste remains the number one priority, customers are also considering variety, sustainability and lighter meal options." },
    { type: "paragraph", text: "Many people are not giving up meat completely—they're simply choosing to eat less of it. This growing trend, often referred to as \"flexitarian eating\", has encouraged restaurants across the UK to offer exciting plant-based alternatives that never compromise on flavour." },
    { type: "paragraph", text: "Vegan doner is a perfect example. It delivers everything people love about a classic doner while providing an option that suits different lifestyles and dietary preferences." },
    { type: "heading", text: "Flavour Always Comes First" },
    { type: "paragraph", text: "One of the biggest misconceptions about vegan food is that it lacks flavour. Modern plant-based ingredients have changed that completely." },
    { type: "paragraph", text: "At Great British Doner, our Vegan Doner is carefully prepared to deliver the rich seasoning, satisfying texture and bold taste that doner lovers expect. Combined with crisp vegetables, fresh salad and your choice of delicious sauces, every bite is packed with flavour." },
    { type: "paragraph", text: "It's not about replacing the traditional experience—it's about creating another great way to enjoy it." },
    { type: "heading", text: "Perfect for Everyone—Not Just Vegans" },
    { type: "paragraph", text: "One of the reasons vegan doner continues to grow in popularity is because it appeals to far more than just vegan customers." },
    { type: "paragraph", text: "Many people choose it because they:" },
    { type: "list", items: [
      "Want to enjoy a lighter meal.",
      "Are trying to reduce their meat consumption.",
      "Like exploring new flavours.",
      "Enjoy having more variety when eating out.",
      "Want a satisfying lunch or dinner without compromising on taste.",
    ] },
    { type: "paragraph", text: "Whether you're vegan, vegetarian or simply curious, vegan doner offers something different while delivering the same satisfying experience." },
    { type: "heading", text: "Fresh Ingredients Make the Difference" },
    { type: "paragraph", text: "Every great meal starts with quality ingredients." },
    { type: "paragraph", text: "Our Vegan Doner is served alongside fresh salad, crisp vegetables and your favourite sauces, allowing every customer to personalise their meal exactly the way they like it." },
    { type: "paragraph", text: "Whether you choose a wrap, a box or enjoy it with fries, every order is freshly prepared to ensure maximum flavour and freshness." },
    { type: "heading", text: "A Great Choice for Lunch or Dinner" },
    { type: "paragraph", text: "Busy lifestyles mean people need meals that are both convenient and satisfying." },
    { type: "paragraph", text: "Vegan doner offers the perfect balance. It's quick enough for a lunch break, filling enough for dinner and packed with flavour from the very first bite." },
    { type: "paragraph", text: "Whether you're grabbing food with friends, taking away after work or ordering from home, it's a delicious option that fits into any part of your day." },
    { type: "heading", text: "Plant-Based Doesn't Mean Compromise" },
    { type: "paragraph", text: "Choosing a vegan meal no longer means settling for fewer options." },
    { type: "paragraph", text: "Today's plant-based dishes are designed to stand alongside traditional favourites—not replace them." },
    { type: "paragraph", text: "That's exactly how we approach our Vegan Doner. It's created with the same attention to flavour, freshness and quality that goes into every item on the Great British Doner menu." },
    { type: "paragraph", text: "The result is a meal that's satisfying, delicious and full of character." },
    { type: "heading", text: "Why Customers Keep Coming Back" },
    { type: "paragraph", text: "Customers love having choice, and our Vegan Doner has become a favourite for good reason." },
    { type: "paragraph", text: "It offers:" },
    { type: "list", items: [
      "Rich, authentic doner-inspired flavour.",
      "Freshly prepared ingredients.",
      "A satisfying and filling meal.",
      "Plenty of customisation with fresh salads and sauces.",
      "An option everyone can enjoy, regardless of dietary preference.",
    ] },
    { type: "paragraph", text: "It's proof that great food is about flavour—not labels." },
    { type: "heading", text: "Experience Vegan Doner at Great British Doner" },
    { type: "paragraph", text: "Whether you're already a fan of plant-based food or you're simply looking to try something new, our Vegan Doner is well worth discovering." },
    { type: "paragraph", text: "Prepared fresh, packed with flavour and served exactly the way you like it, it's become one of the standout choices on our menu." },
    { type: "paragraph", text: "Visit your nearest Great British Doner location and discover why more people across the UK are choosing Vegan Doner. Great taste has no limits—and neither should your next meal." },
  ],
};

export const whatMakesGreatBritishDonerDifferentArticle: EditorialArticle = {
  category: "BLOG",
  title: "WHAT MAKES GREAT BRITISH DONER DIFFERENT?",
  slug: "what-makes-great-british-doner-different",
  excerpt:
    "In a country where takeaway options are endless, standing out takes more than simply serving great food. Today's customers expect quality ingredients, fresh preparation, fast service and a memorable experience every time they visit.",
  heroImage: "/blog/what-makes-great-doner-different.jpeg",
  inlineGallery: ["/blog/1.png", "/blog/2.png", "/blog/4.png"],
  content: [
    { type: "paragraph", text: "In a country where takeaway options are endless, standing out takes more than simply serving great food. Today's customers expect quality ingredients, fresh preparation, fast service and a memorable experience every time they visit." },
    { type: "paragraph", text: "At Great British Doner, we've reimagined what modern doner can be. From carefully selected ingredients to freshly prepared salads and bold flavours, every detail is designed to offer something that goes beyond the ordinary." },
    { type: "paragraph", text: "Here's what makes Great British Doner different." },
    { type: "heading", text: "Premium Ingredients, Always" },
    { type: "paragraph", text: "Every great meal starts with great ingredients." },
    { type: "paragraph", text: "That's why quality is at the heart of everything we do. From our carefully seasoned doner to our freshly baked wraps and crisp vegetables, we focus on delivering a meal that tastes as good as it looks." },
    { type: "paragraph", text: "We believe customers can taste the difference when ingredients are selected with care, and that's exactly what we strive to deliver with every order." },
    { type: "heading", text: "Freshly Prepared Every Day" },
    { type: "paragraph", text: "Freshness isn't just a promise—it's part of our everyday routine." },
    { type: "paragraph", text: "Our salads and vegetables are prepared fresh to ensure every wrap, box and salad delivers the perfect balance of flavour and texture. Crisp lettuce, fresh tomatoes, onions, pickles and vibrant toppings come together to complement every bite." },
    { type: "paragraph", text: "Fresh ingredients don't just improve taste—they create a better overall dining experience." },
    { type: "heading", text: "More Choice for Every Appetite" },
    { type: "paragraph", text: "No two customers are the same, and neither are their tastes." },
    { type: "paragraph", text: "Whether you're craving a classic Beef Doner Wrap, a Chicken Doner Box or our increasingly popular Vegan Doner, there's something for everyone on the menu." },
    { type: "paragraph", text: "You can customise your meal with fresh salads, delicious sauces and your favourite sides, making every visit a little different from the last." },
    { type: "heading", text: "Eight Delicious Sauces to Make It Your Own" },
    { type: "paragraph", text: "A great sauce can completely transform a meal." },
    { type: "paragraph", text: "That's why we've created a selection of eight flavour-packed sauces to complement every order. Whether you enjoy something creamy, spicy or full of garlic, you can personalise your doner exactly the way you like it." },
    { type: "paragraph", text: "It's one of the easiest ways to make every meal uniquely yours." },
    { type: "heading", text: "Modern Doner, Inspired by Tradition" },
    { type: "paragraph", text: "Doner has been loved for generations, but that doesn't mean it can't evolve." },
    { type: "paragraph", text: "At Great British Doner, we combine traditional flavours with a fresh, modern approach. Clean branding, contemporary restaurants and carefully crafted recipes come together to create a dining experience that feels familiar while offering something new." },
    { type: "paragraph", text: "It's the perfect balance between authenticity and innovation." },
    { type: "heading", text: "Fast Service Without Compromising Quality" },
    { type: "paragraph", text: "We know our customers lead busy lives." },
    { type: "paragraph", text: "Whether you're grabbing lunch during a work break, ordering dinner after a long day or stopping by late at night, you want food that's served quickly without sacrificing quality." },
    { type: "paragraph", text: "Our team works hard to prepare every order fresh while ensuring the fast, efficient service our customers expect." },
    { type: "heading", text: "Proud to Be Recognised" },
    { type: "paragraph", text: "Recognition matters because it reflects the trust our customers place in us." },
    { type: "paragraph", text: "Being recognised within the UK's kebab industry motivates us to continue raising the standard for modern doner. Every award, nomination and positive customer review inspires us to keep improving and delivering the quality experience people expect from Great British Doner." },
    { type: "paragraph", text: "Most importantly, the greatest recognition comes from customers who choose to return time and time again." },
    { type: "heading", text: "Built Around the Customer Experience" },
    { type: "paragraph", text: "For us, great food is only part of the experience." },
    { type: "paragraph", text: "From welcoming restaurants and easy ordering to friendly service and consistently high standards, we focus on making every visit enjoyable from start to finish." },
    { type: "paragraph", text: "Whether you're dining in, ordering takeaway or collecting your meal, our goal is always the same—to deliver quality you can rely on." },
    { type: "heading", text: "Discover the Great British Doner Difference" },
    { type: "paragraph", text: "Great food is about more than what's on the menu. It's about quality ingredients, fresh preparation, bold flavours and an experience that keeps people coming back." },
    { type: "paragraph", text: "At Great British Doner, we're proud to bring all of those together in every meal we serve." },
    { type: "paragraph", text: "Whether you're visiting us for the first time or you're already one of our regulars, we look forward to serving you and showing you what makes Great British Doner different." },
  ],
};

export const editorialArticles: EditorialArticle[] = [
  whyMorePeopleChoosingVeganDonerArticle,
  whatMakesGreatBritishDonerDifferentArticle,
];

export const feedData = {
  featuredArticle: {
    category: "BLOG",
    title: "WHY VEGAN DONER IS CHANGING FAST FOOD IN THE UK",
    excerpt:
      "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining. Today’s customers are looking for more than just speed and convenience. They want bold flavour, better ingredients, and food choices that fit modern lifestyles without losing the comfort and satisfaction of traditional street food.",
    image: "/blog/1.png",
    slug: "/feed/vegan-doner"
  },
  gridArticles: [
    {
      category: whyMorePeopleChoosingVeganDonerArticle.category,
      title: whyMorePeopleChoosingVeganDonerArticle.title,
      excerpt: whyMorePeopleChoosingVeganDonerArticle.excerpt,
      image: whyMorePeopleChoosingVeganDonerArticle.heroImage,
      slug: `/feed/${whyMorePeopleChoosingVeganDonerArticle.slug}`,
    },
    {
      category: whatMakesGreatBritishDonerDifferentArticle.category,
      title: whatMakesGreatBritishDonerDifferentArticle.title,
      excerpt: whatMakesGreatBritishDonerDifferentArticle.excerpt,
      image: whatMakesGreatBritishDonerDifferentArticle.heroImage,
      slug: `/feed/${whatMakesGreatBritishDonerDifferentArticle.slug}`,
    },
  ] as Array<{ category: string; title: string; excerpt: string; image: string; slug: string }>
};