import { Project } from './project.interface'
import { User } from './user.interface'

export interface Donation {
  id: string
  status: 'success' | 'pending' | 'failure'
  type: 'regular' | 'recurring'
  amount: number
  createdDate: string
  userId: User['uid']
  projectId: Project['id']
  paymentId: string | null
  preferenceId: string | null
}
