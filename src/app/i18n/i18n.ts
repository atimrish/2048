import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enTranslation from "./resources/en/translate.json";
import ruTranslation from "./resources/ru/translate.json";
import { LANGUAGES, LOCAL_STORAGE_KEYS } from "@src/features/game/config";
import { SDK } from "ysdk";

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

export const setYSDKLanguage = (ysdk: SDK) => {
	const localStoredLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE)

	if (localStoredLanguage) {
		i18n.changeLanguage(localStoredLanguage)
	} else if (LANGUAGES[ysdk.environment.i18n.lang.toString() as keyof typeof LANGUAGES]) {
		i18n.changeLanguage(ysdk.environment.i18n.lang);
	}
}

export default i18n;
