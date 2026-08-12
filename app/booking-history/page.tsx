"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Headphones,
  PackageOpen,
} from "lucide-react";

import styles from "./booking-history.module.css";

export default function BookingHistoryPage() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.iconButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={28} strokeWidth={2.2} />
        </button>

        <div className={styles.headerText}>
          <h1>Booking History</h1>
          <p>View your past bookings</p>
        </div>

        <button className={styles.iconButton} aria-label="Calendar">
          <CalendarDays size={25} strokeWidth={2.2} />
        </button>
      </header>

      {/* Token Card */}
      <section className={styles.tokenCard}>
        <div className={styles.tokenLeft}>
          <div className={styles.tokenIcon}>
            <PackageOpen size={31} strokeWidth={2} />
          </div>

          <div>
            <p className={styles.tokenLabel}>Your Token</p>
            <h2>Token #--</h2>
          </div>
        </div>

        <div className={styles.members}>
          Total Members : --
        </div>
      </section>

      {/* Filter Tabs */}
      <div className={styles.tabsWrapper}>
        <button className={`${styles.tab} ${styles.activeTab}`}>
          All
        </button>

        <button className={styles.tab}>Booked</button>

        <button className={styles.tab}>Completed</button>

        <button className={styles.tab}>Skipped</button>
      </div>

      {/* Empty / Help Section */}
      <section className={styles.helpCard}>
        <div className={styles.helpIcon}>
          <Headphones size={34} strokeWidth={2} />
        </div>

        <div className={styles.helpText}>
          <h3>Need help?</h3>
          <p>
            Our support team is
            <br />
            here for you
          </p>
        </div>

        <button className={styles.contactButton}>
          Contact Us
        </button>
      </section>
    </main>
  );
}