// export interface User {
//   display_name: string
//   email: string
//   phone_number: string | null
//   photo_url: string | null
//   provider_id: string
//   uid: string
//   custom_claims: { [key: string]: boolean }

//   [key: string]: string | { [key: string]: string | boolean } | null
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

import firebase from 'firebase'

export interface User {
  uid: firebase.UserInfo['uid']
  displayName: firebase.UserInfo['displayName']
  photoURL: firebase.UserInfo['photoURL']
  email: firebase.UserInfo['email']
  token: string | null
  isLogged: boolean
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
  phoneNumber: firebase.UserInfo['phoneNumber']
  location: Location | null
}
interface Location {
  province: string | null
  locality: string | null
}
