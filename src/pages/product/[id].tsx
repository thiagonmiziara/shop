import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          veritatis impedit eos explicabo blanditiis dicta nostrum, iure
          delectus, perspiciatis sit laudantium sequi, provident voluptate rem
          voluptas ullam quaerat repudiandae minima?
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
