import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        defineField({name: 'lat', type: 'number', title: 'Latitude'}),
        defineField({name: 'lng', type: 'number', title: 'Longitude'}),
      ]
    }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'day', type: 'string', title: 'Day', options: {
            list: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }}),
          defineField({name: 'open', type: 'string', title: 'Open Time'}),
          defineField({name: 'close', type: 'string', title: 'Close Time'}),
        ]
      }]
    }),
    defineField({
      name: 'clickAndCollectUrl',
      title: 'Click & Collect URL',
      type: 'url',
    }),
    defineField({
      name: 'deliveryLinks',
      title: 'Delivery Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'provider', 
            type: 'string', 
            title: 'Provider', 
            options: { list: ['deliveroo', 'ubereats', 'justeat'] }
          }),
          defineField({name: 'url', type: 'url', title: 'URL'}),
        ]
      }]
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'isFlagship',
      title: 'Is Flagship?',
      type: 'boolean',
    }),
  ],
})
