import "@/styles/globals.scss";
import "swiper/css";
import { Lang, getDictionary } from "../dictionaries";
import Main from "./main";
import StyledComponentsRegistry from "@/components/registry";

export interface Params {
  params: {
    lang: Lang;
  };
}

export interface Props extends Params {
  children: React.ReactNode;
}

export default async function RootLayout({ children, params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
        <StyledComponentsRegistry>
          <Main lang={params.lang} dict={dict}>
            {children}
          </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
