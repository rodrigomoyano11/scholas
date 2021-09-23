/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserInfo } from 'firebase/auth'
import { Location } from './Location'

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

export interface ExtraData {
  birthday: '1900-01-01' | string
  phoneNumber: UserInfo['phoneNumber']
  location: Location | null
}
