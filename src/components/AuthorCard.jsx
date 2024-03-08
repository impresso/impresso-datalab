import React from 'react'
import { useDataStore } from '../store'

const AuthorCard = ({ name }) => {
  const getAuthorByName = useDataStore((state) => state.getAuthorByName)
  const author = getAuthorByName(name)
  return <b>{author.fullName || name}</b>
}

export default AuthorCard
