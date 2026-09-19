import CreateOfferForm from '@/components/form/OfferForm'
import Container from '@/components/global/Container'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useCreatePost } from '@/hooks/usePosts'
import type { CreatePost } from '@/types/post.types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateOffer() {
  const { mutate: createOffer } = useCreatePost()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const onSubmit = (allData: CreatePost) => {
    createOffer(allData, {
      onSuccess: () => {
        navigate('/customer/home/my-offer')
      },
      onError: () => {
        setIsSubmitting(false)
      },
    })
  }

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Create An Offer" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileImage noStatus size="size-12 md:size-16" />
            <p className="text-xl md:text-2xl font-medium">Joshua Friday</p>
          </div>
          <CreateOfferForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onSubmit={onSubmit}
          />
        </div>
      </Container>
    </div>
  )
}
