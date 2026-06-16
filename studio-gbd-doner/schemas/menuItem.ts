import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'priceGBP',
      title: 'Price (GBP)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category Slug',
      type: 'string',
      options: {
        list: [
          'salad', 'boxes', 'desserts', 'wraps', 'kids-menu', 'burgers', 'sides', 'drinks'
        ]
      }
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Is Best Seller?',
      type: 'boolean',
    }),
    defineField({
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'code', type: 'string', title: 'Code'}),
          defineField({name: 'label', type: 'string', title: 'Label'}),
        ]
      }]
    }),
    defineField({
      name: 'nutrition',
      title: 'Nutrition Facts',
      type: 'object',
      fields: [
        defineField({name: 'calories', type: 'number', title: 'Calories'}),
        defineField({name: 'protein', type: 'number', title: 'Protein'}),
        defineField({name: 'carbs', type: 'number', title: 'Carbs'}),
        defineField({name: 'fat', type: 'number', title: 'Fat'}),
      ]
    }),
    defineField({
      name: 'dietaryFlags',
      title: 'Dietary Flags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Vegetarian', value: 'V'},
          {title: 'Vegan', value: 'VG'},
          {title: 'Gluten-Free', value: 'GF'},
          {title: 'Dairy-Free', value: 'DF'},
          {title: 'Contains Nuts', value: 'N'},
        ]
      }
    }),
  ],
})
