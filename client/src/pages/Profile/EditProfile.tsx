import { FC, useState, ChangeEvent } from "react"
import { UpdateType, UserType } from "../../api/users"
import { toast } from "react-hot-toast"
import { update } from "../../states/user"
import EditAvatar from "./EditAvatar"

type Props = {
  user: UserType
  refresh: () => Promise<any>
}

const EditProfile: FC<Props> = ({ user, refresh }) => {
  const [ isEditable, setIsEditable ] = useState<boolean>(false)
  const [ updateData, setUpdateData ] = useState<UpdateType>({ name: user.name, email: user.email, phone: user.phone || "", avatar: user.avatar })

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUpdateData({ ...updateData, [name]: value })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const updateUserProfile = async () => {
    if (!updateData.name || !updateData.email) return toast.error("Please fill all the fields before saving!")
    if (!emailRegex.test(updateData.email)) return toast.error("Please add a valid email!")
    if (updateData.phone && updateData.phone.length < 6) return toast.error("Please add a valid phone number!")
    const response = await update(updateData)
    if (!response) return toast.error("Unable to update your profile!")
    toast.success("Your profile updated successfully!")
    setIsEditable(false)
    refresh()
  }

  return (
    <div className="edit container">
      <div className="edit-header">
        <div>
          <p className="title">Profile information</p>
          <p>Here you can edit public information about yourself.</p>
        </div>
        { isEditable
          ? <button className="solid" onClick={updateUserProfile}>Save</button>
          : <button className="solid" onClick={() => setIsEditable(true)}>Edit Profile</button>
        }
      </div>
      <div className="edit-data">
        <div>
          <p>Name</p>
          { isEditable
            ? <input type="text" name="name" value={updateData.name} onChange={onInputChange} />
            : <p>{ user.name }</p>
          }
        </div>
        <div>
          <p>Email</p>
          { isEditable
            ? <input type="text" name="email" value={updateData.email} onChange={onInputChange} />
            : <p>{ user.email }</p>
          }
        </div>
        <div>
          <p>Phone</p>
          { isEditable
            ? <input type="text" name="phone" value={updateData.phone} onChange={onInputChange} />
            : <p>{ user.phone }</p>
          }
        </div>
        <div>
          <p>Company</p>
          <p>{ user?.company?.name }</p>
        </div>
        <EditAvatar />
      </div>
    </div>
  )
}

export default EditProfile