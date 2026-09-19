export type AvailableServices = {
  serviceImage: string
  serviceName: string
  category: string
}

export type Service = {
  service_id: string
  name: string
  attachments: [
    {
      image_url: string
    },
  ]
}
