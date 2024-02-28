import Question from "./question";
import { getDictionary } from "../../dictionaries";
import { Params } from "../layout";

interface Props extends Params {}

export default async function Page({ params: { lang } }: Props) {
  const dict = await getDictionary(lang); // en
  return <Question dict={dict} lang={lang} />;
}
