import { useState } from "react";
import Icon from "./Icon";

// ----- Pricing ka data (yahan se text/price badal sakte hain) -----
const YEARLY_DISCOUNT = 0.2; // 20%

const PLANS = [
  {
    name: "Free",
    tagline: "Try it out",
    monthly: 0,
    cta: "Get Started",
    features: [
      { text: "5 images per month", included: true },
      { text: "Standard quality", included: true },
      { text: "Watermark", included: false },
    ],
  },
  {
    name: "Pro",
    tagline: "For creators",
    monthly: 9,
    cta: "Subscribe Now",
    featured: true,
    features: [
      { text: "200 images per month", included: true },
      { text: "HD quality", included: true },
      { text: "No watermark", included: true },
      { text: "Fast processing", included: true },
    ],
  },
  {
    name: "Business",
    tagline: "For teams",
    monthly: 29,
    cta: "Contact Sales",
    features: [
      { text: "Unlimited images", included: true },
      { text: "Batch processing", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
    ],
  },
];


export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const perMonth = (m) => (yearly ? +(m * (1 - YEARLY_DISCOUNT)).toFixed(2) : m);

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__head">
        <h2>Simple, transparent pricing</h2>
        <p>Start free, upgrade anytime.</p>

        <div className="pricing__toggle">
          <div className="segmented">
            <button type="button" className={!yearly ? "is-active" : ""} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" className={yearly ? "is-active" : ""} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
          <span className="chip">Save 20%</span>
        </div>
      </div>

      <div className="pricing__grid">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`plan-wrap ${plan.featured ? "plan-wrap--featured" : ""}`}>
            <article className="plan">
              <div>
                <div className="plan__top">
                  <div>
                    <h3>{plan.name}</h3>
                    <span className="plan__tagline">{plan.tagline}</span>
                  </div>
                  {plan.featured && <span className="badge">Most Popular</span>}
                </div>

                <div className="plan__price">
                  <strong>${perMonth(plan.monthly)}</strong>
                  <span>/ month</span>
                </div>
                <p className="plan__billed">
                  {yearly && plan.monthly > 0
                    ? `Billed $${Math.round(plan.monthly * (1 - YEARLY_DISCOUNT) * 12)} yearly`
                    : "\u00A0"}
                </p>

                <ul className="plan__list">
                  {plan.features.map((f) => (
                    <li key={f.text} className={f.included ? "" : "is-off"}>
                      <span className={`tick ${f.included ? "tick--on" : ""}`}>
                        <Icon name={f.included ? "check" : "info"} size={12} />
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`btn btn--block ${plan.featured ? "btn--primary" : "btn--outline"}`}
              >
                {plan.cta}
              </button>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
