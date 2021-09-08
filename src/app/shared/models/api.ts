import { ExtraData, Location, User } from './user'

export interface GetUserResponse {
  nameDb: User['displayName']
  display_name: User['displayName']
  birthday: ExtraData['birthday']
  province: Location['province']
  locality: Location['locality']
  phoneNumber: string | null
  email: string
  phone_number: string | null
  photo_url: string | null
  provider_id: string
  uid: string
  custom_claims: User['claims']
}
export type GetUsersResponse = GetUserResponse[]

export interface CreateUserRequest {
  displayName: User['displayName']
  birthday: ExtraData['birthday']
  province: Location['province']
  locality: Location['locality']
  phoneNumber: ExtraData['phoneNumber']
}

export interface CreateUserResponse {
  id: User['uid']
  displayName: User['displayName']
  birthday: ExtraData['birthday']
  province: Location['province']
  locality: Location['locality']
  email: User['email']
  photoURL: User['photoURL']
  phoneNumber: ExtraData['phoneNumber']
}
