import React from 'react'
import { getAuthUser } from '@/utils/getAuthUser';
import BaseLayout from '@/components/base-layout';
import { getUsers } from '@/utils/user';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {

  const { token } = await getAuthUser()
  
  const { users } = await getUsers(token)

  return (
    <BaseLayout users={users}>
      {children}
    </BaseLayout>
  );
}