import type { SetStateAction } from "react";
import type { ItemProps } from "./item";
import type { GridItem } from "../grid";
import Item from "./item";

export interface ChartProps extends ItemProps {
    onDelete: () => void;
    appId: string;
    setItems: (value: SetStateAction<GridItem[]>) => void
    onUpdate: (item: GridItem) => Promise<void>;
}

export const Chart = (props: ChartProps) => {
    return (
        <Item
            title={props.title}
            description={props.description}
            id={props.id}
            type={props.type}
            size={props.size}
            onUpdate={props.onUpdate}
            onDelete={props.onDelete}
        >
            { props.children }
        </Item>
    )
}
