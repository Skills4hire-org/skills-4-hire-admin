import OfferForm from '@/components/form/OfferForm'
import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ProfileImage from '@/components/global/ProfileImage'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { useEditPost, usePost } from '@/hooks/usePosts'
import type { CreatePost } from '@/types/post.types'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateOffer() {
  const { id } = useParams()
  const { data: offer, isError, isLoading } = usePost({ post_id: id })
  const { mutate: updateOffer } = useEditPost()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const onSubmit = (allData: CreatePost) => {
    updateOffer(
      { post_id: id, data: allData },
      {
        onSuccess: () => {
          navigate('/customer/home/my-offer')
        },
        onError: () => {
          setIsSubmitting(false)
        },
      },
    )
  }

  const handlePostFetchingError = () => {}

  return (
    <div className="pb-10">
      <HeaderWithBackNavigation title="Edit Offer" />
      <Container className="pt-1 max-w-2xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileImage noStatus size="size-12 md:size-16" />

            <p className="text-xl md:text-2xl font-medium">Joshua Friday</p>
          </div>
          {isLoading ? (
            <div className="h-24">
              <Loading />
            </div>
          ) : (
            <>
              {!isError ? (
                <div className="py-10">
                  <Error
                    text="Failed to load offer"
                    buttonFunc={handlePostFetchingError}
                  />
                </div>
              ) : (
                <OfferForm
                  offer={offer}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}
