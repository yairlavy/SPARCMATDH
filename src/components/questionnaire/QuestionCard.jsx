import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MobileSelect from "@/components/ui/MobileSelect";

export default function QuestionCard({ question, value, onChange }) {
  const questionId = question.id;
  const label = question.label;
  const hint = question.hint;
  const type = question.type;
  const options = question.options;

  return (
    <div className="space-y-2">
      <Label htmlFor={questionId} className="text-sm font-medium text-stone-700">
        {label}
      </Label>
      {hint && (
        <p className="text-xs text-stone-400 leading-relaxed">{hint}</p>
      )}
      {type === "textarea" && (
        <Textarea
          id={questionId}
          placeholder={question.placeholder || ""}
          value={value || ""}
          onChange={(e) => onChange(questionId, e.target.value)}
          className="min-h-[80px] rounded-xl border-stone-200 resize-none text-sm"
          style={{ fontSize: "16px" }}
        />
      )}
      {type === "text" && (
        <Input
          id={questionId}
          placeholder={question.placeholder || ""}
          value={value || ""}
          onChange={(e) => onChange(questionId, e.target.value)}
          className="h-10 rounded-xl border-stone-200 text-sm"
          style={{ fontSize: "16px" }}
        />
      )}
      {type === "select" && (
        <MobileSelect
          value={value || ""}
          onValueChange={(v) => onChange(questionId, v)}
          placeholder="Select..."
          options={options}
          triggerClassName="h-10 rounded-xl border-stone-200 text-sm"
        />
      )}
    </div>
  );
}