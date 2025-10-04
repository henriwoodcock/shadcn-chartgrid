import BarChart from "@/components/items/bar-chart";
import React, { useState } from "react";
import { Grid } from "@/components/grid";
import type { ItemData, Sizes } from "./components/items/item";
import { AppPageShell } from "./components/page-shell";
import AreaChart from "./components/items/area-chart";
import { Button } from "./components/ui/button";
import { SquarePlus as SquarePlusIcon, BarChart2, AreaChart as AreaChartIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./components/ui/popover";

const components = {
  'bar-chart': BarChart,
  'area-chart': AreaChart,
}

function App() {
    const initialItems = [
        { id: "123", size: '1x1' as Sizes, type: "bar-chart", title: "Bar Chart 1", description: "This is a bar chart." },
        { id: "321", size: '1x1' as Sizes, type: "bar-chart", title: "Bar Chart 2", description: "This is another bar chart." },
        { id: "456", size: '1x1' as Sizes, type: "area-chart", title: "Area Chart 1", description: "This is an area chart." }
    ];

    const [items, setItems] = useState<ItemData[]>(() => {
        const saved = localStorage.getItem('chartgrid-items');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return initialItems;
            }
        }
        return initialItems;
    });

    React.useEffect(() => {
        localStorage.setItem('chartgrid-items', JSON.stringify(items));
    }, [items]);

    // Helper to generate a unique id
    function generateId() {
        return Math.random().toString(36).slice(2, 10);
    }

    function handleAdd(type: 'bar-chart' | 'area-chart') {
        const titles = {
            'bar-chart': 'Bar Chart',
            'area-chart': 'Area Chart',
        };
        const descriptions = {
            'bar-chart': 'A new bar chart.',
            'area-chart': 'A new area chart.',
        };
        setItems(prev => [
            ...prev,
            {
                id: generateId(),
                size: '1x1',
                type,
                title: `${titles[type]} ${prev.filter(i => i.type === type).length + 1}`,
                description: descriptions[type],
            }
        ]);
    }

    function onUpdate(item: ItemData) {
        setItems(
            (prevItems) => prevItems.map(d => d.id === item.id ? item : d)
        );
    }

    function onDelete(item: ItemData) {
        setItems((prevItems) => prevItems.filter(d => d.id !== item.id))
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <main className="flex-1 space-y-8 pb-24"> {/* Add bottom padding for floating button/footer */}
                <div className="container flex items-start gap-8">
                    <section className="min-h-screen w-full flex-grow">
                        <AppPageShell
                            title='Shadcn Chart Grid'
                            description="A drag and drop grid for charts built with shadcn/ui and dnd-kit."
                        >
                            <Grid
                                items={items}
                                onItemsChange={setItems}
                                components={components}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        </AppPageShell>
                    </section>
                </div>
            </main>
            {/* Floating popover button at the bottom center */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"> {/* Move up to avoid footer overlap */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            size="lg"
                            className="transition-all duration-200 hover:scale-105 focus:ring-4 rounded-full px-7 py-4"
                        >
                            <SquarePlusIcon className="mr-2 w-6 h-6" /> Add item
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-64 text-center">
                        <div className="py-2">
                            <div className="font-semibold mb-2">Add a new item</div>
                            <div className="text-gray-500 text-sm">Choose the type of chart or item to add.</div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    className="flex items-center gap-3 w-full rounded-lg transition p-4"
                                    onClick={() => handleAdd('bar-chart')}
                                >
                                    <span className="p-2"><BarChart2 className="w-6 h-6" /></span>
                                    <span>
                                        <span className="block font-medium">Bar Chart</span>
                                    </span>
                                </Button>
                                <Button
                                    className="flex items-center gap-3 w-full rounded-lg transition p-4"
                                    onClick={() => handleAdd('area-chart')}
                                >
                                    <span className="p-2"><AreaChartIcon className="w-6 h-6" /></span>
                                    <span>
                                        <span className="block font-medium">Area Chart</span>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <footer className="w-full fixed bottom-0 left-0 flex gap-6 flex-wrap items-center justify-center bg-muted/40 py-3 z-40 border-t">
              <div className="flex items-center gap-2">
                  <p className="leading-7">Built by&nbsp;
                    <a href="https://twitter.com/henriwoodcock" className="underline">
                        Henri Woodcock
                    </a>
                  </p>
              </div>
            </footer>
        </div>
    )
}

export default App
