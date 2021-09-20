import { Location, User } from './user'

export interface Project {
  id: string
  name: string
  description: string | null
  visibility: 'public' | 'private'
  createdDate: string

  status: 'started' | 'inProgress' | 'finished'

  location: Location

  coverPhotoURL: string
  photos: string[]
  videoURL: string

  donors: User['uid'][]
  //   donations: Donation['id'][]

  metricts: Metrics
}

interface Metrics {
  donorsQuantity: number
  donationsQuantity: number

  currentAmount: number
  targetAmount: number
  remainingAmount: number
}
