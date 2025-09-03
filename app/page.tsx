"use client"; // tells Next.js this file runs in the browser (can use state, events)

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Check, X } from 'lucide-react';
import ReadOnlyChecklist from "@/components/ReadOnlyChecklist";
import EditableChecklist from "@/components/EditableCkeckList";
import { CheckList, CheckListItem } from "@/lib/model";
import { addItem, toggleItem, removeItem } from "@/lib/model";





export default function Home() {
  const [editMode, setEditMode] = useState(false);
  const [checkList, setCheckList] = useState<CheckList>({ id: crypto.randomUUID(), title: "My Checklist", items: [] });



  return (
    <main className="mx-auto max-w-xl p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">The List Checker</h1>
      </header>
      <main>


        {editMode ? (
          <EditableChecklist
            cl={checkList}
            onSubmit={addItem}
            onRemove={removeItem}
            setCheckList={setCheckList}

            setEditMode={setEditMode}
          />
        ) : (
          <ReadOnlyChecklist
            cl={checkList}
            // If you want *purely* frozen, remove onToggle:
            onToggle={toggleItem}
            setCheckList={setCheckList}

            setEditMode={setEditMode}
          />
        )}
      </main>
      <footer className="text-center text-sm text-gray-500">
        &copy; 2024 The List Checker
      </footer>
    </main>
  );

}
