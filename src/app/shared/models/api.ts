import { Location } from './Location'
import { Project } from './project'
import { ExtraData, User } from './user'

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
type Status = 'STARTED' | 'IN_PROGRESS' | 'FINISHED'
type Visibility = 'PUBLIC' | 'PRIVATE'

export interface CreateProjectRequest {
  name: Project['name']
  description: Project['description']
  visibility: Visibility
  targetAmount: Project['metrics']['targetAmount']
  province: Project['location']['province']
  locality: Project['location']['locality']
  coverPhotoURL: Project['coverPhotoURL']
  photos: Project['photos']
  videoURL: Project['videoURL']
}
export interface CreateProjectResponse {
  id: Project['id']
  name: Project['name']
  description: Project['description']
  status: Status
  visibility: Visibility
  targetAmount: Project['metrics']['targetAmount']
  currentAmount: Project['metrics']['currentAmount']
  remainingAmount: Project['metrics']['remainingAmount']
  province: Project['location']['province']
  locality: Project['location']['locality']
  coverPhotoURL: Project['coverPhotoURL']
  photos: Project['photos']
  videoURL: Project['videoURL']
  donorsQuantity: Project['metrics']['donorsQuantity']
  donationsQuantity: Project['metrics']['donationsQuantity']
  createdDate: Project['createdDate']
}

export type GetProjectsResponse = GetProjectResponse[]

export type GetProjectResponse = CreateProjectResponse

// Utils

export type GetLocationsResponse = [
  {
    name: string
    departments: string[]
  },
]
