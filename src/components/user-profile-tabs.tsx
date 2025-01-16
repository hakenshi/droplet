'use client'

import React, { useReducer } from 'react'
import { Button } from './ui/button'

type TabState = "posts" | "midias"
type Action = { type: "CHANGE_TAB", payload: TabState }

const reducer = (state: TabState, action: Action) => {
    switch (action.type) {
        case "CHANGE_TAB":
            return action.payload
        default:
            return state
    }
}

export default function UserProfileTabs() {

    const [activeTab, dispatch] = useReducer(reducer, "posts")

    const changeTab = () => {
        switch (activeTab) {
            case "posts":
                return <h1>Posts</h1>
            case "midias":
                return <h1>Midias</h1>
            default:
                return null
        }
    }

    return (
        <div className='py-5'>
            <div className='grid grid-cols-2'>
                <button className={`text-center ${activeTab === "posts" ? "bg-gradient" : "bg-zinc-300"} pb-[2px]`} onClick={() => dispatch({ type: "CHANGE_TAB", payload: "posts" })}>
                    <div className='bg-white p-2'>
                        Posts
                    </div>
                </button>
                <button className={`text-center ${activeTab === "midias" ? "bg-gradient" : "bg-zinc-300"} pb-[2px]`} onClick={() => dispatch({ type: "CHANGE_TAB", payload: "midias" })}>
                    <div className='bg-white p-2'>
                        Midias
                    </div>
                </button>
            </div>
            {changeTab()}
        </div>
    )
}
