import React from "react";
import { Grid, type GridItem } from "./grid";

const GridPlaceholder: React.FC = () => {
    return (
        <div style={{ border: "1px dashed gray", padding: "1rem" }}>
            Grid Placeholder
        </div>
    );
};

export { Grid, GridPlaceholder };
export type { GridItem };
