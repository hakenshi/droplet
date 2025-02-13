'use client'

import React, { useState } from 'react'
import { easeIn, motion } from 'framer-motion'
import Posts from '../posts/posts'

type TabState = 'posts' | 'midias' | 'liked_posts'

type TabButtonProps = {
  label: string
  active: boolean
  disabled: boolean
  onClick: () => void
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, disabled, onClick }) => (
  <div className="relative mx-3">
    <button
      className={`relative z-10 p-2 w-full transition-colors duration-500 ${active ? 'text-zinc-700' : 'text-gray-500'
        }`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
    {/* Linha fixa */}
    <div className="absolute bottom-0 left-0 w-full rounded-full h-[2px] bg-zinc-300" />
    {/* Linha animada */}
    <motion.div
      className="absolute bottom-0 left-0 w-full rounded-full h-[2px] bg-gradient"
      initial={{ scaleX: active ? 1 : 0 }}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: easeIn }}
      style={{ originX: 0.5 }}
    />
  </div>
)


export default function UserProfileTabs({ posts, likedPosts }: { posts: PostSuccessResponse[], likedPosts: PostSuccessResponse[] }) {

  const [activeTab, setActiveTab] = useState<TabState>('posts')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTabChange = (tab: TabState) => {
    if (activeTab !== tab) {
      setIsAnimating(true)
      setActiveTab(tab)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }


  return (
    <div className="px-5">
      <div className="grid grid-cols-3">
        <TabButton
          label="Posts"
          active={activeTab === 'posts'}
          disabled={isAnimating}
          onClick={() => handleTabChange('posts')}
        />
        <TabButton
          label="Midias"
          active={activeTab === 'midias'}
          disabled={isAnimating}
          onClick={() => handleTabChange('midias')}
        />
        <TabButton
          label="Curtidas"
          active={activeTab === 'liked_posts'}
          disabled={isAnimating}
          onClick={() => handleTabChange('liked_posts')}
        />
      </div>
      <div className="mt-5">
        {activeTab === 'posts' && <Posts posts={posts} />}
        {activeTab === 'liked_posts' && <Posts posts={likedPosts} />}
        {/* {activeTab === 'midias' && <Midias/>} */}
      </div>
    </div>
  )
}
