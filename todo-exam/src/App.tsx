import { useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import TodoWithDescription from "./components/TodoWithDescription";
import type { TodoItem, TodoWithDescItem } from "./types/todo";

const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const LS_LIST1 = "todo_exam_list_1";
const LS_LIST2 = "todo_exam_list_2";

const safeParse = <T,>(raw: string | null): T | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export default function App() {
  const [list, setList] = useState<TodoItem[]>(() => {
    const saved = safeParse<TodoItem[]>(localStorage.getItem(LS_LIST1));
    return saved?.length ? saved : [{ id: uid(), task: "" }];
  });

  const [list2, setList2] = useState<TodoWithDescItem[]>(() => {
    const saved = safeParse<TodoWithDescItem[]>(localStorage.getItem(LS_LIST2));
    return saved?.length ? saved : [{ id: uid(), task: "", description: "" }];
  });

  const [err1, setErr1] = useState<string | null>(null);
  const [err2, setErr2] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_LIST1, JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem(LS_LIST2, JSON.stringify(list2));
  }, [list2]);

  const hasEmptyList = (items: TodoItem[]) => items.some((x) => !x.task.trim());
  const hasEmptyList2 = (items: TodoWithDescItem[]) =>
    items.some((x) => !x.task.trim() || !x.description.trim());

  const addRow1 = () => {
    setSaved(false);
    if (hasEmptyList(list)) {
      setErr1("TODO LIST has empty values.");
      return;
    }
    setErr1(null);
    setList((prev) => [...prev, { id: uid(), task: "" }]);
  };

  const addRow2 = () => {
    setSaved(false);
    if (hasEmptyList2(list2)) {
      setErr2("TODO LIST with Description has empty values.");
      return;
    }
    setErr2(null);
    setList2((prev) => [...prev, { id: uid(), task: "", description: "" }]);
  };

  const onSubmitForm = () => {
    setSaved(false);

    const e1 = hasEmptyList(list) ? "TODO LIST has empty values." : null;
    const e2 = hasEmptyList2(list2)
      ? "TODO LIST with Description has empty values."
      : null;

    setErr1(e1);
    setErr2(e2);

    if (e1 || e2) return;

    setSaved(true);
  };

  const createdTodoList = useMemo(
    () => list.filter((x) => x.task.trim()),
    [list]
  );

  const createdTodoWithDesc = useMemo(
    () => list2.filter((x) => x.task.trim() && x.description.trim()),
    [list2]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-black/5">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Add FORM
          </h1>

          <div className="mt-12 space-y-12">
            <TodoList
              items={list}
              error={err1}
              onChangeTask={(id, value) => {
                setSaved(false);
                setErr1(null);
                setList((prev) =>
                  prev.map((x) => (x.id === id ? { ...x, task: value } : x))
                );
              }}
              onAddRow={addRow1}
              onRemoveRow={(id) => {
                setSaved(false);
                setErr1(null);
                setList((prev) => {
                  const next = prev.filter((x) => x.id !== id);
                  return next.length ? next : [{ id: uid(), task: "" }];
                });
              }}
            />

            <TodoWithDescription
              items={list2}
              error={err2}
              onChangeTask={(id, value) => {
                setSaved(false);
                setErr2(null);
                setList2((prev) =>
                  prev.map((x) => (x.id === id ? { ...x, task: value } : x))
                );
              }}
              onChangeDesc={(id, value) => {
                setSaved(false);
                setErr2(null);
                setList2((prev) =>
                  prev.map((x) =>
                    x.id === id ? { ...x, description: value } : x
                  )
                );
              }}
              onAddRow={addRow2}
              onRemoveRow={(id) => {
                setSaved(false);
                setErr2(null);
                setList2((prev) => {
                  const next = prev.filter((x) => x.id !== id);
                  return next.length
                    ? next
                    : [{ id: uid(), task: "", description: "" }];
                });
              }}
            />
          </div>

          {saved && (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-emerald-700">
              Form saved successfully.
            </div>
          )}

          <button
            type="button"
            onClick={onSubmitForm}
            className="mt-12 w-full rounded-xl bg-slate-600 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-slate-700 active:bg-slate-800"
          >
            ADD FORM
          </button>

          {/* TABLE BELOW */}
          <div className="mt-12 space-y-10">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                  Created Tasks (TODO LIST)
                </h2>
                <div className="text-sm font-semibold text-gray-500">
                  Total: {createdTodoList.length}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Task</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {createdTodoList.length === 0 ? (
                      <tr>
                        <td className="px-4 py-4 text-gray-500" colSpan={2}>
                          No tasks yet.
                        </td>
                      </tr>
                    ) : (
                      createdTodoList.map((x, i) => (
                        <tr key={x.id} className="bg-white">
                          <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {x.task}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                  Created Tasks (TODO LIST with Description)
                </h2>
                <div className="text-sm font-semibold text-gray-500">
                  Total: {createdTodoWithDesc.length}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Task</th>
                      <th className="px-4 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {createdTodoWithDesc.length === 0 ? (
                      <tr>
                        <td className="px-4 py-4 text-gray-500" colSpan={3}>
                          No tasks yet.
                        </td>
                      </tr>
                    ) : (
                      createdTodoWithDesc.map((x, i) => (
                        <tr key={x.id} className="bg-white">
                          <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {x.task}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {x.description}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
