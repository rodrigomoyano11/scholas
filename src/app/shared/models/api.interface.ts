import { Location } from './location.interface'
import { Project } from './project.interface'

import { ExtraData, User } from './user.interface'

// Users
export interface GetUserResponse {
  birthday: ExtraData['birthday']
  province: {
    id: number
    name: Project['location']['province']
  }
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

export interface GetUserIdResponse {
  id: number
}

// Projects
type Status = 'STARTED' | 'IN_PROGRESS' | 'FINISHED'
type Visibility = 'PUBLIC' | 'PRIVATE'

export interface CreateProjectRequest {
  name: Project['name']
  description: Project['description']
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
  province: {
    id: number
    name: Project['location']['province']
  }
  locality: Project['location']['locality']
  coverPhotoURL: Project['coverPhotoURL']
  photos: Project['photos']
  videoURL: Project['videoURL']
  donorsQuantity: Project['metrics']['donorsQuantity']
  donationsQuantity: Project['metrics']['donationsQuantity']
  createdDate: Project['createdDate']
}

export interface ModifyProjectRequest {
  name: Project['name']
  description: Project['description']
  targetAmount: Project['metrics']['targetAmount']
  province: Project['location']['province']
  locality: Project['location']['locality']
  coverPhotoURL: Project['coverPhotoURL']
  photosUrl: Project['photos']
  videoURL: Project['videoURL']
}
export interface ModifyProjectResponse {
  id: Project['id']

  name: Project['name']
  description: Project['description']

  status: Status
  visibility: Visibility

  targetAmount: Project['metrics']['targetAmount']

  currentAmount: Project['metrics']['currentAmount']
  remainingAmount: Project['metrics']['remainingAmount']

  province: {
    id: number
    name: Project['location']['province']
  }
  locality: Project['location']['locality']
  coverPhotoURL: Project['coverPhotoURL']
  photos: Project['photos']
  videoURL: Project['videoURL']

  createdDate: Project['createdDate']

  // Otros
  donorsQuantity: Project['metrics']['donorsQuantity']
  donationsQuantity: Project['metrics']['donationsQuantity']
}

export type GetProjectsResponse = GetProjectResponse[]

export type GetProjectResponse = CreateProjectResponse

// Metrics
export interface GetMetricsResponse {
  headers: unknown
  body: {
    Provinces: { [key: string]: number }
    Amounts: {
      amount0: number
      amount1: number
      amount2: number
      amount3: number
      amount4: number
    }
    Ages: { [key: string]: number }
  }
  statusCodeValue: unknown
  statusCode: unknown
}

export interface GetDonorsByProjectResponse {
  body: {
    totalItems: number
    data: {
      user: {
        id: number
        uid: string
        displayName: string
        birthday: string
        province: GetProvincesResponse[0]
        locality: string
        email: string
        photoURL: string
        phoneNumber: string
        isDeleted: boolean
      }
      donationCount: number
      amount: number
    }[]
    totalPage: number
    currentPage: number
  }
}

// Donations
export type GetDonationsByUserResponse = {
  id: number
  projectId: number
  userId: number
  status: 'SUCCESS' | 'PENDING' | 'FAILURE' | null
  type: 'RECURRING' | 'REGULAR'
  paymentId: null | string
  amount: number
  registerAt: string
  preferenceId: null | string
}[]

export interface GetDonationsByUserAndProjectResponse {
  id: number
  projectId: number
  userId: number
  status: 'SUCCESS' | 'PENDING' | 'FAILURE' | null
  type: 'RECURRING' | 'REGULAR'
  paymentId: null | string
  amount: number
  registerAt: string
  preferenceId: null | string
}

// Utils
export type GetProvincesAndLocalitiesResponse = [
  {
    name: string
    localities: string[]
  },
]
export type GetProvincesResponse = {
  id: number
  name: string
}[]

export type GetDonationAmountsResponse = {
  id: number
  amount1: number
  amount2: number
  amount3: number
  amount4: number
}[]

export interface EditDonationAmountsRequest {
  amount1: number
  amount2: number
  amount3: number
  amount4: number
}
