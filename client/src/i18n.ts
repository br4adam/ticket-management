import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import backend from "i18next-http-backend"

i18next
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "hu",
    react: {
      bindI18n: "languageChanged",
      useSuspense: true,
    },
    returnNull: false
  })

export default i18next