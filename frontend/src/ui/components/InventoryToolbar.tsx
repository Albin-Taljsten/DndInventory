import type React from "react";
import "../../scss/components/InventoryToolbar.scss";

interface InventoryToolbarProps {
    mode: "add" | "remove" | "move";
    setMode: (mode: "add" | "remove" | "move") => void;
}

const InventoryToolbar: React.FC<InventoryToolbarProps> = ({ mode, setMode }) => {
    return (
        <div className="inventory-toolbar">
            <button
                className={`btn btn--sm ${mode === "add" ? "" : "btn--muted"}`}
                onClick={() => setMode("add")}
                style={{
                    marginRight: "0.5rem"
                }}
            >
                Add
            </button>
            <button
                className={`btn btn--sm ${mode === "remove" ? "" : "btn--muted"}`}
                onClick={() => setMode("remove")}
            >
                Remove
            </button>
            <button
                className={`btn btn--sm ${mode === "move" ? "" : "btn--muted"}`}
                style={{
                    marginLeft: "0.5rem"
                }}
                onClick={() => setMode("move")}
            >
                Move
            </button>
        </div>
    );
};

export default InventoryToolbar;