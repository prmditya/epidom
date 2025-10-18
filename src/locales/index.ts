import { en } from "./en";
import { fr } from "./fr";
import { id } from "./id";

export type Lang = "en" | "fr" | "id";

export const translations: Record<Lang, any> = {
  en,
  fr,
  id,
};

export { en, fr, id };
