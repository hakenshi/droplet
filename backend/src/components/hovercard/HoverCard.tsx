import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CalendarIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface HoverCardProps {
    content: string
    openDelay: number
    closeDelay: number
    trigger: ReactNode
}

export default function Hover({trigger, content, openDelay, closeDelay} : HoverCardProps) {

    return (
        <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
            <HoverCardTrigger asChild>
               {trigger}
            </HoverCardTrigger>
            <HoverCardContent>
                {content}
            </HoverCardContent>
        </HoverCard>
    )
}