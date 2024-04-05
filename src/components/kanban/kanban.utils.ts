import { DraggableLocation } from "react-beautiful-dnd";
import { Issue } from "../../types/Github";

export const reorder = (list: Issue[], startIndex: number, endIndex: number): Issue[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const move = (
    source: Issue[],
    destination: Issue[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation,
) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Record<string, Issue[]> = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};