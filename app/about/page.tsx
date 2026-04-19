export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-8 pt-32 pb-24">
      <header className="mb-12 text-center">
        <div className="eyebrow">The House</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">About</span>
        </h1>
      </header>

      <div className="space-y-10">
        <Block
          title="The lounge behind the lounge"
          body="CryptoJackpot exists for the high-roller who wants the private room behind the private room. Vulcan keeps his reserve of molten gold here. Every Spin feeds the Vault. Every Hit draws from it. That's the whole universe."
        />
        <Block
          title="Licence"
          body="Licensed in Curaçao. We geofence jurisdictions where crypto gaming is restricted. Players in restricted regions are blocked at sign-in."
        />
        <Block
          title="Values"
          body="House Rules are a feature of the lounge, not a restriction. Every Drop carries visible Play-through. Every Spin is auditable. The Concierge is trained to respond to at-risk play with quiet options, not sales pressure."
        />
        <Block
          title="Press"
          body="For press and partnership enquiries, write to press@cryptojackpot.example — the Concierge will route you to the right host."
        />
      </div>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="lounge-card rounded-2xl p-7">
      <h2 className="display text-xl text-jp-gold tracking-[0.18em]">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-jp-mute md:text-base">
        {body}
      </p>
    </section>
  );
}
