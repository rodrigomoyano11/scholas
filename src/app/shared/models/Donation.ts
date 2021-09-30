import { Project } from './Project'
import { User } from './User'

export interface Donation {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  type: 'regular' | 'recurring'
  amount: number
  createdDate: string
  userId: User['uid']
  projectId: Project['id']
  paymentId: string
}
