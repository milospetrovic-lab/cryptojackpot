"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BASE_SRC =
  "https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86";
const SINGLE_SRC =
  "https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86";
const DOUBLE_SRC =
  "https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86";

/**
 * SignInKeypad — Jhey's keypad (credit: @jh3yy / codepen 605876) re-sewn
 * into a CryptoJackpot email-capture. Uses the real PNG assets with
 * CSS clip-path + hue-rotate filter for the OK / GO / ENTER keys. Each
 * key is a button; ENTER submits the form.
 */
export function SignInKeypad() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sk-copy > *", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".keypad", {
        opacity: 0,
        x: 80,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  function pressKey(id: "ok" | "go" | "enter") {
    const el = rootRef.current?.querySelector(`#sk-${id}`) as HTMLElement | null;
    if (!el) return;
    el.setAttribute("data-pressed", "true");
    setTimeout(() => el.removeAttribute("data-pressed"), 150);
  }

  function submit(e?: FormEvent) {
    if (e) e.preventDefault();
    if (!email) {
      formRef.current?.reportValidity();
      return;
    }
    pressKey("enter");
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  }

  return (
    <section
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="signin-headline"
    >
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="sk-copy">
          <div className="eyebrow">The Door</div>
          <h2
            id="signin-headline"
            className="font-bebas mt-2 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.9] tracking-[0.03em] text-jp-white"
          >
            ONE STAKE. <span className="gold-text">YOU'RE IN.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-jp-mute md:text-base">
            Drop an email. We'll send you a direct line to the Concierge and
            your first Opening Hand code. No passwords until you want one.
          </p>

          <form
            ref={formRef}
            onSubmit={submit}
            className="mt-8 flex max-w-md flex-wrap gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="roller@cryptojackpot.example"
              className="min-w-[220px] flex-1 rounded-full border border-jp-smoke bg-black/55 px-5 py-3 text-sm text-jp-white outline-none focus:border-jp-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
            >
              {sent ? "Sent" : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-jp-dim">
            18+ · or tap <span className="text-jp-gold">ENTER</span> on the
            pad — either works
          </p>
        </div>

        {/* Physical keypad — same structure as the Jhey pen */}
        <div className="keypad">
          <div className="keypad__base">
            <img src={BASE_SRC} alt="" aria-hidden draggable={false} />
          </div>

          {/* OK — orange, upper-right-ish (keypad__single--left sits higher) */}
          <button
            id="sk-ok"
            type="button"
            aria-label="OK"
            onClick={() => pressKey("ok")}
            className="key keypad__single keypad__single--left"
            style={
              {
                // base PNG is already orange — keep it, boost saturation slightly
                ["--hue" as any]: 0,
                ["--saturate" as any]: 1.05,
                ["--brightness" as any]: 1,
              } as React.CSSProperties
            }
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">ok</span>
                <img src={SINGLE_SRC} alt="" aria-hidden draggable={false} />
              </span>
            </span>
          </button>

          {/* GO — gray, lower-right */}
          <button
            id="sk-go"
            type="button"
            aria-label="GO"
            onClick={() => pressKey("go")}
            className="key keypad__single"
            style={
              {
                // desaturate the orange PNG to a neutral gray
                ["--hue" as any]: 180,
                ["--saturate" as any]: 0.05,
                ["--brightness" as any]: 1.15,
              } as React.CSSProperties
            }
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">go</span>
                <img src={SINGLE_SRC} alt="" aria-hidden draggable={false} />
              </span>
            </span>
          </button>

          {/* ENTER — wide, bottom-left, black. This one submits the form. */}
          <button
            id="sk-enter"
            type="button"
            aria-label="ENTER"
            onClick={() => submit()}
            className="key keypad__double"
            style={
              {
                // kill saturation, drop brightness — the key reads black
                ["--hue" as any]: 0,
                ["--saturate" as any]: 0,
                ["--brightness" as any]: 0.16,
              } as React.CSSProperties
            }
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">ENTER</span>
                <img src={DOUBLE_SRC} alt="" aria-hidden draggable={false} />
              </span>
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .keypad {
          --travel: 20;
          position: relative;
          aspect-ratio: 400 / 310;
          width: clamp(280px, 35vw, 400px);
          margin-inline: auto;
          display: flex;
          place-items: center;
          -webkit-tap-highlight-color: transparent;
          transition-property: translate, transform;
          transition-duration: 0.26s;
          transition-timing-function: ease-out;
          transform-style: preserve-3d;
        }
        .keypad .key {
          transform-style: preserve-3d;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline: none;
        }
        .keypad .key[data-pressed="true"] .key__content,
        .keypad .key:active .key__content {
          translate: 0 calc(var(--travel) * 1%);
        }
        .keypad .key__content {
          width: 100%;
          height: 100%;
          display: inline-block;
          transition: translate 0.12s ease-out;
          container-type: inline-size;
        }
        .keypad .key__mask {
          width: 100%;
          height: 100%;
          display: inline-block;
        }

        /* Single key — orange/gray, silhouette via clip-path + PNG mask */
        .keypad .keypad__single {
          position: absolute;
          width: 40.5%;
          left: 54%;
          bottom: 36%;
          height: 46%;
          clip-path: polygon(
            0 0, 54% 0, 89% 24%, 100% 70%, 54% 100%,
            46% 100%, 0 69%, 12% 23%, 47% 0%
          );
          -webkit-mask: url(${SINGLE_SRC}) 50% 50% / 100% 100%;
          mask: url(${SINGLE_SRC}) 50% 50% / 100% 100%;
        }
        .keypad .keypad__single.keypad__single--left {
          left: 29.3%;
          bottom: 54.2%;
        }
        .keypad .keypad__single img {
          top: 0;
          width: 96%;
          position: absolute;
          left: 50%;
          translate: -50% 1%;
          opacity: 1;
        }

        /* Wide ENTER key */
        .keypad .keypad__double {
          position: absolute;
          width: 64%;
          height: 65%;
          left: 6%;
          bottom: 17.85%;
          background: hsl(10 100% 50% / 0);
          clip-path: polygon(
            34% 0, 93% 44%, 101% 78%, 71% 100%, 66% 100%,
            0 52%, 0 44%, 7% 17%, 30% 0
          );
          -webkit-mask: url(${DOUBLE_SRC}) 50% 50% / 100% 100%;
          mask: url(${DOUBLE_SRC}) 50% 50% / 100% 100%;
        }
        .keypad .keypad__double img {
          top: 0;
          width: 99%;
          position: absolute;
          left: 50%;
          translate: -50% 1%;
          opacity: 1;
        }

        /* Text laid flat on the 3D key top */
        .keypad .key__text {
          height: 46%;
          width: 86%;
          position: absolute;
          font-family: var(--font-bebas), sans-serif;
          font-weight: 400;
          letter-spacing: 0.05em;
          font-size: 12cqi;
          z-index: 21;
          top: 5%;
          left: 0;
          color: hsl(0 0% 94%);
          translate: 8% 10%;
          transform: rotateX(36deg) rotateY(45deg) rotateX(-90deg);
          text-align: left;
          padding: 1ch;
        }
        .keypad .keypad__single .key__text {
          width: 52%;
          height: 62%;
          font-size: 18cqi;
          translate: 45% -16%;
        }

        /* Hue/brightness recolor applied to the PNG under the mask */
        .keypad .key img {
          filter: hue-rotate(calc(var(--hue, 0) * 1deg))
            saturate(var(--saturate, 1))
            brightness(var(--brightness, 1));
        }

        .keypad .keypad__base {
          position: absolute;
          bottom: 0;
          width: 100%;
        }
        .keypad img {
          transition: translate 0.12s ease-out;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
