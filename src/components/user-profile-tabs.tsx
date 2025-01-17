'use client'

import React, { useReducer, useState } from 'react'
import { easeIn, easeInOut, motion } from "framer-motion"

// Tipos para o estado e ação
type TabState = "posts" | "midias"
type Action = { type: "CHANGE_TAB", payload: TabState }

// Reducer para gerenciar o estado da aba ativa
const reducer = (state: TabState, action: Action) => {
    switch (action.type) {
        case "CHANGE_TAB":
            return action.payload
        default:
            return state
    }
}

export default function UserProfileTabs() {
    const [activeTab, dispatch] = useReducer(reducer, "posts") // Estado da aba ativa
    const [isAnimating, setIsAnimating] = useState(false)

    // Renderiza o conteúdo de cada aba
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

    // Lógica para trocar de aba
    const handleDispatch = (tab: TabState) => {
        if (activeTab !== tab) {
            setIsAnimating(true)
            dispatch({ type: "CHANGE_TAB", payload: tab })
            setTimeout(() => {
                setIsAnimating(false)
            }, 1000)
        }
    }

    return (
        <div className="px-5">
            <div className="grid grid-cols-2">
                {/* Aba de Posts */}
                <div className="relative">
                    <button
                        className={`relative z-10 p-2 w-full transition-colors duration-500 ${
                            activeTab === "posts" ? "text-zinc-700" : "text-gray-500"
                        }`}
                        disabled={isAnimating}
                        onClick={() => handleDispatch("posts")}
                    >
                        Posts
                    </button>
                    {/* Linha fixa para aba inativa */}
                    <div
                        className={`absolute bottom-0 left-0 w-11/12 h-[2px] bg-zinc-300`}
                    />
                    {/* Linha animada para aba ativa */}
                    <motion.div
                        className={`absolute bottom-0 left-0 w-11/12 h-[2px] bg-gradient`}
                        initial={{ scaleX: 1 }}
                        animate={{
                            scaleX: activeTab === "posts" ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: easeIn }}
                        style={{ originX: 0.5 }}
                       
                    />
                </div>

                {/* Aba de Midias */}
                <div className="relative">
                    <button
                        className={`relative z-10 p-2 w-full transition-colors duration-500 ${
                            activeTab === "midias" ? "text-zinc-700" : "text-zinc-500"
                        }`}
                        onClick={() => handleDispatch("midias")}
                        disabled={isAnimating}
                    >
                        Midias
                    </button>
                    {/* Linha fixa para aba inativa */}
                    <div
                        className={`absolute bottom-0 left-0 w-11/12 h-[2px] bg-zinc-300`}
                    />
                    {/* Linha animada para aba ativa */}
                    <motion.div
                        className={`absolute bottom-0 left-0 w-11/12 h-[2px] bg-gradient`}
                        initial={{ scaleX: 0 }}
                        animate={{
                            scaleX: activeTab === "midias" ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: easeIn }}
                        style={{ originX: 0.5 }}
                    />
                </div>
            </div>
            <div className="mt-5">{changeTab()}</div>
        </div>
    )
}
