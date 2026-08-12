"use client";

import { useState } from "react";
import {
  CalendarDays,
  Bell,
  ChevronLeft,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Home,
  Menu,
  BookOpen,
} from "lucide-react";

import styles from "./book.module.css";

const availableDates = [11, 15, 18, 22, 25, 29];

const weeks = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [tokens, setTokens] = useState(1);
  const [participants, setParticipants] = useState("");

  const increaseTokens = () => {
    setTokens((prev) => prev + 1);
  };

  const decreaseTokens = () => {
    setTokens((prev) => Math.max(1, prev - 1));
  };

  return (
    <main className={styles.page}>
      {/* ================= TOP HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroIcon}>
          <CalendarDays size={38} strokeWidth={2.5} />
        </div>

        <h1>Book Now</h1>

        <p>Select a date for your ritual</p>
      </section>

      {/* ================= WARNING ================= */}
      <section className={styles.warningCard}>
        <div className={styles.warningIcon}>
          <Bell size={25} fill="white" />
        </div>

        <div className={styles.warningContent}>
          <h3>कृपया ध्यान रखें –</h3>

          <p>
            जितने लोग आएंगे, उतने ही टोकन लेना आवश्यक है।
            <br />
            आपकी सुविधा और पूजा की व्यवस्था के लिए यह जरूरी है।
          </p>
        </div>
      </section>

      {/* ================= CALENDAR ================= */}
      <section className={styles.calendarCard}>
        <div className={styles.calendarHeader}>
          <button className={styles.monthArrow}>
            <ChevronLeft size={30} />
          </button>

          <h2>August 2026</h2>

          <button className={styles.monthArrow}>
            <ChevronRight size={30} />
          </button>
        </div>

        <div className={styles.weekDays}>
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>

        <div className={styles.calendarGrid}>
          {weeks.flat().map((date, index) => {
            if (!date) {
              return <div key={index} className={styles.emptyDate} />;
            }

            const isAvailable = availableDates.includes(date);
            const isSelected = selectedDate === date;

            return (
              <button
                key={index}
                disabled={!isAvailable}
                onClick={() => setSelectedDate(date)}
                className={`
                  ${styles.dateButton}
                  ${!isAvailable ? styles.disabledDate : ""}
                  ${isAvailable ? styles.availableDate : ""}
                  ${isSelected ? styles.selectedDate : ""}
                `}
              >
                {date}
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= SELECTED DATE ================= */}
      <section className={styles.selectedSection}>
        <h2>Selected Date</h2>

        <div className={styles.selectedDateBox}>
          <CalendarDays size={38} strokeWidth={2} />

          {selectedDate && (
            <div className={styles.selectedDateText}>
              <strong>{selectedDate} August 2026</strong>
            </div>
          )}
        </div>
      </section>

      {/* ================= PARTICIPANTS ================= */}
      <section className={styles.formCard}>
        <h2>प्रतिभागियों के नाम दर्ज करें</h2>

        <textarea
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          placeholder="यहाँ नाम दर्ज करें"
          className={styles.participantInput}
        />

        <div className={styles.infoText}>
          <Info size={22} />

          <p>
            सभी प्रतिभागियों के नाम एक के बाद एक लिखें। जितने लोग आएंगे,
            उतने नाम दर्ज करें।
          </p>
        </div>
      </section>

      {/* ================= TOKEN SECTION ================= */}
      <section className={styles.tokenCard}>
        <h2>कितने टोकन खरीदना है?</h2>

        <div className={styles.counter}>
          <button
            type="button"
            onClick={decreaseTokens}
            className={styles.counterButton}
          >
            <Minus size={25} />
          </button>

          <span>{tokens}</span>

          <button
            type="button"
            onClick={increaseTokens}
            className={styles.counterButton}
          >
            <Plus size={25} />
          </button>
        </div>

        <p className={styles.tokenWarning}>
          <strong>कृपया ध्यान रखें:</strong> जितने लोग आएंगे, उतने ही टोकन
          खरीदें।
        </p>
      </section>

      {/* ================= BOOK BUTTON ================= */}
      <button
        className={styles.bookButton}
        disabled={!selectedDate}
      >
        Book This Date
      </button>

      {/* ================= BOTTOM NAV ================= */}
      <nav className={styles.bottomNav}>
        <a href="/home" className={styles.navItem}>
          <Home size={27} />
          <span>Home</span>
        </a>

        <a
          href="/book"
          className={`${styles.navItem} ${styles.activeNav}`}
        >
          <BookOpen size={27} />
          <span>Book</span>
        </a>

        <a href="/menu" className={styles.navItem}>
          <Menu size={28} />
          <span>Menu</span>
        </a>
      </nav>
    </main>
  );
}

