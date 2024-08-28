"use client";

import { useState } from "react";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

// Userを取得する非同期処理
const getUser = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 意図的に1秒遅らせる
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  const data: User[] = await response.json();
  return data[0];
};

const AsyncPage = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setUser(null);
    setIsPending(true);
    const user = await getUser(userId);
    setUser(user);
    setUserId("");
    setIsPending(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <input
          type="number"
          className="border py-2 px-4"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          className="py-2 px-4 border hover:bg-slate-200 disabled:opacity-30"
          onClick={handleClick}
        >
          検索
        </button>
      </div>
      {isPending && <p>読み込み中...</p>}
      {user && (
        <div>
          <p>名前: {user.name}</p>
          <p>メール: {user.email}</p>
          <p>電話番号: {user.phone}</p>
          <p>ウェブサイト: {user.website}</p>
          <p>会社: {user.company.name}</p>
        </div>
      )}
    </div>
  );
};

export default AsyncPage;
