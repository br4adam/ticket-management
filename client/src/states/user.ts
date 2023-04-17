import { BehaviorSubject } from "rxjs"
import { login as loginRequest, updateUser, type UserType, type UpdateType, UserSchema } from "../api/users"
import jwt_decode from "jwt-decode"

const decodeToken = (token: string | null): UserType | null => {
  if (!token) return null
  const decoded = jwt_decode(token)
  const result = UserSchema.safeParse(decoded)
  if (!result.success) return null
  return result.data
}

const user$ = new BehaviorSubject<UserType | null>(decodeToken(localStorage.getItem("token")))

type Callback = {
  onSuccess: () => any,
  onError: () => any
}

const login = async (code: string, callback: Callback): Promise<void> => {
  const token = await loginRequest(code)
  const user = decodeToken(token)
  if (!user) return callback.onError()
  user$.next(user)
  localStorage.setItem("token", token!)
  callback.onSuccess()
}

const logout = () => {
  user$.next(null)
  localStorage.removeItem("token")
}

const update = async (data: UpdateType) => {
  const token = await updateUser(data)
  const user = decodeToken(token)
  if (!user) return
  user$.next(user)
  localStorage.setItem("token", token!)
}

export { user$, login, logout, update }