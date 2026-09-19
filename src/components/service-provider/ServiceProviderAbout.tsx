export default function ServiceProviderAbout({
  about,
}: {
  about?: string | undefined
}) {
  return (
    <>
      {about && (
        <p className="text-sm md:text-base whitespace-pre-line">{about}</p>
      )}
    </>
  )
}
