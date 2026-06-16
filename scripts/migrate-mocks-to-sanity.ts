import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { MOCK_POSTS, MOCK_LOCATIONS, MOCK_MENU_ITEMS, MOCK_MENU_CATEGORIES } from "../src/data/graphql/mocks";

// We need an auth token to write to Sanity. 
// For this execution, we assume SANITY_API_TOKEN is in the environment.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j2iu1u4e",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImage(imagePath: string, retries = 3) {
  if (!imagePath) return undefined;
  
  // Convert web path /menu/Boxes/... to local path public/menu/Boxes/...
  const localPath = path.join(process.cwd(), "public", imagePath);
  
  if (!fs.existsSync(localPath)) {
    console.warn(`[WARN] Image not found on disk: ${localPath}`);
    return undefined;
  }
  
  console.log(`Uploading image: ${imagePath}`);
  const buffer = fs.readFileSync(localPath);
  
  for (let i = 0; i < retries; i++) {
    try {
      const asset = await client.assets.upload('image', buffer, {
        filename: path.basename(localPath)
      });
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      };
    } catch (err: any) {
      if (i === retries - 1) throw err;
      console.warn(`[WARN] Upload failed for ${imagePath}, retrying... (${i + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

async function run() {
  console.log("Starting mock data migration to Sanity...");

  // 1. Migrate Posts
  for (const post of MOCK_POSTS) {
    const featuredImage = post.featuredImageUrl ? await uploadImage(post.featuredImageUrl) : undefined;
    
    await client.createOrReplace({
      _type: 'post',
      _id: `post-${post.slug}`,
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      featuredImage,
      publishedAt: post.publishedAt,
      author: post.author,
      category: post.category,
      bodyHtml: `<p>${post.excerpt}</p>`
    });
    console.log(`Migrated post: ${post.slug}`);
  }

  // 2. Migrate Locations
  for (const loc of MOCK_LOCATIONS) {
    const image = loc.imageUrl ? await uploadImage(loc.imageUrl) : undefined;
    const images = [];
    if (loc.images) {
      for (const imgUrl of loc.images) {
        const uploaded = await uploadImage(imgUrl);
        if (uploaded) images.push(uploaded);
      }
    }

    await client.createOrReplace({
      _type: 'location',
      _id: `location-${loc.slug}`,
      name: loc.name,
      slug: { _type: 'slug', current: loc.slug },
      addressLine1: loc.addressLine1,
      addressLine2: loc.addressLine2,
      city: loc.city,
      postcode: loc.postcode,
      phone: loc.phone,
      coordinates: loc.coordinates,
      hours: loc.hours,
      clickAndCollectUrl: loc.clickAndCollectUrl,
      deliveryLinks: loc.deliveryLinks,
      image,
      images: images.length > 0 ? images : undefined,
      isFlagship: loc.isFlagship || false,
    });
    console.log(`Migrated location: ${loc.slug}`);
  }

  // 3. Migrate Menu Items
  for (const item of MOCK_MENU_ITEMS) {
    const image = item.imageUrl ? await uploadImage(item.imageUrl) : undefined;

    await client.createOrReplace({
      _type: 'menuItem',
      _id: `menuItem-${item.slug}`,
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      description: item.description,
      priceGBP: item.priceGBP,
      image,
      category: item.category,
      isBestSeller: item.isBestSeller,
      allergens: item.allergens,
      nutrition: item.nutrition,
      dietaryFlags: item.dietaryFlags,
    });
    console.log(`Migrated menu item: ${item.slug}`);
  }

  console.log("Migration complete!");
}

run().catch(console.error);
