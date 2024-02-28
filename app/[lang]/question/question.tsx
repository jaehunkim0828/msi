"use client";

import { Dict, Lang } from "@/app/dictionaries";
import Contact from "@/components/contact";

interface Props extends Dict {
  lang: Lang;
}

export default function Question({ dict }: Props) {
  //   const {  } = dict;
  return <Contact />;
}
