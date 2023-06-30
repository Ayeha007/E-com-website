import createimageUrlBuilder from '@sanity/image-url'
import { Image } from 'sanity';
import { client } from '@/lib/sanityClient';
import { dataset, projectId } from '../env'


const imageBuilder = createimageUrlBuilder(client)
export const urlForImage= (source:Image)=>{
return imageBuilder?.image (source)}

