"use client"; // tells Next.js this file runs in the browser (can use state, events)

import { useEffect, useState } from "react";
import ReadOnlyChecklist from "@/components/ReadOnlyChecklist";
import EditableChecklist from "@/components/EditableCheckList";
import { CheckList, CheckListMenu } from "@/lib/model";
import { addItem, toggleItem, removeItem } from "@/lib/model";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Plus } from "lucide-react";





export default function Home() {
  const [editMode, setEditMode] = useState(false);
  // With this:
  const [checkListMenu, setCheckListMenu] = useLocalStorage<CheckListMenu>('my-checklist-set', { items: [] });

  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<number | null>(null);

  const [currentChecklist, setCurrentChecklist] = useState<CheckList | null>(null);

  useEffect(() => {  // set current checklist based on index
    if (currentSelectedIndex !== null && checkListMenu.items[currentSelectedIndex]) {
      setCurrentChecklist(checkListMenu.items[currentSelectedIndex]);
    } else {
      setCurrentChecklist(null);
    }    
  },[currentSelectedIndex]);

  useEffect(() => {  // update set of checklists when current checklist changes
    if (currentChecklist && currentSelectedIndex !== null) {
      const newMenu = {
        ...checkListMenu,
        items: checkListMenu.items.map((cl, idx) => idx === currentSelectedIndex ? currentChecklist : cl)
      };
      setCheckListMenu(newMenu);
    }
  }, [currentChecklist]);
  

  const editableChecklist = <EditableChecklist
    cl={currentChecklist}
    onSubmit={addItem}
    onRemove={removeItem}
    setCheckList={setCurrentChecklist}

    setEditMode={setEditMode}
  />;

  const readOnlyChecklist = <ReadOnlyChecklist
    cl={currentChecklist}
    // If you want *purely* frozen, remove onToggle:
    onToggle={toggleItem}
    setCheckList={setCurrentChecklist}

    setEditMode={setEditMode}
  />;


  return (
    <main className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">The List Checker</h1>
      </header>
      <main className="grid grid-cols-6 gap-4">
        <div className="col-span-2 space-y-2"> 
          <p><span>menu </span><Plus
            onClick={() => {
              // create empty checklist and select it
              const newMenu = {
                ...checkListMenu,
                items: [...checkListMenu.items, { id: crypto.randomUUID(), title: 'New Checklist', items: [] }],
              };
              setCheckListMenu(newMenu);
              setCurrentSelectedIndex(newMenu.items.length - 1);
            }} className="inline h-4 w-4 cursor-pointer text-blue-500" />
          </p>
          <ul>
            {checkListMenu.items.map((cl, idx) => (
              <li 
                key={cl.id} 
                className={`cursor-pointer p-2 rounded ${currentSelectedIndex === idx ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                onClick={() => setCurrentSelectedIndex(idx)}
              >
                {cl.title}
              </li>
            ))}
          </ul>
        </div>

        
        
        <div className="col-span-4">
        { 
        editMode ? editableChecklist : readOnlyChecklist
        }
        </div>

      </main>
      <footer className="text-center text-sm text-gray-500">
        &copy; 2024 The List Checker
      </footer>
    </main>
  );

}
