import { ExtraData, Location, User } from './user'

export interface GetUserResponse {
  birthday: ExtraData['birthday']
  province: Location['province']
  locality: Location['locality']
  displayName: User['displayName']
  email: User['email']
  phoneNumber: ExtraData['phoneNumber']
  photoUrl: User['photoURL']
  uid: User['uid']
  customClaims: User['claims']
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
