import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { useKeenSlider } from "keen-slider/react";
import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { stripe } from "@/lib/stripe";
import camiseta1 from "@/assets/camisetas/camiseta1.png";

import "keen-slider/keen-slider.min.css";

interface IProductsProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

type THomeProps = {
  products: IProductsProps[];
};

export default function Home({ products }: THomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map((product) => (
        <Product className='keen-slider__slide' key={product.id}>
          <Image src={product.imageUrl} alt='' width={520} height={480} />
          <footer>
            <strong>{product.name}</strong>
            <span>R$ {product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount !== null ? price.unit_amount / 100 : 0,
    };
  });

  return {
    props: {
      products,
    },
  };
};
