import { LucideIcon } from "lucide-react"
import { Button, ButtonProps } from "../ui/button"
import { useState } from "react"

interface IconButtonProps extends ButtonProps {
    Icon: LucideIcon
    color: 'red' | 'blue' | 'green' | 'yellow' | 'white'
    hasHoverEffect?: boolean
    children?: React.ReactNode
    hasLiked?: boolean
}

export default function IconButton({ children, Icon, color, hasHoverEffect = true, hasLiked = false, ...rest }: IconButtonProps) {

    const [isHovering, setIsHovering] = useState(false)

    const colors = {
        red: '#f87171',
        blue: '#0ea5e9',
        green: '#34d399',
        yellow: '#fbbf24',
        white: '#fff'
    }

    return (
        <Button
            variant={'ghost'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...rest}
        >
            <div className='flex items-center gap-3 w-full'>
                <Icon color={(isHovering || hasLiked) ? colors[color] : "#000"} fill={(hasHoverEffect && isHovering) || hasLiked ? colors[color] : "#fff"} />
                {children}
            </div>
        </Button>
    )
}