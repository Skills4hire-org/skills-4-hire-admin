import Container from '@/components/global/Container'
import Error from '@/components/global/Error'
import Loading from '@/components/global/Loading'
import ServiceProviderActivity from '@/components/service-provider/ServiceProviderActivity'
import ServiceProviderOverview from '@/components/service-provider/ServiceProviderOverview'
import ServiceProviderServices from '@/components/service-provider/ServiceProviderServices'
import ServiceProviderTab from '@/components/service-provider/ServiceProviderTab'
import { Button } from '@/components/ui/button'
import { useCreateConversation } from '@/hooks/useChats'
import { useProfileDetails } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'
import type { UserType } from '@/utils/types'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ServiceProviderProfile() {
  const { id } = useParams()
  const { data, isLoading, isError, refetch } = useProfileDetails({ id })
  const profile: Profile | undefined = data

  const { userType }: { userType: UserType } = useSelector(
    (state: any) => state.userState,
  )
  const { mutate: createConversation, isPending } = useCreateConversation()
  const handleProfileFetchingError = () => {
    refetch()
  }

  const navigate = useNavigate()
  const handleMessageMe = () => {
    const response = createConversation(
      {
        participant_two_id: id!,
      },
      {
        onSuccess: () => {
          navigate(`/customer/chats/${response}`)
        },
      },
    )
  }

  return (
    <>
      <ServiceProviderOverview profile={profile} />
      <div className="pb-10">
        {isLoading ? (
          <div className="h-24">
            <Loading />
          </div>
        ) : (
          <>
            {isError && !data ? (
              <div className="py-10">
                <Error
                  text="Failed to load profile"
                  buttonFunc={handleProfileFetchingError}
                />
              </div>
            ) : (
              <>
                <Container className="border-b-8 py-2 md:py-4 relative">
                  <ServiceProviderTab
                    about={profile?.overview}
                    gallery={profile?.gallary}
                    user_id={id}
                  />
                </Container>
                <Container className="border-b-8 py-2 md:py-4 relative">
                  <ServiceProviderActivity
                    posts={profile?.posts}
                    comments={profile?.comments}
                    media={profile?.media}
                    user_id={id}
                  />
                </Container>
                {profile?.services && (
                  <Container className="border-b-8 pt-2 pb-4 md:py-4 relative">
                    <ServiceProviderServices
                      services={profile?.services}
                      user_id={id}
                      profession={profile?.professional_title}
                    />
                  </Container>
                )}
                <div className="flex items-center justify-center gap-8 md:gap-10 fixed left-1/2 -translate-x-1/2 bottom-16 md:bottom-4 md:ml-[6rem] z-50">
                  <Button
                    className="bg-green-700 rounded-sm hover:bg-green-700/80 w-30"
                    onClick={handleMessageMe}
                    disabled={isPending}
                  >
                    Message Me
                  </Button>
                  {userType == 'customer' && (
                    <Link to={`/customer/professionals/${id}/booking`}>
                      <Button className="w-30">Book Me</Button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
