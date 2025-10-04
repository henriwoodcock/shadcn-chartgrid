import type { GridItem } from "@/components/grid";
import { SortableItem } from "@/components/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { JSX } from "react";
import { ComponentToolbar } from "./component-toolbar";

export type Sizes = '1x1' | '2x2' | '3x3';
export const sizeOptions: Sizes[] = ['1x1', '2x2', '3x3'];
export interface ItemData extends GridItem {
    title: string;
    size: Sizes;
    description: string;
}

export interface ItemProps extends ItemData {
    children: JSX.Element;
    onUpdate: (item: GridItem) => void;
    onDelete: () => void;
}

const Item = (props: ItemProps) => {
    const { onUpdate, onDelete } = props;
    const updateSize = (size: Sizes) => {
        onUpdate(
            {
                ...props,
                size,
            }
        );
    };
    return (
        <SortableItem id={props.id} size={props.size}>
            <Card className='h-full active:cursor-grabbing cursor-grab'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle>
                            {props.title}
                        </CardTitle>
                    </div>
                    <ComponentToolbar
                        updateSize={updateSize}
                        onDelete={onDelete}
                        item={props}
                    />
                </CardHeader>
                <CardContent>
                    { props.children }
                </CardContent>
            </Card>
        </SortableItem>
    );
}

export default Item;
