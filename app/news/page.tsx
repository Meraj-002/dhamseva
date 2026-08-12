"use client";

import styles from "./news.module.css";
import { ArrowLeft, Bell, Newspaper, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewsPage() {
  const router = useRouter();

  return (
    <main className={styles.page}>

      {/* Header */}
      <header className={styles.header}>

        <button
          className={styles.headerButton}
          onClick={() => router.back()}
          aria-label="Back"
        >
          <ArrowLeft size={30} strokeWidth={2.2} />
        </button>

        <button
          className={styles.headerButton}
          aria-label="Notifications"
        >
          <Bell size={26} strokeWidth={2.2} />
        </button>

      </header>


      {/* News Hero */}
      <section className={styles.hero}>

        <div className={styles.newsIconBox}>
          <Newspaper
            size={62}
            strokeWidth={2.1}
          />
        </div>

        <div className={styles.heroText}>
          <h1>News &amp; Updates</h1>

          <p>
            Stay informed with the latest
            <br />
            updates from the temple
          </p>
        </div>

      </section>


      {/* News List */}
      <section className={styles.newsList}>

        <article className={styles.newsCard}>

          <h2>दरबार सूचना</h2>

          <p className={styles.newsDescription}>
            कल मंगलवार को दरबार लगेगा
            <br />
            30 जून
          </p>

          <div className={styles.divider} />

          <div className={styles.date}>
            <CalendarDays size={23} strokeWidth={1.8} />
            <span>29 Jun 2026</span>
          </div>

        </article>

      </section>

    </main>
  );
}