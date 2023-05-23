import { Link, Navigate } from "react-router-dom"
import { MobileCheck, CenterSquare, ThumbsUp } from "@carbon/icons-react"
import dashboard from "../../assets/dashboard-mockup.webp"
import FeatureCard from "./FeatureCard"
import createGoogleUrl from "../../utils/createGoogleUrl"
import useGlobal from "../../hooks/useGlobal"
import { user$ } from "../../states/user"
import { token$ } from "../../api/users"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./LanguageSwitcher"

const Landing = () => {
  const user = useGlobal(user$)
  const token = useGlobal(token$)
  const { t } = useTranslation()

  const features = [
    { title: t("features.responsive"), description: t("features.description-responsive"), icon: <MobileCheck size="32" /> },
    { title: t("features.centralized"), description: t("features.description-centralized"), icon: <CenterSquare size="32" /> },
    { title: t("features.userfirendly"), description: t("features.description-userfriendly"), icon: <ThumbsUp size="32" /> }
  ]

  if (user && token) return <Navigate to="/dashboard" replace />

  return (
    <div className="landing wrapper">
      <h1>{t("landing.title-start")}<span>{t("landing.title-span")}</span>{t("landing.title-end")}</h1>
      <div className="sub">
        <p>{t("landing.sub-first")}</p>
        <p>{t("landing.sub-second")}</p>
      </div>
      <LanguageSwitcher />
      <Link to={createGoogleUrl()} className="solid">{t("landing.cta")}</Link>
      <img src={dashboard} alt="application dashboard mockup" />
      <h2>{t("features.title")}</h2>
      <section className="features">
        { features.map((feature, i) => <FeatureCard key={i} feature={feature} />)}
      </section>
    </div>
  )
}

export default Landing