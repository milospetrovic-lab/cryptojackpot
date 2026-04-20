"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Tell us who you are."),
  email: z.string().email("Not a valid email."),
  subject: z.string().min(2),
  message: z.string().min(10, "At least 10 characters."),
});

type FormData = z.infer<typeof schema>;

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
      <header className="mb-8 text-center md:mb-10">
        <div className="eyebrow">Private Line</div>
        <h1 className="font-bebas mt-4 text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.95] tracking-[0.08em] text-jp-white">
          The <span className="gold-text">Concierge</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          24/7 live chat. Gold and Onyx Chips get a dedicated host with a
          direct line.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr] md:gap-6">
        {/* LIVE CHAT */}
        <section className="lounge-card min-w-0 rounded-2xl p-5 md:p-7">
          <h2 className="font-bebas text-xl tracking-[0.16em] text-jp-gold md:text-2xl">
            LIVE CHAT
          </h2>
          <div className="mt-4 rounded-lg border border-jp-smoke bg-black/40 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] md:text-xs">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-jp-success" />
              <span className="text-jp-success">Online</span>
              <span className="text-jp-dim md:ml-auto">Median 42s</span>
            </div>
            <p className="mt-4 text-sm text-jp-mute">
              Start a thread from any page — the Concierge floats on the
              bottom-right.
            </p>
            <button className="mt-5 w-full rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian">
              Start a thread
            </button>
          </div>

          <ul className="mt-6 space-y-3 text-[10px] uppercase tracking-[0.2em]">
            <li className="flex flex-col gap-1 border-b border-jp-smoke/60 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-jp-dim">Email</span>
              <span className="break-all text-jp-gold normal-case tracking-normal sm:text-right">
                concierge@cryptojackpot.example
              </span>
            </li>
            <li className="flex flex-col gap-1 border-b border-jp-smoke/60 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-jp-dim">Telegram</span>
              <span className="text-jp-gold normal-case tracking-normal sm:text-right">
                @cryptojackpot_desk
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-jp-dim">House Rules</span>
              <span className="text-jp-gold">24/7 priority</span>
            </li>
          </ul>
        </section>

        {/* SEND A NOTE */}
        <section className="lounge-card min-w-0 rounded-2xl p-5 md:p-7">
          <h2 className="font-bebas text-xl tracking-[0.16em] text-jp-gold md:text-2xl">
            OR SEND A NOTE
          </h2>
          {sent ? (
            <p className="mt-6 rounded-lg border border-jp-gold-deep/40 bg-jp-gold/5 p-4 text-sm text-jp-gold">
              Received. A host will reply to you within the hour.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 space-y-4"
            >
              <Field label="Your name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="w-full min-w-0 rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full min-w-0 rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  className="w-full min-w-0 rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full min-w-0 rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Send to Concierge"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-jp-mute">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-jp-molten">{error}</span>
      )}
    </label>
  );
}
