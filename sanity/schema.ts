import { type SchemaTypeDefinition } from 'sanity'
import { Product } from './product'
import { Category } from './category'
import { Sale } from './sale'
import { Banner } from './banner'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, Banner, Sale],
}
