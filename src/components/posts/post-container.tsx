import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostContainer({ children, postId }: { children: ReactNode, postId: number }) {
    
    return (
        <Card className='rounded-sm shadow z-0'>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
