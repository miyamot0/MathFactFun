import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
} from "react-beautiful-dnd";
import {
  formatBackgroundColor,
  formatTextBox,
} from "../functionality/SetCreatorBehavior";
import { DragColumnsInterface, SetItem } from "../types/SetCreatorTypes";

const DropContainer = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
};

const HeadingStyle = {
  color: "#444",
};

export const TitleStyle = {
  color: "#444",
  height: "100%",
  textAlign: "center" as const,
  marginBottom: "10px",
};

export const SetContainer = {
  display: "block",
};

export const SetEditForm = {
  maxWidth: "600px",
  justifyContent: "center",
  textAlign: "center" as const,
  margin: "auto",
};

export const ClearBtn = {
  marginTop: "5px",
  marginBottom: "20px",
};

export const DragDropContainer = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
};

export function generateCard(
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  item: SetItem,
  label: string,
  valueAdjustment: number,
  setNumber: number
): JSX.Element {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: "none",
        padding: 16,
        margin: "0 0 8px 0",
        minHeight: "50px",
        display: "flex",
        borderRadius: "10px",
        verticalAlign: "middle",
        backgroundColor: snapshot.isDragging
          ? "#263B4A"
          : formatBackgroundColor(item),
        color: "white",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1em",
        ...provided.draggableProps.style,
      }}
    >
      <p>
        {item.Answer}
        <br />
        {`Set: ${label}${(setNumber + 1 - valueAdjustment).toString()} Item: ${
          parseInt(item.id.split(":")[2]) + 1
        }`}
        <br />
        {`OTRs: ${formatTextBox(item.OTRs, 0)}`}
        <br />
        {`Accuracy: ${formatTextBox(item.Accuracy, 2)} %`}
        <br />
        {`Latency: ${formatTextBox(item.Latency, 2)}s`}
      </p>
    </div>
  );
}

export function generateDraggable(item: SetItem, index: number) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        let setNumber = parseInt(item.id.split(":")[1]);

        let label = "B";
        let valueAdjustment = 6;

        if (setNumber <= 5) {
          label = "A";
          valueAdjustment = 0;
        }

        if (setNumber >= 12) {
          label = "C";
          valueAdjustment = 12;
        }

        return generateCard(
          provided,
          snapshot,
          item,
          label,
          valueAdjustment,
          setNumber
        );
      }}
    </Draggable>
  );
}

export function generateDroppable(columns: DragColumnsInterface) {
  return Object.entries(columns).map(([columnId, column]) => {
    return (
      <div style={DropContainer} key={columnId}>
        <h2 style={HeadingStyle}>{column!.name}</h2>
        <div style={{ margin: 8 }}>
          <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 4,
                    width: 250,
                    minHeight: 500,
                  }}
                >
                  {column!.items.map((item, index) => {
                    return generateDraggable(item, index);
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    );
  });
}
