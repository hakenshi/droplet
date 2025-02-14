import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export default function CommentContainer({ children }: { children: ReactNode }) {
    return (
        <Card className='rounded-sm shadow-none border-y-0 border-x-0'>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
