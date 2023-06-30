import { MdEmail } from "react-icons/md";

export default function NewsLetter() {
  return (
    <div
      className="flex items-center justify-center h-[500px] bg-fixed bg-cover bg-center object-cover"
      style={{
        backgroundImage: `url('n3.png')`,
      }}
    >
      <div className="flex-col text-center">
        <h3 className="font-bold lg:text-5xl text-2xl text-yellow-700">
          Subscribe to Our Newsletter
        </h3>
        <h2 className="font-normal lg:text-lg text-xs text-gray-800">
          Get the latest information and promo offers directly
        </h2>
        
        {/* mail */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdEmail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full lg:w-[380px] pl-10 p-2.5"
              placeholder="Enter your email"
            />
          </div>

          <button className="inline-flex font-medium font-sm text-white bg-gray-700 border-0 py-2 lg:px-6 px-4 w-auto hover:bg-yellow-700 rounded">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}





