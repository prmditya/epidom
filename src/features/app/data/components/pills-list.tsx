"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/lang/i18n-provider";

type Item = { id: string; name: string; note?: string };

interface PillsListProps {
  items: Item[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

export function PillsList({ items, onSelect, selectedId }: PillsListProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={t("actions.searchByName")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-56"
        />
        <div className="flex items-center gap-2">
          <Button variant="secondary">{t("actions.note")}</Button>
          <Button>{t("actions.addMaterial")}</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((i) => (
          <button
            key={i.id}
            onClick={() => onSelect(i.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm text-left transition-all shadow-sm hover:shadow-md ${
              selectedId === i.id
                ? "bg-primary/10 border-primary/50 font-semibold ring-2 ring-primary/20"
                : "bg-card hover:bg-muted/60 hover:border-muted-foreground/30"
            }`}
          >
            {i.name}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-muted-foreground text-center py-4">
            {t("messages.noResults")}
          </p>
        )}
      </div>
    </div>
  );
}
