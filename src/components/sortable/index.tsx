import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const sizeMap = {
    "1x1": "col-span-1 row-span-1",
    "2x2": "col-span-2 row-span-2",
    "3x3": "col-span-3 row-span-3",
};

interface SortableItemProps {
    id: string;
    size?: '1x1' | '2x2' | '3x3';
    children: React.ReactNode;
}


export const SortableItem: React.FC<SortableItemProps> = ({ id, size ='1x1', children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`w-full h-full ${sizeMap[size]}`}
            {...attributes}
            {...listeners}
        >
            { children }
        </div>
    );
};
