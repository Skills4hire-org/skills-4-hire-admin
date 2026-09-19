import { supportOptions } from '@/assets/data'
import Container from '@/components/global/Container'
import SupportOptionsCard from '@/components/support/SupportOptionsCard'
import MobileWithAvatarAndDesktopHeader from '@/components/header/MobileWithAvatarAndDesktopHeader'
import { MessageCircle } from 'lucide-react'
import { chatWithSupport } from '@/api/chat'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Support() {
  const navigate = useNavigate()

  const handleChatWithSupport = async () => {
    try {
      const response = await chatWithSupport()
      navigate(`/chats/${response.room_id}/`)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <Container className="bg-white">
        <MobileWithAvatarAndDesktopHeader title="Support" />
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-2 md:gap-4">
          <button
            className=" flex items-center gap-2 md:gap-4 rounded-md bg-white p-2 md:p-3 cursor-pointer"
            onClick={handleChatWithSupport}
          >
            <div className="p-2 md:p-4 bg-gray-300 w-max rounded-full">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h2 className="text-sm md:text-base">Chat with customer support</h2>
          </button>
          {supportOptions.map((support) => (
            <SupportOptionsCard key={support.text} {...support} />
          ))}
        </div>
      </Container>
    </div>
  )
}
