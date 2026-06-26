"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CallAPIPostPromise } from "@/components/comman";
import { Icon } from "@/components/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setMessage("");

    try {
      const res = await CallAPIPostPromise("/api/users/alieyaUsers/login", {
        user_email: email,
        user_password: password,
      });

      const token = res?.data?.data?.token ?? res?.data?.token;
      if (token) localStorage.setItem("token", token);
      router.push("/admin/dashboard");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resetEmail) return;

    setIsLoading(true);
    setMessage("");

    try {
      await CallAPIPostPromise("/api/users/alieyaUsers/resetUserPasswordEmail", {
        user_name: "User",
        user_email: resetEmail,
      });
      setMessage("Password reset email requested.");
      setShowForgotPassword(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to request reset email.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="admin-login">
      <form onSubmit={handleLogin}>
        <div className="admin-login-mark">
          <Icon name="shield" />
        </div>
        <p className="eyebrow">Admin Portal</p>
        <h1>Alieya Junejaa</h1>
        <label>
          Email Address
          <input
            type="email"
            placeholder="aaliyahjuneja1@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <div className="login-actions">
          <label className="remember-row">
            <input type="checkbox" /> Remember me
          </label>
          <button type="button" onClick={() => setShowForgotPassword(true)}>
            Forgot Password?
          </button>
        </div>
        <button className="pill-button admin-submit" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {message ? <p className="form-status">{message}</p> : null}
        <Link className="back-link" href="/">Back to Website</Link>
      </form>

      {showForgotPassword ? (
        <div className="modal-backdrop">
          <form className="reset-dialog" onSubmit={handleForgotPassword}>
            <h2>Reset Password</h2>
            <p>Enter your email address and we will request a reset link.</p>
            <label>
              Email Address
              <input
                type="email"
                value={resetEmail}
                onChange={(event) => setResetEmail(event.target.value)}
                required
              />
            </label>
            <div className="form-footer">
              <button className="outline-button" type="button" onClick={() => setShowForgotPassword(false)}>
                Cancel
              </button>
              <button className="pill-button" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
