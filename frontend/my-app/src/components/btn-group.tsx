import { getPriorities } from "@/data/providers/priority-provider";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface BtnGroupProps {
  priorityID: number;
  setPriorityID: (id: number) => void;
}

export default function BtnGroup({ priorityID, setPriorityID }: BtnGroupProps) {
  const [selection, setSelection] = useState<Selection>(new Set([priorityID]));
  const [priorities, setPriorities] = useState<Priority[]>([]);

  const selectedOptionValue = Array.from(selection)[0] as number;

  useEffect(() => {
    getPriorities().then((priorities) => {
      setPriorities(priorities);
    });
  }, []);

  return (
    <ButtonGroup color="secondary" variant="solid">
      <Button className={handleNoteBG(priorityID)}>
        {priorities[selectedOptionValue - 1]?.name}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger className={handleNoteBG(priorityID)}>
          <Button>v</Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selection}
          selectionMode="single"
          onSelectionChange={setSelection}
          className="max-w-[300px]"
        >
          {priorities.map((priority) => (
            <DropdownItem
              className={"text-slate-600"}
              key={priority.id}
              onPress={() => {
                setPriorityID(priority.id);
              }}
            >
              {priority.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}

function handleNoteBG(priorityID: number): string {
  switch (priorityID) {
    case 1:
      return "bg-green-700 hover:bg-green-900";
    case 2:
      return "bg-yellow-700 hover:bg-yellow-900";
    case 3:
      return "bg-red-700 hover:bg-red-900";
    default:
      return "bg-gray-700 hover:bg-gray-900";
  }
}
