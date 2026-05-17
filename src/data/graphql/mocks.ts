import type { MenuItem, MenuCategory } from "@/domain/menu-item";
import type { Location } from "@/domain/location";
import type { Post } from "@/domain/post";

export const MOCK_MENU_CATEGORIES: MenuCategory[] = [
  {
    slug: "bowls",
    label: "Bowls",
    description: "Hearty grain bowls layered with spit-fired protein.",
  },
  {
    slug: "plates",
    label: "Plates",
    description: "Plated mains with British seasonal sides.",
  },
  {
    slug: "wraps",
    label: "Wraps",
    description: "Charred flatbreads packed for the 90-second lunch.",
  },
  {
    slug: "sides",
    label: "Sides",
    description: "Loaded fries, slaws, and small plates.",
  },
  {
    slug: "drinks",
    label: "Drinks",
    description: "House-made beverages, low-sugar, ice-cold.",
  },
  {
    slug: "desserts",
    label: "Desserts",
    description: "Sweet finishers — short list, all British.",
  },
];

const placeholder = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=80`;

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: "mi-1",
    slug: "signature-chicken-bowl",
    title: "Signature Chicken Bowl",
    description:
      "Slow-spit chicken doner, charred peppers, herbed rice, garlic yoghurt, pickled onion.",
    priceGBP: 11.5,
    imageUrl: placeholder("1604908176997-125f25cc6f3d"),
    category: "bowls",
    isBestSeller: true,
    allergens: [
      { code: "MILK", label: "Milk" },
      { code: "GLUTEN", label: "Gluten" },
    ],
    nutrition: { calories: 620, protein: 42, carbs: 58, fat: 22 },
  },
  {
    id: "mi-2",
    slug: "lamb-doner-plate",
    title: "Lamb Doner Plate",
    description:
      "Ethically sourced British lamb, smoked aubergine, sumac onions, warm flatbread.",
    priceGBP: 13.0,
    imageUrl: placeholder("1599487488170-d11ec9c172f0"),
    category: "plates",
    isBestSeller: true,
    allergens: [{ code: "GLUTEN", label: "Gluten" }],
    nutrition: { calories: 740, protein: 48, carbs: 52, fat: 32 },
  },
  {
    id: "mi-3",
    slug: "halloumi-wrap",
    title: "Halloumi & Harissa Wrap",
    description: "Grilled halloumi, harissa, slaw, garlic sauce in a charred wrap.",
    priceGBP: 9.5,
    imageUrl: placeholder("1565299624946-b28f40a0ae38"),
    category: "wraps",
    isBestSeller: true,
    allergens: [
      { code: "MILK", label: "Milk" },
      { code: "GLUTEN", label: "Gluten" },
    ],
    nutrition: { calories: 560, protein: 26, carbs: 48, fat: 28 },
    dietaryFlags: ["V"],
  },
  {
    id: "mi-4",
    slug: "loaded-fries",
    title: "Loaded Doner Fries",
    description: "Hand-cut fries, shaved chicken, garlic mayo, chilli oil, parsley.",
    priceGBP: 7.5,
    imageUrl: placeholder("1573080496219-bb080dd4f877"),
    category: "sides",
    isBestSeller: true,
    allergens: [{ code: "EGG", label: "Egg" }],
    nutrition: { calories: 510, protein: 18, carbs: 56, fat: 24 },
  },
  {
    id: "mi-5",
    slug: "ayran",
    title: "House Ayran",
    description: "Salted yoghurt drink, lightly minted.",
    priceGBP: 3.0,
    imageUrl: placeholder("1571115764595-644a1f56a55c"),
    category: "drinks",
    isBestSeller: false,
    allergens: [{ code: "MILK", label: "Milk" }],
    nutrition: { calories: 110, protein: 6, carbs: 10, fat: 5 },
    dietaryFlags: ["V", "GF"],
  },
  {
    id: "mi-6",
    slug: "baklava",
    title: "Pistachio Baklava",
    description: "Layered filo, pistachio, citrus syrup.",
    priceGBP: 4.5,
    imageUrl: placeholder("1571877227200-a0d98ea607e9"),
    category: "desserts",
    isBestSeller: false,
    allergens: [
      { code: "NUTS", label: "Nuts" },
      { code: "GLUTEN", label: "Gluten" },
    ],
    nutrition: { calories: 320, protein: 5, carbs: 38, fat: 16 },
  },
];

export const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    slug: "shoreditch",
    name: "GBD Shoreditch",
    addressLine1: "112 Curtain Road",
    addressLine2: null,
    city: "London",
    postcode: "EC2A 3AH",
    phone: "020 7000 1001",
    coordinates: { lat: 51.5253, lng: -0.0796 },
    hours: [
      { day: "Mon", open: "11:00", close: "23:00" },
      { day: "Tue", open: "11:00", close: "23:00" },
      { day: "Wed", open: "11:00", close: "23:00" },
      { day: "Thu", open: "11:00", close: "00:00" },
      { day: "Fri", open: "11:00", close: "01:00" },
      { day: "Sat", open: "11:00", close: "01:00" },
      { day: "Sun", open: "12:00", close: "22:00" },
    ],
    clickAndCollectUrl: "https://order.gbdoner.com/shoreditch",
    deliveryLinks: [
      { provider: "deliveroo", url: "https://deliveroo.co.uk/menu/london/shoreditch/gbd" },
      { provider: "ubereats", url: "https://ubereats.com/gb/store/gbd-shoreditch" },
    ],
    imageUrl: placeholder("1517248135467-4c7edcad34c4"),
  },
  {
    id: "loc-2",
    slug: "soho",
    name: "GBD Soho",
    addressLine1: "44 Old Compton Street",
    addressLine2: null,
    city: "London",
    postcode: "W1D 4TY",
    phone: "020 7000 1002",
    coordinates: { lat: 51.5135, lng: -0.131 },
    hours: [
      { day: "Mon", open: "11:00", close: "23:00" },
      { day: "Tue", open: "11:00", close: "23:00" },
      { day: "Wed", open: "11:00", close: "23:00" },
      { day: "Thu", open: "11:00", close: "00:00" },
      { day: "Fri", open: "11:00", close: "01:00" },
      { day: "Sat", open: "11:00", close: "01:00" },
      { day: "Sun", open: "12:00", close: "22:00" },
    ],
    clickAndCollectUrl: "https://order.gbdoner.com/soho",
    deliveryLinks: [
      { provider: "deliveroo", url: "https://deliveroo.co.uk/menu/london/soho/gbd" },
      { provider: "justeat", url: "https://just-eat.co.uk/restaurants-gbd-soho" },
    ],
    imageUrl: placeholder("1559339352-11d035aa65de"),
  },
  {
    id: "loc-3",
    slug: "manchester-nq",
    name: "GBD Manchester NQ",
    addressLine1: "30 Tib Street",
    addressLine2: "Northern Quarter",
    city: "Manchester",
    postcode: "M4 1LX",
    phone: "0161 000 1003",
    coordinates: { lat: 53.4839, lng: -2.2374 },
    hours: [
      { day: "Mon", open: "11:00", close: "22:00" },
      { day: "Tue", open: "11:00", close: "22:00" },
      { day: "Wed", open: "11:00", close: "22:00" },
      { day: "Thu", open: "11:00", close: "23:00" },
      { day: "Fri", open: "11:00", close: "00:00" },
      { day: "Sat", open: "11:00", close: "00:00" },
      { day: "Sun", open: "12:00", close: "21:00" },
    ],
    clickAndCollectUrl: "https://order.gbdoner.com/manchester-nq",
    deliveryLinks: [
      { provider: "ubereats", url: "https://ubereats.com/gb/store/gbd-manchester" },
    ],
    imageUrl: placeholder("1466978913421-dad2ebd01d17"),
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "p-1",
    slug: "the-protein-truth",
    title: "The Protein Truth: What's Actually in a Doner",
    excerpt:
      "We break down the macros, the marketing, and what 'real food' should mean for fast-casual in 2026.",
    featuredImageUrl: placeholder("1504674900247-0877df9cc836"),
    publishedAt: "2026-04-22",
    author: "Maya Okafor",
    category: "Nutrition",
  },
  {
    id: "p-2",
    slug: "shoreditch-spotlight",
    title: "Shoreditch Spotlight: The Crew Behind the Spit",
    excerpt: "Meet the team turning out 800 bowls a day without losing the plot.",
    featuredImageUrl: placeholder("1552566626-52f8b828add9"),
    publishedAt: "2026-04-10",
    author: "Sam Reid",
    category: "Community",
  },
  {
    id: "p-3",
    slug: "urban-kineticism",
    title: "Urban Kineticism: Designing for a City That Doesn't Sit Still",
    excerpt: "Why our spaces are built around motion, queues, and the 90-second lunch.",
    featuredImageUrl: placeholder("1486718448742-163732cd1544"),
    publishedAt: "2026-03-28",
    author: "Priya Shah",
    category: "Design",
  },
];
