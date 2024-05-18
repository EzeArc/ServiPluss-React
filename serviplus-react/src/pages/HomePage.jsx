import { CategorySlider } from "../components/CategorySlider";
import { Metrics } from "../components/Metrics";
import { Video } from "../components/Video";
import { Intro } from "../components/Intro";
import { Bento } from "../components/Bento";

export const HomePage = () => {
  return (
    <>
      <Video />
      <main className="">
        <CategorySlider />
        <Intro />
        <Bento />
        <Metrics />
      </main>
    </>
  );
};
