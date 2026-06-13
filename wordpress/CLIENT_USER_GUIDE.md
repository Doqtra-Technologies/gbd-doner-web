# Great British Doner — WordPress Admin Content Editor Guide

This guide is designed for the client (or non-technical managers) to edit and update all content on the **Great British Doner** website directly from the WordPress Admin Dashboard. 

Because the website uses a **modern headless architecture**, WordPress acts purely as a content control center. You don't need to write code, design layouts, or worry about breaking the website's design. All styles, animations, and structures are pre-built, and they will automatically pull your updates.

---

## Table of Contents
1. [Logging In](#1-logging-in)
2. [Editing Pages (Home, Story, Catering, Global)](#2-editing-pages-home-story-catering-global)
3. [Managing the Food Menu](#3-managing-the-food-menu)
4. [Managing Store Locations](#4-managing-store-locations)
5. [Publishing Blog Posts ("The Feed")](#5-publishing-blog-posts-the-feed)
6. [Safe Guardrails (Why you cannot break the site)](#6-safe-guardrails-why-you-cannot-break-the-site)

---

## 1. Logging In
1. Go to your WordPress admin URL (e.g., `https://api.gbdoner.com/wp-admin` or your staging URL).
2. Enter your username and password.
3. You will see the main WordPress Dashboard. The options you need are in the **left-hand sidebar**.

---

## 2. Editing Pages (Home, Story, Catering, Global)
All page copy, hero banners, text lines, and forms are managed in one central place: **Site Settings** (marked with a gear icon ⚙️ in the sidebar).

Click **Site Settings** in the sidebar, and you will see the following tabs at the top:

### 🏠 Home Page
*   **Hero Section**: Change the video background path (e.g. `/banner/0515(3).mp4`) and the three lines of the main title. Update the introductory paragraph.
*   **Cravings Section**: Edit the subheadings and descriptions for the two visual cards (e.g., "Signature Wraps" and "Fuel in Every Sip"). You can specify the image paths for each card.

### 📖 Our Story Page
*   **Hero Section**: Set the banner image path, eyebrow text, and the page subheading.
*   **Philosophy Section**: Edit the headings, the paragraph text, and the specific tags (e.g., *British Kebab Awards · PETA Approved*). You can upload two background images and adjust the rating number (e.g., `4.9★`).
*   **The Blueprint**: Edit the descriptions and upload images for the three pillars (e.g., *01 - Sourced*, *02 - Craft*, *03 - Modern*).
*   **Recognition / Press Items**: A drag-and-drop repeater where you can add awards, media features (e.g. *The Sun*, *BBC*), or community stats with their respective images and descriptions.

### ✉️ Catering Form
*   **Form Headers**: Edit the eyebrow, the multi-line heading (e.g., "Let's fuel your next event."), and the lead paragraph.
*   **Form Fields**: Customize the input box labels and placeholder text (e.g., "Jane Smith" or "Select guest size").
*   **Enquiry Recipient**: Set the email address where all submitted catering enquiries should be sent. If left blank, it defaults to the main developer configuration.
*   **Status Messages**: Customize what the user sees while the form is sending, when it succeeds, or if there is an error.

### 🗺️ Locations Page & 📰 Feed (Blog) Page
*   Edit the headings, eyebrows, and "empty states" (the text shown if no results or articles are found, e.g., "More stories arriving soon.").

### 🌐 Global Settings
*   Update the general **Contact Email**, **Copyright Text**, **Social Links** (Instagram, TikTok, Facebook), and the **Newsletter Subscribe** text shown in the website footer.

*Remember to click the **Save Changes** button at the top-right of the page after making your edits.*

---

## 3. Managing the Food Menu
To add new menu items, remove dishes, or change prices:

1. Click **Menu Items** in the left sidebar.
2. Click **Add New Menu Item** (or click on an existing one to edit it).
3. Fill in the following fields:
    *   **Title**: The name of the dish (e.g., *Signature Doner Wrap*).
    *   **Excerpt**: A short 1-2 sentence description shown on the menu page.
    *   **Featured Image** (Right sidebar): Upload a high-resolution photo of the food.
    *   **Price (GBP)**: Enter the price (e.g., `8.50`). Do not include the currency symbol.
    *   **Best Seller?**: Check this box if you want this item highlighted with a "Best Seller" badge and displayed in the homepage carousel.
    *   **Category**: Select where this item belongs (Boxes, Wraps, Burgers, Combos, Sides, Drinks, or Desserts).
    *   **Dietary Flags**: Check any boxes that apply (Vegetarian, Vegan, Gluten-free, Dairy-free, Contains nuts).
    *   **Allergens List**: Click "Add Entry" to list specific allergens (e.g., Code: `celery`, Label: `Celery`).
    *   **Nutrition Facts**: Input the Calories, Protein (g), Carbs (g), and Fat (g).
4. Click **Publish** (or **Update**).

---

## 4. Managing Store Locations
To add a new restaurant location or update opening hours:

1. Click **Locations** in the left sidebar.
2. Click **Add New Location** (or click an existing one to edit it).
3. Fill in the following fields:
    *   **Title**: The branch name (e.g., *Manchester Deansgate*).
    *   **Featured Image** (Right sidebar): Upload a photo of the storefront.
    *   **Address Lines, City & Postcode**: Enter the location details.
    *   **Phone Number**: The store contact number.
    *   **Flagship Branch?**: Check this box to display a "Flagship" badge on the map and sidebar.
    *   **Latitude & Longitude**: Used to pin the store on the interactive map.
        > **Tip**: To find these, search the address on Google Maps, right-click the red pin, and click the coordinates (e.g., `53.4808, -2.2426`) to copy them. Split them into the Latitude (`53.4808`) and Longitude (`-2.2426`) fields.
    *   **Click + Collect URL**: Paste the online ordering link.
    *   **Delivery Links**: Add delivery providers (Deliveroo, Uber Eats, Just Eat) and paste the store's direct menu links.
    *   **Opening Hours**: Add an entry for each day of the week (e.g., Day: `Mon`, Open: `11:30`, Close: `22:00`).
4. Click **Publish** (or **Update**).

---

## 5. Publishing Blog Posts ("The Feed")
For brand updates, news, and food blog articles:

1. Click **Posts** in the left sidebar.
2. Click **Add New**.
3. Add a **Title**, write the article body in the main editor, select a category, and upload a **Featured Image**.
4. Click **Publish**. This will automatically appear on "The Feed" page.

---

## 6. Safe Guardrails (Why you cannot break the site)
The website is engineered with strict guardrails so that non-technical users can edit content without risk:

*   **Design Protection**: You cannot change page layouts, fonts, colors, or animations from WordPress. This ensures the website always looks premium, consistent, and fast.
*   **Automatic Fallbacks**: If you accidentally leave a field blank (e.g., you forget to add a price, map coordinates, or opening hours), the website will automatically use a fallback value or hide the missing detail gracefully. It will **never** crash or show a broken page.
*   **Instant Updates**: Once you click **Publish** or **Update** in WordPress, a secure signal is sent to the live website. Changes will update automatically within 60 seconds (or immediately if you refresh the live page).
