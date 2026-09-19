export type Referral = {
  referral_id: string
  status: string
  referred: {
    profile: {
      display_name: string
      avatar: {
        avatar: string
      }
    }
  }
}

export type ReferralDetails = {
  code: string
  referral_link: string
  created_at: string
  balance: number
  total_referrals: number
  referrals: Referral[]
}
