"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

type Mode = "login" | "register";

export default function Home() {
  const [mode, setMode] = useState<Mode>("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="auth-page">
      <div className="auth-container">

        {/* BRANDING */}
        <section className="auth-hero">
          <div className="hero-overlay" />

          <div className="hero-content">
            <img
              src="/logo.png"
              alt="DhamSeva"
              className="dhamseva-logo"
            />

            <div className="hero-text">
              <span>Your Faith</span>
              <span className="hero-dot">•</span>
              <span>Our Service</span>
            </div>
          </div>
        </section>

        {/* LOGIN / REGISTER */}
        <section className="auth-form-section">
          {mode === "register" ? (
            <RegisterForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              onLogin={() => setMode("login")}
            />
          ) : (
            <LoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onRegister={() => setMode("register")}
            />
          )}
        </section>

      </div>
    </main>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function LoginForm({
  showPassword,
  setShowPassword,
  onRegister,
}: {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onRegister: () => void;
}) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Supabase Auth uses email + password.
       * Since DhamSeva's UI uses mobile number,
       * we first find the email belonging to this mobile.
       *
       * For security, this lookup will eventually be moved
       * to a server-side function. For now we keep the UI
       * working and use the profiles table.
       */

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("mobile", mobile.trim())
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!profile?.email) {
        setError("No account found with this mobile number.");
        return;
      }

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: profile.email,
          password,
        });

      if (loginError) {
        throw loginError;
      }

      /*
       * Login successful.
       *
       * For now we'll show a simple message.
       * In the next step this will redirect to the
       * actual DhamSeva home/dashboard.
       */

      router.push("/home");

    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-wrapper">

      <div className="form-heading">
        <h1>Welcome Back</h1>
        <p>Login to continue your spiritual journey</p>
      </div>

      <form onSubmit={handleLogin}>

        <InputField
          icon={<Phone size={23} />}
          label="Mobile Number"
          placeholder="Enter your mobile number"
          type="tel"
          value={mobile}
          onChange={setMobile}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={password}
          onChange={setPassword}
        />

        <div className="forgot-password">
          <button type="button">
            Forgot Password ?
          </button>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}

          {!loading && <ArrowRight size={21} />}
        </button>

      </form>

      <div className="bottom-switch">
        <span>Do not have an account?</span>

        <button
          type="button"
          onClick={onRegister}
        >
          Register Now
        </button>
      </div>

    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function RegisterForm({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onLogin,
}: {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  onLogin: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
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
      /*
       * Check whether this mobile number is already registered.
       */
      const { data: existingProfile, error: mobileCheckError } =
        await supabase
          .from("profiles")
          .select("id")
          .eq("mobile", mobile.trim())
          .maybeSingle();

      if (mobileCheckError) {
        throw mobileCheckError;
      }

      if (existingProfile) {
        setError(
          "An account with this mobile number already exists."
        );
        return;
      }

      /*
       * Create Supabase Auth account.
       *
       * The database trigger we created earlier will automatically
       * create the corresponding row in public.profiles.
       */
      const { data, error: authError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              mobile: mobile.trim(),
              address: address.trim(),
            },
          },
        });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error("Unable to create account.");
      }

      setSuccess(
        "Account created successfully! You can now login."
      );

      setFullName("");
      setMobile("");
      setEmail("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");

    } catch (err: unknown) {
      console.error("Registration error:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-wrapper register-wrapper">

      <div className="form-heading">
        <h1>Basic Details</h1>
        <p>Create your account</p>
      </div>

      <form onSubmit={handleRegister}>

        <InputField
          icon={<User size={23} />}
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
        />

        <InputField
          icon={<Phone size={23} />}
          label="Mobile Number"
          placeholder="Enter mobile number"
          type="tel"
          value={mobile}
          onChange={setMobile}
        />

        <InputField
          icon={<Mail size={23} />}
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <InputField
          icon={<MapPin size={23} />}
          label="Address"
          placeholder="Enter address"
          value={address}
          onChange={setAddress}
        />

        <PasswordField
          label="Password"
          placeholder="Enter password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={password}
          onChange={setPassword}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter password"
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}

          {!loading && <ArrowRight size={21} />}
        </button>

      </form>

      <button
        type="button"
        className="secondary-button"
        onClick={onLogin}
      >
        Login Now
      </button>

    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="input-box">

      <div className="input-icon">
        {icon}
      </div>

      <div className="input-content">

        <label>{label}</label>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />

      </div>

    </div>
  );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
  label,
  placeholder,
  showPassword,
  setShowPassword,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="input-box">

      <div className="input-icon">
        <Lock size={23} />
      </div>

      <div className="input-content">

        <label>{label}</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />

      </div>

      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility"
      >
        {showPassword ? (
          <EyeOff size={22} />
        ) : (
          <Eye size={22} />
        )}
      </button>

    </div>
  );
}