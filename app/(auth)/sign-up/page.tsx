"use client";

import { useRef } from "react";
import { createUser } from "@/actions/userActions";

export default function UserForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !userName || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await createUser({ email, userName, password });
      console.log("Created User:", response)
      alert(`User created with : ${response.user.userName}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref={emailRef} placeholder="Email" required />
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" ref={userNameRef} placeholder="Username" required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} placeholder="Password" required />
      </div>

      <button type="submit">Create User</button>
    </form>
  );
}
