"use client";

import { useRouter } from "next/navigation";
import {
  UserRound,
  History,
  Newspaper,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Home,
  BookOpen,
  Menu as MenuIcon,
} from "lucide-react";

import styles from "./menu.module.css";

export default function MenuPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: "Profile",
      subtitle: "View and edit your profile",
      icon: UserRound,
      path: "/profile",
    },
    {
      title: "Booking History",
      subtitle: "View your past bookings",
      icon: History,
      path: "/booking-history",
    },
    {
      title: "News",
      subtitle: "View News",
      icon: Newspaper,
      path: "/news",
    },
    {
      title: "Terms & Conditions",
      subtitle: "Read our terms and conditions",
      icon: FileText,
      path: "/terms",
    },
    {
      title: "Privacy Policy",
      subtitle: "Learn how we protect your data",
      icon: ShieldCheck,
      path: "/privacy",
    },
  ];

  function handleLogout() {
    // Later we will connect this with Supabase logout.
    router.push("/");
  }

  return (
    <main className={styles.page}>

      {/* ================= USER HEADER ================= */}
      <section className={styles.userHeader}>
        <div className={styles.profileImage}>
          <span>M</span>
        </div>

        <div className={styles.userInfo}>
          <h1>Meraj</h1>
          <p>techymeraj@gmail.com</p>
        </div>

        <ChevronRight className={styles.headerArrow} size={30} />
      </section>


      {/* ================= MENU ITEMS ================= */}
      <section className={styles.menuList}>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={styles.menuCard}
              onClick={() => router.push(item.path)}
            >

              <div className={styles.iconCircle}>
                <Icon size={29} strokeWidth={2} />
              </div>

              <div className={styles.cardText}>
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
              </div>

              <ChevronRight
                className={styles.cardArrow}
                size={30}
                strokeWidth={1.8}
              />

            </button>
          );
        })}


        {/* ================= LOGOUT ================= */}
        <button
          className={`${styles.menuCard} ${styles.logoutCard}`}
          onClick={handleLogout}
        >

          <div className={`${styles.iconCircle} ${styles.logoutIcon}`}>
            <LogOut size={29} strokeWidth={2} />
          </div>

          <div className={styles.cardText}>
            <h2>Log Out</h2>
            <p>Sign out from your account</p>
          </div>

          <ChevronRight
            className={styles.cardArrow}
            size={30}
            strokeWidth={1.8}
          />

        </button>

      </section>


      {/* ================= BOTTOM NAV ================= */}
      <nav className={styles.bottomNav}>

        <button
          className={styles.navItem}
          onClick={() => router.push("/home")}
        >
          <Home size={27} strokeWidth={2.2} />
          <span>Home</span>
        </button>


        <button
          className={styles.navItem}
          onClick={() => router.push("/book")}
        >
          <BookOpen size={27} strokeWidth={2.2} />
          <span>Book</span>
        </button>


        <button
          className={`${styles.navItem} ${styles.activeNav}`}
        >
          <MenuIcon size={28} strokeWidth={2.2} />
          <span>Menu</span>
        </button>

      </nav>

    </main>
  );
}