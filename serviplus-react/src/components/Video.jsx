export const Video = () => {
  return (
    <div className="w-full relative">
      <h1 className="z-10 w-[1000px] absolute top-[50%] start-1/3 m-auto font-black font-['Onest'] text-[100px]">
        ServiPluss
      </h1>
      <video
        className="w-full h-auto object-contain object-top aspect-video animate-ease-in-out animate-fade animate-duration-1000"
        src="/cleaningService.webm"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};
