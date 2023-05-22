import { FC, useState, ChangeEvent } from "react"
import { UpdateType, UserType } from "../../api/users"
import { toast } from "react-hot-toast"
import { update } from "../../states/user"
import EditAvatar from "./EditAvatar"
import { useTranslation } from "react-i18next"

type Props = {
  user: UserType
  refresh: () => Promise<any>
}

const EditProfile: FC<Props> = ({ user, refresh }) => {
  const [ isEditable, setIsEditable ] = useState<boolean>(false)
  const [ updateData, setUpdateData ] = useState<UpdateType>({ name: user.name, email: user.email, phone: user.phone || "" })
  const { t } = useTranslation()

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUpdateData({ ...updateData, [name]: value })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const updateUserProfile = async () => {
    if (!updateData.name || !updateData.email) return toast.error("Please fill all the fields before saving!")
    if (!emailRegex.test(updateData.email)) return toast.error("Please add a valid email!")
    if (updateData.phone && updateData.phone.length < 6) return toast.error("Please add a valid phone number!")
    await update(updateData)
    toast.success("Your profile updated successfully!")
    setIsEditable(false)
    refresh()
  }

  return (
    <div className="edit container">
      <div className="edit-header">
        <div>
          <h2>{t("profile.profile-title")}</h2>
          <p>{t("profile.profile-description")}</p>
        </div>
        { isEditable
          ? <button className="solid" onClick={updateUserProfile}>{t("profile.save-button")}</button>
          : <button className="solid" onClick={() => setIsEditable(true)}>{t("profile.edit-button")}</button>
        }
      </div>
      <div className="edit-data">
        <div>
          <p>{t("profile.name")}</p>
          { isEditable
            ? <input type="text" name="name" value={updateData.name} onChange={onInputChange} />
            : <p>{ user.name }</p>
          }
        </div>
        <div>
          <p>{t("profile.email")}</p>
          { isEditable
            ? <input type="text" name="email" value={updateData.email} onChange={onInputChange} />
            : <p>{ user.email }</p>
          }
        </div>
        <div>
          <p>{t("profile.phone")}</p>
          { isEditable
            ? <input type="text" name="phone" value={updateData.phone} onChange={onInputChange} />
            : <p>{ user.phone }</p>
          }
        </div>
        <div>
          <p>{t("profile.company")}</p>
          <p>{ user?.company?.name }</p>
        </div>
        <EditAvatar />
      </div>
    </div>
  )
}

export default EditProfile