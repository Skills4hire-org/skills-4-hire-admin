import Services from './Services'
import { useMyProfile } from '@/hooks/useUsers'
import type { Profile } from '@/types/user.types'
import Activity from './Activity'
import AboutGallery from './AboutGallery'
import Overview from './Overview'
import CoverPhoto from './CoverPhoto'
import Loading from '../global/Loading'
import Error from '../global/Error'

export default function ServiceProviderProfile() {
  const { data, isLoading, isError, refetch } = useMyProfile()
  const professional: Profile | undefined = data

  const handleProfileFetchingError = () => {
    refetch()
  }

  return (
    <>
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {isError && !data ? (
            <div className="py-6">
              <Error
                text="Failed to load your profile"
                buttonFunc={handleProfileFetchingError}
              />
            </div>
          ) : (
            <div className="-mt-2 md:-mt-6">
              <div>
                <CoverPhoto
                  cover_photo={
                    professional?.user?.profile?.cover_photo?.image_url
                  }
                />
                <Overview professional={professional} />
                <div>
                  <AboutGallery
                    about={professional?.overview}
                    gallery={professional?.gallary}
                  />
                  <Activity
                    posts={professional?.posts}
                    comments={professional?.comments}
                    media={professional?.media}
                  />
                  <Services
                    services={professional?.services}
                    profession={professional?.professional_title}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
