import Avatar from "../../components/Avatar"
import avatars from "../../assets/avatars"
import getFilename from "../../utils/getFilename"
import { update, user$ } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"
import { useTranslation } from "react-i18next"

const EditAvatar = () => {
  const user = useGlobal(user$)
  const { t } = useTranslation()

  return (
    <div className="edit-avatar">
      <p>{t("profile.avatar")}</p>
      <section className="avatars">
        { avatars.map(image => <Avatar key={image} image={image} onClick={() => update({ avatar: getFilename(image) })} selected={image.includes(user?.avatar!)} />)}
      </section>
    </div>
  )
}

export default EditAvatar