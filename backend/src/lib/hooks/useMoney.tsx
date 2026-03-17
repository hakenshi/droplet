'use client'

import { useContext, useState, createContext } from "react";

type MoneyContextType = {
    donation: number;
    formattedDonation: string;
    setDonation: (value: number) => void;
    setFormattedDonation: (value: string) => void;
    clearDonationState: VoidFunction;
    handleFormattedDonation: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MoneyContext = createContext<MoneyContextType | undefined>(undefined)

export const MoneyProvider = ({ children, donationValue }: { children: React.ReactNode, donationValue?: number }) => {
    const [donation, setDonation] = useState(0)
    const [formattedDonation, setFormattedDonation] = useState("")

    function clearDonationState() {
        setDonation(0);
        setFormattedDonation("");
    }

    const handleFormattedDonation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = e.target.value.replace(/\D/g, '')
        const numberValue = Number(amount) / 100

        if (numberValue > (donationValue ?? 2000)) return

        const formattedValue = Intl.NumberFormat('en-US', {
            style: "decimal",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }).format(numberValue)
        setFormattedDonation(formattedValue)
        setDonation(numberValue)
    }

    return (
        <MoneyContext.Provider value={{
            donation,
            formattedDonation,
            setDonation,
            setFormattedDonation,
            clearDonationState,
            handleFormattedDonation
        }}>
            {children}
        </MoneyContext.Provider>
    )
}

export const useMoney = () => {
    const context = useContext(MoneyContext)

    if (!context) {
        throw new Error('useMoney must be used within a MoneyProvider')
    }

    return context
}