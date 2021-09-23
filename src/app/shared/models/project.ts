import { Location } from './Location'

export interface Project {
  id: number
  name: string
  description: string | null

  visibility: 'public' | 'private'
  status: 'started' | 'inProgress' | 'finished'

  location: Location

  coverPhotoURL: string
  photos: string[]
  videoURL: string

  // donors: User['uid'][]
  // donations: Donation['id'][]

  createdDate: string

  metrics: Metrics
}

interface Metrics {
  donorsQuantity: number
  donationsQuantity: number

  currentAmount: number
  targetAmount: number
  remainingAmount: number
}
