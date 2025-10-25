import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const ProfilePage = async() => {
  const session = await auth()

  if(!session){
    redirect('/sign-in')
  }
  return (
    <div>This is profile page and this should be protected.</div>
  )
}

export default ProfilePage