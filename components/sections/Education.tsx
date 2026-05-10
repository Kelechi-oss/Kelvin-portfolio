"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  Clock,
  Hourglass,
  GraduationCap,
  ScrollText
} from "lucide-react";

export type Course = { name: string; status?: string };

export type Semester = {
  _id?: string;
  title: string;
  status: "completed" | "in_progress" | "upcoming";
  notes?: string;
  courses?: Course[];
  order?: number;
};

const STATUS_META: Record<
  Semester["status"],
  { label: string; color: string; icon: LucideIcon; pct: number }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-300",
    icon: CheckCircle2,
    pct: 100
  },
  in_progress: {
    label: "In Progress",
    color: "text-amber-300",
    icon: Clock,
    pct: 60
  },
  upcoming: {
    label: "Yet to Start",
    color: "text-ivory/60",
    icon: Hourglass,
    pct: 0
  }
};

export function Education({ semesters }: { semesters: Semester[] }) {
  const completed = semesters.filter((s) => s.status === "completed").length;
  const total = semesters.length || 1;
  const progress = Math.round((completed / total) * 100);

  return (
    <SectionShell
      id="education"
      eyebrow="Education & MBA Progress"
      title={
        <>
          Boston University Questrom <span className="gold-text">MBA</span>{" "}
          (Class of &apos;27)
        </>
      }
      description="Management Science (STEM) — Concentration on Finance · Dean Merit Full-Tuition Scholarship. Live progress dashboard tracking every semester and course."
    >
      <div className="glass-panel p-7 mb-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <p className="eyebrow">Overall Program Progress</p>
            <p className="font-serif text-3xl mt-2">
              {completed}/{semesters.length}{" "}
              <span className="text-sm text-muted-foreground font-sans">
                semesters completed
              </span>
            </p>
          </div>
          <p className="font-serif text-4xl gold-text font-semibold">
            {progress}%
          </p>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {semesters.map((s, i) => {
          const meta = STATUS_META[s.status];
          const Icon = meta.icon;
          return (
            <motion.div
              key={s._id ?? s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-panel p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-xl text-ivory flex items-center gap-2">
                  <GraduationCap size={18} className="text-gold" /> {s.title}
                </h3>
                <Badge
                  variant={
                    s.status === "completed"
                      ? "success"
                      : s.status === "in_progress"
                      ? "warning"
                      : "muted"
                  }
                >
                  {meta.label}
                </Badge>
              </div>
              <Progress value={meta.pct} />
              <ul className="mt-5 space-y-2.5">
                {(s.courses ?? []).map((c) => (
                  <li
                    key={c.name}
                    className="flex items-start gap-2.5 text-sm text-ivory/85"
                  >
                    <Icon size={14} className={`mt-1 shrink-0 ${meta.color}`} />
                    <span className="leading-snug">{c.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-7 mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
      >
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
            <ScrollText size={22} />
          </span>
          <div>
            <p className="eyebrow">Undergraduate Degree</p>
            <h3 className="font-serif text-xl md:text-2xl text-ivory mt-2">
              BSc, Accountancy
            </h3>
            <p className="text-gold mt-1 font-medium">
              Federal Polytechnic, Oko · School of Financial Studies
            </p>
          </div>
        </div>
        <Badge variant="success">Completed · 2018</Badge>
      </motion.div>
    </SectionShell>
  );
}