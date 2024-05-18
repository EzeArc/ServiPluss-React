export const HeroContainer = ({ img }) => {
  return (
    <div className="bg-no-repeat bg-cover relative h-[90vh] w-full max-w-[100vw]">
      <div className="absolute inset-0 m-auto w-full h-full flex justify-center flex-col items-center">
        <slot />
      </div>
      <img
        className="absolute cp-v h-full w-full animate-fade object-cover object-center animate-duration-1000 animate-ease-in-out -z-10"
        src={img}
        alt="ServiPluss cover"
      />
      <img
        className="absolute animate-fade object-cover object-center animate-duration-1000 animate-ease-in-out blur-3xl -z-40"
        src={img}
        alt="ServiPluss cover"
      />
    </div>
  );
};
