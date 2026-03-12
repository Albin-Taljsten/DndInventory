import type React from "react";
import "../../scss/components/InventoryToolbar.scss";

interface InventoryToolbarProps {
    mode: "none" | "remove";
    setMode: (mode: "none" | "remove") => void;
}

const InventoryToolbar: React.FC<InventoryToolbarProps> = ({ mode, setMode }) => {

    const toggleRemove = () => {
        setMode(mode == "remove" ? "none" : "remove");
    };

    return (
        <div className="inventory-toolbar">
            <button
                className={`btn btn--sm ${mode === "remove" ? "" : "btn--muted"}`}
                onClick={toggleRemove}
            >
                Remove
            </button>
        </div>
    );
};

export default InventoryToolbar;