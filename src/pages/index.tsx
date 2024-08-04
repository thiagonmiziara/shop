import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import camiseta1 from "@/assets/camisetas/camiseta1.png";
import camiseta2 from "@/assets/camisetas/camiseta2.png";
import camiseta3 from "@/assets/camisetas/camiseta3.png";
import camiseta4 from "@/assets/camisetas/camiseta4.png";

import "keen-slider/keen-slider.min.css";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className='keen-slider__slide'>
        <Image src={camiseta1} alt='camiseta1' width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta2} alt='camiseta1' width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta3} alt='camiseta1' width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className='keen-slider__slide'>
        <Image src={camiseta4} alt='camiseta1' width={520} height={480} />
        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
