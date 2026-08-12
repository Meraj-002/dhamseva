"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      /* Check mobile */
      const { data: existingMobile } = await supabase
        .from("profiles")
        .select("id")
        .eq("mobile", mobile)
        .maybeSingle();

      if (existingMobile) {
        setError(
          "An account with this mobile number already exists."
        );
        return;
      }

      /* Check email */
      const { data: existingEmail } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.trim())
        .maybeSingle();

      if (existingEmail) {
        setError(
          "An account with this email already exists."
        );
        return;
      }

      /* Create user */
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          full_name: fullName.trim(),
          mobile,
          email: email.trim(),
          address: address.trim(),
          password,
        });

      if (insertError) {
        throw insertError;
      }

      /* Go to login */
      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <img
          src="/logo.png"
          alt="Pitr Dham"
          className={styles.heroImage}
        />
      </section>

      {/* REGISTER */}
      <section className={styles.registerSection}>

        <div className={styles.heading}>
          <h1>Basic Details</h1>
          <p>Create your account</p>
        </div>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <User size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Full Name</label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* MOBILE */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <Phone size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Mobile Number</label>

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <Mail size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <MapPin size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Address</label>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <Lock size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Password</label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={23} />
              ) : (
                <Eye size={23} />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={styles.inputBox}>
            <div className={styles.iconCircle}>
              <Lock size={24} />
            </div>

            <div className={styles.inputContent}>
              <label>Confirm Password</label>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={23} />
              ) : (
                <Eye size={23} />
              )}
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {/* REGISTER */}
          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* LOGIN */}
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Login Now
        </button>

      </section>
    </main>
  );
}