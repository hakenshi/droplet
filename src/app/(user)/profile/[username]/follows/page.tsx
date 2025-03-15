import React from 'react'
import { getFollowUsers, getUserProfile } from '../../actions/actions'
import Follow from './follow'

export default async function FollowsPage({ params }: { params: { username: string } }) {

  const { username } = await params
  const { following, followers } = await getFollowUsers(username)
  const user = await getUserProfile(username)

  return (
    <Follow user={user} followers={followers} following={following} />
  )
}
