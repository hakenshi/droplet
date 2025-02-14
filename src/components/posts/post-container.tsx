import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export default function PostContainer({ children }: { children: ReactNode }) {
    return (
        <Card className='rounded-sm shadow'>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
