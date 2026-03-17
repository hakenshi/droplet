import BaseLayout from '@/components/base-layout';
import React from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <BaseLayout>
     {children}
    </BaseLayout>
  );
}