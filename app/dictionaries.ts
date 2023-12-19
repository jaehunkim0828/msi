import "server-only";

const dictionaries = {
  en: () =>
    import("./[lang]/dictionaries/en.json").then(module => module.default),
  "en-US": () =>
    import("./[lang]/dictionaries/en.json").then(module => module.default),
  ko: () =>
    import("./[lang]/dictionaries/ko.json").then(module => module.default),
  "ko-KR": () =>
    import("./[lang]/dictionaries/ko.json").then(module => module.default),
};

export type Lang = "en" | "en-US" | "ko" | "ko-KR";

export interface Dict {
  dict: ReturnTypeOfGetDictionary;
}

export type ResolvedReturnType<T> = T extends Promise<infer U> ? U : T;
// T가 Promise인 경우, Promise의 반환 타입(infer U)를 반환
export type ReturnTypeOfGetDictionary = ResolvedReturnType<
  ReturnType<typeof getDictionary>
>;

export const getDictionary = async (locale: Lang) => {
  return dictionaries[locale]();
};
