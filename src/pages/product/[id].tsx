import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product"
import Image from "next/image"

interface IProductsProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
}

type TProductPageProps = {
  product: IProductsProps
}

export default function Product({ product }: TProductPageProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "prod_QbGMfc0DHUuHL9" } }],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = String(params?.id)

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(price.unit_amount) / 100),
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}
