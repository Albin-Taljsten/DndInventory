import type { PlacedItem } from "../../domain/Types";
import { CELL_SIZE } from "../../globalVariables";

interface Props {
    placement: PlacedItem;
    mode: "none" | "remove";
    onClick?: (localX: number, localY: number, e: React.MouseEvent) => void;
    onMouseDown?: (placement: PlacedItem, cellX: number, cellY: number, e: React.MouseEvent<HTMLDivElement>) => void;
    styleOverride?: React.CSSProperties;
}

const InventoryItem: React.FC<Props> = ({ placement, mode = "none",  onClick, onMouseDown, styleOverride }) => {
    
    const shape = placement.item.shape;

    const width = shape.length * CELL_SIZE;
    const height = shape[0].length * CELL_SIZE;

    // const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     e.stopPropagation();

    //     const rect = e.currentTarget.getBoundingClientRect();
    //     const localX = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    //     const localY = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    //     if (
    //         localX < 0 ||
    //         localY < 0 ||
    //         localX >= shape.length ||
    //         localY >= shape[0].length
    //     ) {
    //         return;
    //     }

    //     if (shape[localX][localY]) {
    //         onClick?.(localX, localY, e);
    //     }
    // };

    const handleCellClick = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClick?.(x, y, e);
    }

    return (
        // <div
        //     className="inventory-item"
        //     style={{
        //         position: "absolute",
        //         left: placement.origin.x * CELL_SIZE,
        //         top: placement.origin.y * CELL_SIZE,

        //         width: width,
        //         height: height,
        //         cursor: mode === "remove" ? "crosshair" : "pointer",
        //         backgroundImage: `url(${placement.item.imgUrl})`,
        //         backgroundSize: "cover",
        //         backgroundPosition: "center",
        //         ...styleOverride,
        //     }}
        //     onClick={handleClick}
        //     onMouseDown={onMouseDown}
        // >
        //     {/* <h4>{placement.item.name}</h4> */}
        // </div>
        <div
            className="inventory-item"
            style={{
                position: "absolute",
                left: placement.origin.x * CELL_SIZE,
                top: placement.origin.y * CELL_SIZE,

                width,
                height,

                backgroundImage: `url(${placement.item.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",

                userSelect: "none",

                ...styleOverride
            }}
        >
            {shape.map((col, x) => 
                col.map((filled, y) => {

                    if (!filled) return null;

                    return (
                        <div
                            key={`${x}-${y}`}
                            style={{
                                position: "absolute",
                                left: x * CELL_SIZE,
                                top: y * CELL_SIZE,
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                pointerEvents: "auto",
                                cursor: mode === "remove" ? "crosshair" : "grab"                            
                            }}
                            onClick={(e) => handleCellClick(x, y, e)}
                            onMouseDown={(e) => onMouseDown?.(placement, x, y, e)}
                        />
                    );
                })
            )}
        </div>
    );
};

export default InventoryItem;