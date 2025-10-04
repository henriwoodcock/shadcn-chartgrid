import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import type { Sizes } from "./item";

interface ResizeComponentButtonProps {
    sizes: Sizes[];
    currentSize: Sizes;
    updateSize: (size: Sizes) => void
}

export const ResizeComponentButton = (
    { sizes, currentSize, updateSize }: ResizeComponentButtonProps
) => {
    const isBiggest = currentSize === sizes[sizes.length - 1];
    const currentIndex = sizes.indexOf(currentSize);
    const nextSize = isBiggest ? sizes[0] : sizes[currentIndex + 1];
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={() => updateSize(nextSize)}
                    variant='ghost'
                    size='icon'
                >
                    { isBiggest ? <Minimize2/> : <Maximize2 /> }
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>
                    {isBiggest ? 'Minimize' : 'Maximize'} component
                </p>
            </TooltipContent>
        </Tooltip>
    )
}
