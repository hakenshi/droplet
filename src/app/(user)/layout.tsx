import React from 'react'
import BaseLayout from '@/components/base-layout';
import { getAuthUser } from '@/utils/getAuthUser';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

  const { token } = await getAuthUser()

  return (
    <BaseLayout token={token}>
      {children}
    </BaseLayout>
  );
}