import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export default function CommentContainer({ children }: { children: ReactNode }) {
    return (
        <Card className='border-x-0 border-t-0 border-b last:border-b-0 rounded-sm shadow-none'>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
