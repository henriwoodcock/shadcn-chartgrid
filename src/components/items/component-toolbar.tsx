import { TooltipProvider } from "../ui/tooltip"
import { sizeOptions, type ItemData, type Sizes } from "./item";
import { ResizeComponentButton } from "./resize-component"
import { DeleteComponentButton } from "./delete-component"

interface ComponentToolbarProps {
    updateSize: (size: Sizes) => void;
    onDelete: () => void;
    item: ItemData;
}

export const ComponentToolbar = (props: ComponentToolbarProps) => {
    const {
        updateSize, onDelete, item,
    } = props;
    return (
        <TooltipProvider>
            <div className="flex flex-row gap-0">
                <ResizeComponentButton
                    sizes={sizeOptions}
                    updateSize={updateSize}
                    currentSize={item.size}
                />
                <DeleteComponentButton onDelete={onDelete} />
            </div>
        </TooltipProvider>
    )
}
