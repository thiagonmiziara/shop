import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import Stripe from "stripe"
import { useKeenSlider } from "keen-slider/react"
import { HomeContainer, Product } from "@/styles/pages/home"
import { stripe } from "@/lib/stripe"

import "keen-slider/keen-slider.min.css"

interface IProductsProps {
  id: string
  name: string
  imageUrl: string
  price: string
}

type THomeProps = {
  products: IProductsProps[]
}

export default function Home({ products }: THomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Miziara shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt="" width={520} height={480} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price.unit_amount) / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24,
  }
}
