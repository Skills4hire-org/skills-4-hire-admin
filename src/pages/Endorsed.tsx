import EndorsedCard from '@/components/endorse/EndorsedCard'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'

export default function Endorsed() {
  return (
    <div className="min-h-screen ">
      <div className="capitalize">
        <HeaderWithBackNavigation title="Endorsed" />
      </div>
      <Container>
        <EndorsedCard />
        <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8 md:gap-9 md:ml-0">
          {/*   {isLoading ? (
                  <div className="h-24">
                    <Loading />
                  </div>
                ) : (
                  <>
                    {!isError ? (
                      <div className="py-10">
                        <Error
                          text="Failed to load endosers"
                          buttonFunc={handleProviderFetchingError}
                        />
                      </div>
                    ) : <div>
  
                    </div> }
                  </>
                )} */}
        </div>
      </Container>
    </div>
  )
}
