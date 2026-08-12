"use client";

import { useState } from "react";
import {
  Menu,
  Bell,
  Check,
  ShieldCheck,
  Home as HomeIcon,
  BookOpen,
  Menu as MenuIcon,
} from "lucide-react";

import styles from "./home.module.css";

type Plan = {
  name: string;
  price: number;
  days: number;
  tokens: number;
  badge?: string;
};

const plans: Plan[] = [
  {
    name: "Standard",
    price: 151,
    days: 60,
    tokens: 2,
    badge: "Best Value",
  },
  {
    name: "Advance",
    price: 299,
    days: 60,
    tokens: 5,
    badge: "Popular",
  },
  {
    name: "Emergency",
    price: 350,
    days: 30,
    tokens: 1,
  },
];

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const selected = plans.find(
    (plan) => plan.name === selectedPlan
  );

  return (
    <main className={styles.page}>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>

        <div className={styles.heroBackground} />

        {/* Top buttons */}
        <div className={styles.topBar}>
          <button className={styles.iconButton} aria-label="Menu">
            <Menu size={28} strokeWidth={2.4} />
          </button>

          <button className={styles.iconButton} aria-label="Notifications">
            <Bell size={27} strokeWidth={2.2} />
          </button>
        </div>

        {/* Greeting */}
        <div className={styles.greeting}>
          <h1>
            Meraj<span>🙏</span>
          </h1>

          <p>May your ancestors bless you</p>
        </div>

        {/* Logo / Dham text */}
        <div className={styles.dhamLogo}>
          पितृ
          <br />
          धाम
        </div>

        {/* Heading */}
        <div className={styles.heading}>
          <h2>Subscription Packages</h2>
          <p>Choose a plan that suits your needs</p>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className={styles.plansSection}>

        <div className={styles.plansGrid}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;

            return (
              <button
                key={plan.name}
                type="button"
                className={`${styles.planCard} ${
                  isSelected ? styles.selectedCard : ""
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >

                {/* Selected check */}
                {isSelected && (
                  <span className={styles.selectedCheck}>
                    <Check size={16} strokeWidth={3} />
                  </span>
                )}

                {/* Badge */}
                {plan.badge && (
                  <span
                    className={`${styles.badge} ${
                      plan.badge === "Best Value"
                        ? styles.bestValue
                        : styles.popular
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Plan name */}
                <h3>{plan.name}</h3>

                {/* Price */}
                <div className={styles.price}>
                  ₹{plan.price}.00
                </div>

                {/* Days */}
                <div className={styles.days}>
                  {plan.days} Days
                </div>

                {/* Details */}
                <div className={styles.details}>

                  <div className={styles.detailRow}>
                    <Check size={17} strokeWidth={2.4} />
                    <span>Tokens: {plan.tokens}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <Check size={17} strokeWidth={2.4} />
                    <span>Validity: {plan.days} days</span>
                  </div>

                </div>

                {/* Select area */}
                <div
                  className={`${styles.selectBox} ${
                    isSelected ? styles.selectBoxSelected : ""
                  }`}
                >
                  <span
                    className={`${styles.radio} ${
                      isSelected ? styles.radioSelected : ""
                    }`}
                  >
                    {isSelected && <span />}
                  </span>

                  <span>
                    {isSelected ? "Selected" : "Tap to select"}
                  </span>
                </div>

              </button>
            );
          })}
        </div>

        {/* ================= PAY BUTTON ================= */}
        {selected && (
          <button className={styles.payButton}>
            <span>
              Pay ₹{selected.price}.00
            </span>

            <span className={styles.secure}>
              <ShieldCheck size={20} />
              Secure Payment
            </span>
          </button>
        )}

        {/* ================= CONTACT ================= */}
        <section className={styles.contactCard}>
          <h2>Contact Us</h2>

          <div className={styles.contactRow}>
            <span>✉</span>
            <p>pitradev​​dham@gmail.com</p>
          </div>

          <div className={styles.contactRow}>
            <span>⌕</span>
            <p>+91 9694159587</p>
          </div>

          <div className={styles.contactRow}>
            <span>●</span>
            <p>Pitra Dev Dham Harnathpura jaipur</p>
          </div>

          <div className={styles.socials}>
            <div>f</div>
            <div>◎</div>
            <div>▶</div>
          </div>
        </section>

      </section>

      {/* ================= BOTTOM NAV ================= */}
      <nav className={styles.bottomNav}>

        <button className={styles.navItemActive}>
          <HomeIcon size={26} strokeWidth={2.5} />
          <span>Home</span>
        </button>

        <button
          className={styles.navItem}
          onClick={() => {
            window.location.href = "/book";
          }}
        >
          <BookOpen size={25} strokeWidth={2.2} />
          <span>Book</span>
        </button>

        <button
          className={styles.navItem}
          onClick={() => {
            window.location.href = "/menu";
          }}
        >
          <MenuIcon size={26} strokeWidth={2.3} />
          <span>Menu</span>
        </button>

      </nav>

    </main>
  );
}