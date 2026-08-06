import React from 'react'
import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
  description?: string
  url?: string
  image?: string
}

export default function Head({
  title = 'Your Site Title',
  description = 'Your site description',
  url = 'https://your-domain.example',
  image,
}: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
    </Helmet>
  )
}
