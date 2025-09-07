import { Check, Trash2, X } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CheckList, CheckListItem } from "@/lib/model";
import { Dispatch, SetStateAction, useState } from "react";



function EditableChecklist({
  cl,
  onSubmit,
  onRemove,
  setCheckList,
  setEditMode
}: {
  cl: CheckList | null;
  onSubmit: (list: CheckList, text: string) => CheckList;
  onRemove: (list: CheckList, id: string) => CheckList;
  setCheckList: Dispatch<SetStateAction<CheckList|null>>;
  setEditMode: Dispatch<SetStateAction<boolean>>
}) {

  const [newItemDraft, setNewItemDraft] = useState("");

  const noChecklistComponent = <div className="text-gray-500">No checklist selected.</div>;
  if (!cl) return noChecklistComponent;

  return (
    <main className="space-y-3">

      <header className="flex items-center justify-between">
        <form>
          <Input 
            className="text-xl font-bold" 
            value={cl.title}
            onChange={(e) => setCheckList({...cl, title: e.target.value})}
            onSubmit={(e) => e.preventDefault()}
            />
        </form>
        <Button variant="outline" onClick={() => setEditMode(m => !m)}>
          <span className="flex items-center gap-2">
            Exit Edit <X className="h-4 w-4" />
          </span>
        </Button>
      </header>

      <ul className="space-y-2 pl-1">
        {cl.items.map(item => (
          <li key={item.id} className="flex items-center gap-3">
            <label
              htmlFor={item.id}
              className={`flex-1 ${
                item.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {item.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCheckList(onRemove(cl, item.id))}
              aria-label="Delete item"
              title="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
        {cl.items.length === 0 && (
          <li className="text-gray-500">No items yet.</li>
        )}
      </ul>

      {/* Submit on Enter for accessibility */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCheckList(onSubmit(cl, newItemDraft));
          setNewItemDraft("");
        }}
        className="flex gap-2"
      >
        <Input
          autoFocus
          placeholder="Add a task…"
          value={newItemDraft}
          onChange={(e) => setNewItemDraft(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
    </main>
  );
}

export default EditableChecklist;