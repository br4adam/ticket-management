import Avatar from "../../components/Avatar"
import avatars from "../../assets/avatars"
import getFilename from "../../utils/getFilename"
import { update, user$ } from "../../states/user"
import useGlobal from "../../hooks/useGlobal"

const EditAvatar = () => {
  const user = useGlobal(user$)

  return (
    <div className="edit-avatar">
      <p>Avatar</p>
      <section className="avatars">
        { avatars.map(image => <Avatar key={image} image={image} onClick={() => update({ avatar: getFilename(image) })} selected={image.includes(user?.avatar!)} />)}
      </section>
    </div>
  )
}

export default EditAvatar