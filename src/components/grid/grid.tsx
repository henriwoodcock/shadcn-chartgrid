// packages/core/src/Dashboard.tsx
import React from "react";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import type { ItemData } from "../items/item";

export interface GridItem {
    id: string;
    type: string;
    [key: string]: any;
}

export interface GridProps {
    items: ItemData[];
    components: Record<string, React.ComponentType<any>>;
    onItemsChange: (items: ItemData[]) => void;
    onUpdate: (item: ItemData) => void;
    onDelete: (item: ItemData) => void;
}

export const Grid: React.FC<GridProps> = ({
    items,
    components,
    onItemsChange,
    onUpdate,
    onDelete,
}) => {
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const updated = arrayMove(items, oldIndex, newIndex);
        onItemsChange(updated);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-flow-row-dense grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
                    {
                        items.map((item) => {
                            const Component = components[item.type];
                            if (!Component) return null;
                            return (
                                <Component
                                    key={item.id}
                                    {...item}
                                    onDelete={() => onDelete(item)}
                                    onUpdate={onUpdate}
                                />
                            );
                        })
                    }
                </div>
            </SortableContext>
        </DndContext>
    );
};
