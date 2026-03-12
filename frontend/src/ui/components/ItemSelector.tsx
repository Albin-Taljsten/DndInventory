import { useState } from "react";

interface Props {
    items: string[]; // ItemDB.ts keys
}

const ItemSelector: React.FC<Props> = ({ items }) => {
    const [search, setSearch] = useState("");

    const filtered = items.filter(i => 
        i.toLowerCase().includes(search.toLowerCase())
    );

    const handleDragStart = (e: React.DragEvent, itemKey: string) => {
        e.dataTransfer.setData("itemKey", itemKey);
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div className="item-selector">
            <input 
                placeholder="Search item..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="item-selector-grid">
                {filtered.map(item => (
                    <div
                        key={item}
                        className="selector-item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemSelector;