import { ExtraData, Location, User } from './user'

// Users
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

// Projects
export interface GetProjectsResponse {
  id: number
  name: string
  description: string
  status: 'STARTED' | 'IN_PROGRESS' | 'FINISHED'
  visibility: 'PUBLIC' | 'PRIVATE'
  targetAmount: number
  currentAmount: number
  remainingAmount: number
  locality: string
  province: string
  coverPhotoURL: string
  photos: string[]
  videoURL: string
  donorsQuantity: number
  donationsQuantity: number
  createdDate: string
}

export interface CreateProjectRequest {
  name: string
  description: string
  visibility: string
  targetAmount: number
  currentAmount: number
  locality: string
  province: string
  coverPhotoURL: string
  photos: string[]
  videoURL: string
  donorsQuantity: number
  donationsQuantity: number
}
