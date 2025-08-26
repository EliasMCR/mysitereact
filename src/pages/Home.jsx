import { Header } from "../components/Header";
import { Portifolio } from "../components/Portifolio";
import { Section } from "../components/Section";
import { SectionTwo } from "../components/SectionTwo";
import { Sobre } from "../components/Sobre";

export const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <Header />
      <Section />
      <SectionTwo />
      <Sobre />
      <Portifolio/>
    </div>
  );
};
