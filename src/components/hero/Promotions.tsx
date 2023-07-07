import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { urlForImage } from "../../../sanity/lib/image";
import { Image as IImage } from "sanity";


export async function getSaleData() {
  const res = await client.fetch(`*[_type=='sale'][0...2] {
    image,
    _id
  }`);
  return res;
}

interface ISale {
  _id: string;
  image: IImage;
}

export default async function Promotions() {
  const data: ISale[] = await getSaleData();

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-80 lg:pt-1 mx-auto flex flex-wrap">
        <div className="lg:w-2/3 w-full mx-auto">
          <div className="flex flex-wrap w-full py-32 px-10 relative mb-4">
            {data.map((item) => (
              <Image
                alt="sale"
                key={item._id}
                width={1000}
                height={500}
                className="w-full object-cover object-right-top h-full absolute inset-0"
                src={urlForImage(item.image).url()}
                quality={100}
              />
            ))}
          </div>
          <div className="flex flex-wrap -mx-2">
            {data.map((item) => (
              <div className="px-2 w-1/2" key={item._id}>
                <div className="flex flex-wrap w-full sm:py-24 py-16 sm:px-10 px-6 relative">
                  <Image
                    alt="sale"
                    width={500}
                    height={500}
                    className="w-full object-cover h-full object-center block  absolute inset-0"
                    src={urlForImage(item.image).url()}
                  />
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
}

