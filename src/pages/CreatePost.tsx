import PostForm from '@/components/form/PostForm'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function CreatePost() {
  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Create Post" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileImage noStatus size="size-12 md:size-16" />

            <p className="text-xl md:text-2xl font-medium">Joshua Friday</p>
          </div>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}
