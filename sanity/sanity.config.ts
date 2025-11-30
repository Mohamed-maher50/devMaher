import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {internationalizedArray} from 'sanity-plugin-internationalized-array'
export default defineConfig({
  name: 'default',
  title: 'My Sanity Project',

  projectId: 'desiuf2a',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),

    internationalizedArray({
      languages: [
        {id: 'en', title: 'English'},
        {id: 'de', title: 'German'},
        {id: 'fr', title: 'french'},
        {id: 'ar', title: 'arabic'},
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
