import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enTranslation from "./resources/en/translate.json";
import ruTranslation from "./resources/ru/translate.json";
import { LOCAL_STORAGE_KEYS } from "@src/features/game/config";

const resources = {
	en: {
		translation: enTranslation,
	},
	ru: {
		translation: ruTranslation,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) ?? "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
