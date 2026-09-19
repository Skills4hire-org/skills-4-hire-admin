import {
  addServices,
  addToGallery,
  deleteCoverPhoto,
  deleteFromGallery,
  deleteProfileImage,
  deleteService,
  getMyGallery,
  getMyProfile,
  getMyServices,
  getProviderDetails,
  getProviders,
  getUserGallery,
  getUserServices,
  updateCoverPhoto,
  updateMyProfile,
  updateProfileImage,
} from '@/api/profile'
import type { Gallery, ProviderParams, Service } from '@/types/user.types'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAllProviders = ({
  search,
  profession,
  min_charge,
  ratings,
}: ProviderParams) => {
  const queryData = useInfiniteQuery({
    queryKey: ['providers', search, profession, min_charge, ratings],
    queryFn: ({ pageParam }) =>
      getProviders({ pageParam, search, profession, min_charge, ratings }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyProfile = () => {
  const getProfile = async () => {
    const profile = await getMyProfile()
    return profile?.data
  }
  const queryData = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  return queryData
}

export const useUpdateMyProfile = () => {
  const updateProfileAction = async (data: any) => {
    try {
      await updateMyProfile(data)
      toast.success('Profile updated')
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const updateProfileFunction = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
  return updateProfileFunction
}

export const useMyServices = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['profile-services'],
    queryFn: ({ pageParam }) => {
      return getMyServices(pageParam)
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useUserServices = ({ id }: { id: string | undefined }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['profile-services'],
    queryFn: ({ pageParam }) => getUserServices({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useAddServices = () => {
  const addServicesAction = async (data: Service) => {
    try {
      await addServices(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addServicesFunction = useMutation({
    mutationFn: addServicesAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-services'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return addServicesFunction
}
export const useDeleteService = () => {
  const deleteServiceAction = async (id?: string) => {
    try {
      await deleteService(id)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteServiceFunction = useMutation({
    mutationFn: deleteServiceAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-services'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
  return deleteServiceFunction
}

export const useAddToGallery = () => {
  const addToGalleryAction = async (data: Gallery[]) => {
    try {
      await addToGallery(data)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addToGalleryFunction = useMutation({
    mutationFn: addToGalleryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return addToGalleryFunction
}

export const useMyGallery = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: ({ pageParam }) => getMyGallery(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useUserGallery = ({ id }: { id?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: ({ pageParam }) => getUserGallery({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useProfileDetails = ({ id }: { id?: string }) => {
  const getProfile = async () => {
    const profile = await getProviderDetails(id)
    return profile
  }
  const queryData = useQuery({
    queryKey: ['profile', id],
    queryFn: getProfile,
  })
  return queryData
}

export const useUpdateCoverPhoto = () => {
  const updateCoverPhotoAction = async (data: {
    image_url: string
    public_url: string
  }) => {
    try {
      await updateCoverPhoto(data)
      toast.success('Cover photo saved')
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const updateCoverPhotoFunction = useMutation({
    mutationFn: updateCoverPhotoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return updateCoverPhotoFunction
}

export const useUpdateProfileImage = () => {
  const updateProfileImageAction = async (data: {
    avatar: string
    avatar_public_id: string
    description: string
  }) => {
    try {
      await updateProfileImage(data)
      toast.success('Profile image saved')
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const updateProfileImageFunction = useMutation({
    mutationFn: updateProfileImageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return updateProfileImageFunction
}

export const useDeleteCoverPhoto = () => {
  const deleteCoverPhotoAction = async () => {
    try {
      await deleteCoverPhoto()
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteCoverPhotoFunction = useMutation({
    mutationFn: deleteCoverPhotoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
  return deleteCoverPhotoFunction
}
export const useDeleteProfileImage = () => {
  const deleteProfileImageAction = async () => {
    try {
      await deleteProfileImage()
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteProfileImageFunction = useMutation({
    mutationFn: deleteProfileImageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
  return deleteProfileImageFunction
}
export const useDeleteFromGallery = () => {
  const deleteFromGalleryAction = async (image_id?: string) => {
    try {
      await deleteFromGallery(image_id)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteFromGalleryFunction = useMutation({
    mutationFn: deleteFromGalleryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['media'] })
    },
  })
  return deleteFromGalleryFunction
}
