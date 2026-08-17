import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Main Site Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Main site logo image displayed in header and footer',
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate URL',
      type: 'url',
    }),
  ],
});
