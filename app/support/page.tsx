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
    <div className="relative mx-auto max-w-4xl px-8 pt-32 pb-24">
      <header className="mb-10 text-center">
        <div className="eyebrow">Private Line</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          The <span className="gold-text">Concierge</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          24/7 live chat. Gold and Onyx Chips get a dedicated host with a
          direct line.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Live Chat
          </h2>
          <div className="mt-4 rounded-lg border border-jp-smoke bg-black/40 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-jp-success" />
              <span className="text-jp-success">Online</span>
              <span className="ml-auto text-jp-dim">Median response 42s</span>
            </div>
            <p className="mt-4 text-sm text-jp-mute">
              Start a thread from any page — the Concierge floats on the
              bottom-right (placeholder in prototype).
            </p>
            <button className="mt-5 w-full rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian">
              Start a thread
            </button>
          </div>

          <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.2em]">
            <li className="flex items-center justify-between border-b border-jp-smoke/60 pb-2">
              <span className="text-jp-dim">Email</span>
              <span className="text-jp-gold">concierge@cryptojackpot.example</span>
            </li>
            <li className="flex items-center justify-between border-b border-jp-smoke/60 pb-2">
              <span className="text-jp-dim">Telegram</span>
              <span className="text-jp-gold">@cryptojackpot_desk</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-jp-dim">House Rules</span>
              <span className="text-jp-gold">24/7 priority</span>
            </li>
          </ul>
        </section>

        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Or Send a Note
          </h2>
          {sent ? (
            <p className="mt-6 rounded-lg border border-jp-gold-deep/40 bg-jp-gold/5 p-4 text-sm text-jp-gold">
              Received. A host will reply to you within the hour.
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <Field label="Your name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="w-full rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  className="w-full rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full rounded-md border border-jp-smoke bg-black/40 px-4 py-2.5 text-sm text-jp-white outline-none focus:border-jp-gold"
                />
              </Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian disabled:opacity-50"
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
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-jp-mute">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-jp-molten">{error}</span>}
    </label>
  );
}
