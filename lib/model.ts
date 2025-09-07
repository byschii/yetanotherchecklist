
export type CheckList = { id: string; title: string; items: CheckListItem[] };

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



export type CheckListItem = { id: string; text: string; completed: boolean };

export type CheckListMenu = { items: CheckList[] };

export function addCheckList(menu: CheckListMenu, title: string): CheckListMenu {
  const t = title.trim();
  if (!t) return menu;
  return {
    ...menu,
    items: [...menu.items, { id: crypto.randomUUID(), title: t, items: [] }],
  };
}

export function removeCheckList(menu: CheckListMenu, id: string): CheckListMenu {
  return { ...menu, items: menu.items.filter(i => i.id !== id) };
}

export function renameCheckList(menu: CheckListMenu, id: string, title: string): CheckListMenu {
  const t = title.trim();
  if (!t) return menu;
  return {
    ...menu,
    items: menu.items.map(i => i.id === id ? { ...i, title: t } : i),
  };
}

