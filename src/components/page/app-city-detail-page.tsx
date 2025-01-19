import React from 'react'
import { useParams } from 'react-router'

export const DetailPage = () => {
  const { id } = useParams()

  return (
    <div>DetailPage {id}</div>
  )
}
