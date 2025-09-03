
export type CheckList = { id: string; title: string; items: CheckListItem[] };

export type CheckListItem = { id: string; text: string; completed: boolean };


export function addItem(list: CheckList, text: string): CheckList {
  const t = text.trim();
  if (!t) return list;
  return {
    ...list,
    items: [...list.items, { id: crypto.randomUUID(), text: t, completed: false }],
  };
}

export function toggleItem(list: CheckList, id: string): CheckList {
  return {
    ...list,
    items: list.items.map(i => i.id === id ? { ...i, completed: !i.completed } : i),
  };
}

export function removeItem(list: CheckList, id: string): CheckList {
  return { ...list, items: list.items.filter(i => i.id !== id) };
}

