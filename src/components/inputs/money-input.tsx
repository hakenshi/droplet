import useMoney from '@/lib/hooks/useMoney'
import { DollarSign } from 'lucide-react'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    donationValue?: number
}

export default function MoneyInput({ donationValue, ...rest }: MoneyInputProps) {

    const { donation, formattedDonation, setDonation, setFormattedDonation } = useMoney()

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
        <div className='flex flex-col'>
            <div className={`inline-flex gap-2 my-2 items-center border ${donation > 0 && donation < 10 && "border-red-700"} rounded px-4 py-2 placeholder:text-zinc-500`}>
                <DollarSign className='text-zinc-700' />
                <input
                    className='focus:outline-none w-full'
                    value={formattedDonation}
                    type='text'
                    placeholder='0.00'
                    onChange={handleFormattedDonation}
                    {...rest}
                />
            </div>
            <span className='text-zinc-500 text-sm'>
                insira um valor entre $10.00 e ${donationValue ?? "2000.00"}
            </span>
        </div>
    )
}
