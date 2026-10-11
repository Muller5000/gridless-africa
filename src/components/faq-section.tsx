"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the Paystack escrow system protect my money?",
    answer:
      "Your funds are held securely in a regulated Paystack escrow account and are never released to the installer upfront. Money is disbursed in milestone tranches: 50% upon verified equipment delivery to your property, 40% after installation and operational testing, and the final 10% following your 7-day satisfaction sign-off.",
  },
  {
    question: "What happens if my installer disappears mid-project?",
    answer:
      "All installers on Gridless are CAC-registered and rigorously vetted with verified track records. Because milestone payments remain protected in Paystack escrow, your money is safe. If an installer fails to deliver or abandons work, Gridless steps in to reassign an accredited backup installer or issue a prompt refund for uncompleted milestones.",
  },
  {
    question: "Are the solar panels genuine Tier-1 quality?",
    answer:
      "Yes, absolutely. Gridless exclusively works with verified installers who deploy authentic Tier-1 BloombergNEF-listed solar panels, including Canadian Solar, LONGi, Jinko, and JA Solar. All panel serial numbers are verified against official manufacturer databases to guarantee you never receive counterfeit or downgraded gray-market equipment.",
  },
  {
    question: "How long does a typical installation take?",
    answer:
      "A typical residential installation (3kVA to 10kVA) takes just 1 to 3 days once the equipment arrives on site. Larger commercial installations (20kVA to 100kVA+) generally take 1 to 2 weeks, depending on structural roof assessments and distribution panel configurations.",
  },
  {
    question: "What maintenance does a solar system need?",
    answer:
      "Solar systems require very little routine maintenance. Main tasks include clearing surface dust and harmattan haze with clean water every 2 to 3 months, periodic inverter ventilation checks, and battery state-of-health monitoring via your inverter app. Gridless-vetted installers also offer scheduled annual check-ups.",
  },
  {
    question: "Can I finance my solar installation?",
    answer:
      "Financing partnerships and flexible installment plans with Nigerian banks and green energy funds are coming soon! Currently, projects are funded upfront through our secure Paystack escrow milestone protection, ensuring your capital is completely protected until work is verified.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "Warranties vary slightly by manufacturer and installer tier, but standard coverage includes a 10 to 12-year product warranty and 25-year performance warranty on Tier-1 panels, 2 to 5 years on pure sine wave inverters, and 3 to 10 years on lithium (LiFePO4) batteries, backed by a minimum 1-year installer workmanship guarantee.",
  },
  {
    question: "What if there's no sunlight for days?",
    answer:
      "Every Gridless system is engineered as a robust hybrid setup tailored for Nigerian weather cycles and heavy rainy seasons. Your lithium battery bank stores power for nighttime and low-sun days, while intelligent inverter controls allow seamless automatic bypass to the national grid or your generator if batteries ever run low.",
  },
];

export function FaqSection({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={cn("bg-background w-full py-16 sm:py-24", className)}>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 space-y-3 text-center sm:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
            Frequently Asked Questions
          </div>
          <h2 className="text-foreground font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Common Questions
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Everything you need to know before going solar in Nigeria
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={item.question}
                className={cn(
                  "bg-card text-card-foreground overflow-hidden rounded-xl border transition-all duration-200",
                  isOpen
                    ? "border-emerald-500/40 shadow-sm ring-1 shadow-emerald-500/5 ring-emerald-500/20"
                    : "border-border/70 hover:border-border",
                )}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                  className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none sm:p-6"
                >
                  <span className="text-foreground text-base font-medium transition-colors group-hover:text-emerald-700 sm:text-lg dark:group-hover:text-emerald-400">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
                      isOpen
                        ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-300 motion-reduce:transition-none",
                        isOpen && "rotate-180 text-emerald-600 dark:text-emerald-400",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="text-muted-foreground px-5 pt-1 pb-5 text-sm leading-relaxed sm:px-6 sm:pb-6 sm:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
