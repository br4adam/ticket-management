import i18next from "i18next"
import hungarian from "../../assets/lang-hu.webp"
import english from "../../assets/lang-en.webp"

const languages = [
  { code: "en", name: "english", icon: english },
  { code: "hu", name: "hungarian", icon: hungarian }
]

const handleLanguageSelection = (code: string) => {
  i18next.changeLanguage(code)
  localStorage.setItem("language", code)
}

const LanguageSwitch = () => {
  return (
    <div className="languages">
    { languages.map((lng) => (
      <img key={lng.code} src={lng.icon} onClick={() => handleLanguageSelection(lng.code)} alt={lng.name} />)) 
    }
  </div>
  )
}

export default LanguageSwitch