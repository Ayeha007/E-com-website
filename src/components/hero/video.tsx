export default function Video() {

    return (
      // <div className="z-0 top-0 w-screen h-screen">
      <div className="z-0 top-0 ">
        <div className="flex">
           <video muted autoPlay loop src="/cloths.mov" className="w-full mx-auto mt-4 brightness-70"></video>
         </div>
      </div>
    )
  }