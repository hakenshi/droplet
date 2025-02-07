import React from 'react'
import BaseLayout from '@/components/base-layout';
import { getUsers } from '@/utils/user';
import { getAuthUser } from '@/utils/getAuthUser';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

  const { token } = await getAuthUser()
  const {users} = await getUsers(token)

  return (
    <BaseLayout users={users}>
      {children}
    </BaseLayout>
  );
}