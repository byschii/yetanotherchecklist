import { Check } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { CheckList, CheckListItem } from "@/lib/model";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

function ReadOnlyChecklist({
  cl,
  onToggle,
  setCheckList,

  setEditMode

}: {
  cl: CheckList | null;
  onToggle: (cl: CheckList, id: string) => CheckList; // make optional if you want truly frozen
  setCheckList: Dispatch<SetStateAction<CheckList|null>>

  setEditMode: Dispatch<SetStateAction<boolean>>
}) {

  const noChecklistComponent = <div className="text-gray-500">No checklist selected.</div>;
  if (!cl) return noChecklistComponent;

  return (
    <main className="space-y-3">
        <header className="flex items-center justify-between">
        <span className="text-xl font-bold">{cl.title}</span>
        <Button variant="outline" onClick={() => setEditMode(m => !m)}>
          <span className="flex items-center gap-2">
            Edit Mode <Check className="h-4 w-4" />
          </span>
        </Button>
      </header>

      <ul className="space-y-2 pl-1">

      {cl?.items.map(item => (
        <li key={item.id} className="flex items-center gap-3">
          {/* Show a passive checkbox look; if you want zero interactivity, remove the handler */}
          <Checkbox
            id={item.id}
            checked={item.completed}
            onCheckedChange={() => setCheckList(onToggle(cl, item.id))}
            disabled={!onToggle}
          />
          <label
            htmlFor={item.id}
            className={`flex-1 ${
              item.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {item.text}
          </label>
        </li>
      ))}
      {cl.items.length === 0 && (
        <li className="text-gray-500">No items yet.</li>
      )}
    </ul>
    </main>
  );
}

export default ReadOnlyChecklist;