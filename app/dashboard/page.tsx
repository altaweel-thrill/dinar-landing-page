"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type Lead = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  investmentAmount: string;
  investorType: "new" | "existing";
  createdAt: Timestamp | null;
};

const investorTypeLabels: Record<Lead["investorType"], string> = {
  new: "مستثمر جديد",
  existing: "مستثمر سابق",
};

function formatLeadDate(createdAt: Lead["createdAt"]) {
  if (!createdAt) {
    return "غير محدد";
  }

  return new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(createdAt.toDate());
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setLeads([]);
      return;
    }

    setLeadsLoading(true);
    setLeadsError("");

    const leadsQuery = query(
      collection(db, "investmentLeads"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      leadsQuery,
      (snapshot) => {
        setLeads(
          snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              fullName: String(data.fullName ?? ""),
              phone: String(data.phone ?? ""),
              email: String(data.email ?? ""),
              investmentAmount: String(data.investmentAmount ?? ""),
              investorType:
                data.investorType === "existing" ? "existing" : "new",
              createdAt: (data.createdAt as Timestamp | undefined) ?? null,
            };
          }),
        );
        setLeadsLoading(false);
      },
      (error) => {
        console.error("Failed to load leads", error);
        setLeadsError(
          "تعذر تحميل البيانات. تأكد من تسجيل الدخول ونشر قواعد Firestore المحدثة.",
        );
        setLeadsLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return leads;
    }

    return leads.filter((lead) =>
      [
        lead.fullName,
        lead.phone,
        lead.email,
        lead.investmentAmount,
        investorTypeLabels[lead.investorType],
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [leads, searchTerm]);

  const totalLeads = leads.length;
  const newInvestors = leads.filter((lead) => lead.investorType === "new").length;
  const existingInvestors = totalLeads - newInvestors;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setLoginError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword("");
    } catch (error) {
      console.error("Failed to sign in", error);
      setLoginError("بيانات الدخول غير صحيحة أو أن المستخدم غير مفعل.");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authLoading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white"
        dir="rtl"
      >
        <p className="text-sm text-gray-400">جاري تحميل لوحة التحكم...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-[#070707] px-6 py-10 text-white"
        dir="rtl"
      >
        <section className="w-full max-w-md rounded-2xl border border-[#837F44]/25 bg-[#111111] p-6 shadow-2xl sm:p-8">
          <Image
            className="mb-8 h-auto w-24"
            src="/logo.png"
            alt="Dinar"
            width={96}
            height={96}
            priority
          />
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            سجل الدخول بحساب المدير لعرض طلبات الاستثمار.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                className="w-full rounded-xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                required
              />
            </div>

            {loginError ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {loginError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full rounded-xl bg-[#837F44] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningIn ? "جاري الدخول..." : "دخول"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#d4ce8a]">
              Dinar Holding
            </p>
            <h1 className="mt-2 text-3xl font-bold">طلبات الاستثمار</h1>
            <p className="mt-2 text-sm text-gray-400">
              متابعة مباشرة للطلبات الواردة من صفحة الهبوط.
            </p>
          </div>

          <button
            type="button"
            onClick={() => signOut(auth)}
            className="w-full rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-[#837F44] hover:text-white md:w-auto"
          >
            تسجيل الخروج
          </button>
        </header>

        <section className="grid gap-4 py-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5">
            <p className="text-sm text-gray-400">إجمالي الطلبات</p>
            <p className="mt-3 text-3xl font-bold">{totalLeads}</p>
          </div>
          <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5">
            <p className="text-sm text-gray-400">مستثمرون جدد</p>
            <p className="mt-3 text-3xl font-bold">{newInvestors}</p>
          </div>
          <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5">
            <p className="text-sm text-gray-400">مستثمرون سابقون</p>
            <p className="mt-3 text-3xl font-bold">{existingInvestors}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#111111]">
          <div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold">قائمة العملاء المحتملين</h2>
              <p className="mt-1 text-sm text-gray-400">
                {filteredLeads.length} نتيجة معروضة
              </p>
            </div>

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم، الجوال، البريد..."
              className="w-full rounded-xl border border-[#2a2a2a] bg-black px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44] md:max-w-sm"
            />
          </div>

          {leadsError ? (
            <p className="m-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {leadsError}
            </p>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm">
              <thead className="bg-black/40 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">الاسم</th>
                  <th className="px-4 py-3 font-semibold">الجوال</th>
                  <th className="px-4 py-3 font-semibold">البريد</th>
                  <th className="px-4 py-3 font-semibold">مبلغ الاستثمار</th>
                  <th className="px-4 py-3 font-semibold">نوع المستثمر</th>
                  <th className="px-4 py-3 font-semibold">وقت التسجيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leadsLoading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-400" colSpan={6}>
                      جاري تحميل الطلبات...
                    </td>
                  </tr>
                ) : null}

                {!leadsLoading && filteredLeads.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-400" colSpan={6}>
                      لا توجد طلبات مطابقة حالياً.
                    </td>
                  </tr>
                ) : null}

                {!leadsLoading
                  ? filteredLeads.map((lead) => (
                      <tr key={lead.id} className="transition hover:bg-white/[0.03]">
                        <td className="px-4 py-4 font-semibold text-white">
                          {lead.fullName || "-"}
                        </td>
                        <td className="px-4 py-4 text-gray-200" dir="ltr">
                          {lead.phone || "-"}
                        </td>
                        <td className="px-4 py-4 text-gray-300" dir="ltr">
                          {lead.email || "-"}
                        </td>
                        <td className="px-4 py-4 text-gray-300">
                          {lead.investmentAmount || "-"}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full border border-[#837F44]/30 bg-[#837F44]/10 px-3 py-1 text-xs font-semibold text-[#d4ce8a]">
                            {investorTypeLabels[lead.investorType]}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-300">
                          {formatLeadDate(lead.createdAt)}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
