import { UsersPermissionsMe } from '@generated/graphql'

export interface StateProps {
  isLoading: boolean
  isSignout: boolean
  infoUser: {
    token: string
    user: UsersPermissionsMe
  }
}
