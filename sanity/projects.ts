import {defineField, defineType} from 'sanity'

export const projectsType = defineType({
  name: 'projects',
  title: 'project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      title: 'Project Title',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      title: 'Project Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Project Image',
    }),
    defineField({
      name: 'link',
      type: 'string',
      title: 'Project Link',
      validation: (rule) => rule.required(),
    }),
  ],
})
