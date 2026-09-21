"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const stored = localStorage.getItem("dhamseva_user");

        if (!stored) {
          router.push("/login");
          return;
        }

        const parsed = JSON.parse(stored);
        const id = parsed?.id;

        if (!id) {
          router.push("/login");
          return;
        }

        setUserId(id);

        const { data, error } = await supabase
          .from("profiles")
          .select(
            "id, full_name, mobile, email, address, avatar_url"
          )
          .eq("id", id)
          .single();

        if (error) {
          console.error("Profile fetch error:", error);
          return;
        }

        if (!active) return;

        setFullName(data?.full_name || "");
        setMobile(data?.mobile || "");
        setEmail(data?.email || "");
        setAddress(data?.address || "");
        setAvatarUrl(data?.avatar_url || "");
      } catch (error) {
        console.error(error);
        router.push("/login");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    const preview = URL.createObjectURL(file);
    setAvatarUrl(preview);
  }

  async function uploadAvatar() {
    if (!avatarFile || !userId) {
      return avatarUrl;
    }

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;

    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return avatarUrl;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  async function handleUpdate() {
    if (!userId) return;

    try {
      setSaving(true);

      let finalAvatarUrl = avatarUrl;

      if (avatarFile) {
        finalAvatarUrl = await uploadAvatar();
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          mobile: mobile.trim(),
          email: email.trim(),
          address: address.trim(),
          avatar_url: finalAvatarUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        console.error("Profile update error:", error);
        alert("Unable to update profile.");
        return;
      }

      setAvatarFile(null);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className={styles.loadingScreen}>
        Loading...
      </main>
    );
  }

  return (
    <main className={styles.page}>

      {/* TOP HERO */}
      <section className={styles.hero}>

        <button
          className={styles.backButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={31} strokeWidth={2.3} />
        </button>

        <h1>My Profile</h1>

      </section>


      {/* PROFILE CARD */}
      <section className={styles.profileSection}>

        {/* AVATAR */}
        <div className={styles.avatarWrapper}>

          <div className={styles.avatar}>

            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
              />
            ) : (
              <User
                size={76}
                strokeWidth={1.8}
              />
            )}

          </div>

          <label
            htmlFor="avatar-upload"
            className={styles.cameraButton}
          >
            <Camera
              size={31}
              strokeWidth={2.2}
            />
          </label>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />

        </div>


        {/* FORM */}
        <div className={styles.form}>

          {/* FULL NAME */}
          <div className={styles.inputCard}>

            <div className={styles.iconCircle}>
              <User size={31} strokeWidth={2.2} />
            </div>

            <div className={styles.inputContent}>
              <label>Full Name</label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Enter name"
              />
            </div>

          </div>


          {/* MOBILE */}
          <div className={styles.inputCard}>

            <div className={styles.iconCircle}>
              <Phone size={31} strokeWidth={2.2} />
            </div>

            <div className={styles.inputContent}>
              <label>Mobile</label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value)
                }
                placeholder="Enter mobile"
              />
            </div>

          </div>


          {/* EMAIL */}
          <div className={styles.inputCard}>

            <div className={styles.iconCircle}>
              <Mail size={31} strokeWidth={2.2} />
            </div>

            <div className={styles.inputContent}>
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter email"
              />
            </div>

          </div>


          {/* ADDRESS */}
          <div className={styles.inputCard}>

            <div className={styles.iconCircle}>
              <MapPin size={31} strokeWidth={2.2} />
            </div>

            <div className={styles.inputContent}>
              <label>Address</label>

              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Enter address"
              />
            </div>

          </div>


          {/* UPDATE BUTTON */}
          <button
            className={styles.updateButton}
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Profile"}
          </button>

        </div>

      </section>

    </main>
  );
}