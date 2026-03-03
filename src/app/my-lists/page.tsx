"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Loader2, Trash2, FileText } from "lucide-react";
import Link from "next/link";

type ListItem = {
  id: string;
  name: string;
  keywords: { id: string; keyword: string }[];
  createdAt: string;
};

export default function MyListsPage() {
  const queryClient = useQueryClient();

  const { data: lists, isLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await axios.get<ListItem[]>("/api/lists");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (listId: string) => {
      await axios.delete("/api/lists", { params: { id: listId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight dark:text-white">My Keyword Lists</h1>
          <p className="mt-2 font-medium text-slate-500">Manage your saved keyword collections.</p>
        </div>

        {!lists || lists.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/50">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-700">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-slate-800 dark:text-white">No lists yet</h3>
            <p className="mb-8 font-medium text-slate-500">Start searching and save results to create your first list.</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-900"
            >
              Start Research
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {lists.map((list) => {
              const deletingThis = deleteMutation.isPending && deleteMutation.variables === list.id;

              return (
                <div
                  key={list.id}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/50 md:p-8"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-slate-800 dark:text-white">{list.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-700">
                          {list.keywords.length} keywords
                        </span>
                        <span className="opacity-30">&middot;</span>
                        <span>{format(new Date(list.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteMutation.mutate(list.id)}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center justify-center rounded-2xl bg-slate-50 p-3 text-slate-400 transition-all hover:scale-105 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-700 dark:hover:text-red-400"
                      title="Delete list"
                    >
                      {deletingThis ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5 dark:border-slate-700/50">
                    {list.keywords.slice(0, 10).map((keyword) => (
                      <span
                        key={keyword.id}
                        className="inline-flex items-center rounded-xl border border-transparent bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:border-blue-500/30 dark:bg-slate-700 dark:text-slate-300"
                      >
                        {keyword.keyword}
                      </span>
                    ))}
                    {list.keywords.length > 10 && (
                      <span className="inline-flex items-center rounded-xl bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                        +{list.keywords.length - 10} MORE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
