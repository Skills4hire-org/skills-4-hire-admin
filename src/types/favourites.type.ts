import type { Provider } from './user.types'

export type Favorite = {
  favourite_id: string
  providers: Provider[]
}
