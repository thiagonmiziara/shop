import { ToastContainer } from "react-toastify"
import type { AppProps } from "next/app"
import Image from "next/image"

import logoImg from "@/assets/logo.svg"

import { globalStyles } from "@/styles/global"
import { Container, Header } from "@/styles/pages/app"
import "react-toastify/dist/ReactToastify.css"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image
          src={logoImg}
          alt="logo com dois triângulos verdes um sobre o outro e com o titulo ignite shop"
          width={160}
        />
      </Header>
      <Component {...pageProps} />;
      <ToastContainer />
    </Container>
  )
}
