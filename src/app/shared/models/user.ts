/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserInfo } from 'firebase/auth'

export interface User {
  uid: UserInfo['uid']
  displayName: UserInfo['displayName']
  photoURL: UserInfo['photoURL']
  email: UserInfo['email']
  token: string | null
  isLogged: boolean
  isEmailVerified: boolean
  claims: Claims | null
  extraData: ExtraData | null
}

interface Claims {
  admin?: boolean
  donor?: boolean
  [key: string]: boolean | any
}

interface ExtraData {
  birthday: string | null
  phoneNumber: UserInfo['phoneNumber']
  location: Location | null
}
interface Location {
  province: string | null
  locality: string | null
}
