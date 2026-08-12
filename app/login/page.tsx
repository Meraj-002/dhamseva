"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!mobile || !password) {
      setError("Please enter mobile number and password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, mobile, email, address")
        .eq("mobile", mobile)
        .eq("password", password)
        .maybeSingle();

      if (error) {
        console.error(error);
        setError("Something went wrong");
        return;
      }

      if (!data) {
        setError("Invalid mobile number or password");
        return;
      }

      // Simple login — no Supabase Auth
      localStorage.setItem("dhamseva_user", JSON.stringify(data));

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src="/pitra-dham.png"
          alt="Pitra Dham"
          fill
          priority
          className={styles.heroImage}
        />
      </section>

      {/* LOGIN CONTENT */}
      <section className={styles.loginSection}>
        <div className={styles.heading}>
          <h1>Welcome Back</h1>
          <p>Login to continue your spiritual journey</p>
        </div>

        {/* MOBILE */}
        <div className={styles.inputBox}>
          <div className={styles.iconCircle}>
            <span>☎</span>
          </div>

          <div className={styles.inputContent}>
            <label>Mobile Number</label>

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className={styles.inputBox}>
          <div className={styles.iconCircle}>
            <span>🔒</span>
          </div>

          <div className={styles.inputContent}>
            <label>Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "◉" : "◉̸"}
          </button>
        </div>

        {/* ERROR */}
        {error && <p className={styles.error}>{error}</p>}

        {/* FORGOT */}
        <button className={styles.forgotButton}>
          Forgot Password ?
        </button>

        {/* LOGIN */}
        <button
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <div className={styles.registerArea}>
          <span>Do not have an account?</span>

          <button onClick={() => router.push("/register")}>
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
}