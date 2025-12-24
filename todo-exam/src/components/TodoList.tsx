import type { TodoItem } from "../types/todo";

type Props = {
    items: TodoItem[];
    error: string | null;
    onChangeTask: (id: string, value: string) => void;
    onAddRow: () => void;
    onRemoveRow: (id: string) => void;
};

export default function TodoList({
    items,
    error,
    onChangeTask,
    onAddRow,
    onRemoveRow,
}: Props) {
    return (
        <section>
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold tracking-widest text-gray-900">
                    TODO LIST
                </h2>
                <span className="text-red-500">*</span>
            </div>

            <div className="mt-4 border-l-4 border-gray-200 pl-6">
                <div className="text-sm font-semibold text-gray-700">Task Name</div>

                <div className="mt-3 space-y-3">
                    {items.map((it, idx) => (
                        <div key={it.id} className="flex items-center gap-3">
                            <input
                                value={it.task}
                                onChange={(e) => onChangeTask(it.id, e.target.value)}
                                placeholder="Task Name"
                                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                            />

                            {idx === items.length - 1 && !it.task.trim() ? (
                                <button
                                    type="button"
                                    onClick={onAddRow}
                                    className="grid h-11 w-11 place-items-center rounded-xl bg-gray-100 text-xl font-bold text-gray-600 shadow-sm transition hover:bg-gray-200 active:bg-gray-300"
                                    aria-label="Add"
                                >
                                    +
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onRemoveRow(it.id)}
                                    className="grid h-11 w-11 place-items-center rounded-xl bg-red-500 text-white shadow-sm transition hover:bg-red-600 active:bg-red-700"
                                    aria-label="Delete"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={onAddRow}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 active:bg-emerald-700"
                    >
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-600 text-lg leading-none">
                            +
                        </span>
                        Add TODO LIST
                    </button>
                </div>

                {error && <div className="mt-4 font-semibold text-red-500">{error}</div>}
            </div>
        </section>
    );
}
