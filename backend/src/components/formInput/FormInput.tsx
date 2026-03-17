import { Input } from "../ui/input"
import { Label } from "../ui/label"

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends InputAttributes {
    label?: string
}

export default function FormInput ({label, ...props} : InputProps){
    
    return(
        <div className="flex flex-col items-start gap-1 w-full">
            <Label className="text-gray-400" htmlFor={label}>{label}</Label>
            <Input className="h-10 rounded-full py-2 px-4" {...props} />
        </div>
    )
} 