import { BehaviorSubject, filter } from "rxjs"
import { login as loginRequest, token$, updateUser, endSession, type UserType, type UpdateType, UserSchema } from "../api/users"
import jwt_decode from "jwt-decode"

const decodeToken = (token: string | null): UserType | null => {
  if (!token) return null
  const decoded = jwt_decode(token)
  const result = UserSchema.safeParse(decoded)
  if (!result.success) return null
  return result.data
}

const user$ = new BehaviorSubject<UserType | null>(decodeToken(localStorage.getItem("token")))

token$.pipe(filter((token) => !token)).subscribe(() => user$.next(null))

type Callback = {
  onSuccess: () => void,
  onError: () => void
}

const login = async (code: string, callback: Callback): Promise<void> => {
  const response = await loginRequest(code)
  if (!response.success) return callback.onError()
  const user = decodeToken(response.data)
  if (!user) return callback.onError()
  user$.next(user)
  callback.onSuccess()
}

const logout = () => endSession()

const update = async (data: UpdateType) => {
  const response = await updateUser(data)
  if (!response.success) return null
  const user = decodeToken(response.data)
  user$.next(user)
  localStorage.setItem("token", response.data)
}

export { user$, login, logout, update }