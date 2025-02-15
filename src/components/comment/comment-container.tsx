import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export default function CommentContainer({ children }: { children: ReactNode }) {
    return (
        <Card className='rounded-sm shadow-none border-b last:border-b-0 border-x-0 border-t-0'>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
