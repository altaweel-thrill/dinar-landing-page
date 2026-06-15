"use client";

import Image from "next/image";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import { db } from "@/lib/firebase";

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
  investmentAmount: "",
  investorType: "",
};

export default function HomePage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitMessage(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await addDoc(collection(db, "investmentLeads"), {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        investmentAmount: formData.investmentAmount.trim(),
        investorType: formData.investorType,
        source: "dinar-landing-page",
        createdAt: serverTimestamp(),
      });

      setFormData(initialFormData);
      setSubmitMessage({
        type: "success",
        text: "تم إرسال طلبك بنجاح. سيتواصل معك فريقنا قريبًا.",
      });
    } catch (error) {
      console.error("Failed to submit lead", error);
      setSubmitMessage({
        type: "error",
        text: "تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white" dir="rtl">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#151515]" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#837F44]/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-[#837F44]/10 blur-3xl" />

  

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">
          
          <div className="max-w-2xl gap-4" >
            <Image
              className="p-4"
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
            <span className="inline-flex items-center rounded-full border border-[#837F44]/40 bg-[#111111] px-4 py-2 text-sm font-medium text-[#d4ce8a] shadow-sm">
              فرص استثمارية مدروسة وفاخرة
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              استثمر اليوم
              <span className="block text-[#837F44]">
                وابدأ بناء مستقبل مالي أقوى
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              نقدم لك تجربة استثمار احترافية تساعدك على الوصول إلى فرص مناسبة
              لأهدافك المالية، مع فريق مختص يتواصل معك مباشرة لفهم احتياجك
              وتقديم الحل الأنسب لك.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#lead-form"
                className="rounded-2xl bg-[#837F44] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                ابدأ الآن
              </a>

              <a
                href="#features"
                className="rounded-2xl border border-[#837F44] bg-transparent px-6 py-3 text-base font-semibold text-[#d4ce8a] transition hover:bg-[#837F44] hover:text-white"
              >
                اعرف المزيد
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5 shadow-sm">
                <p className="text-2xl font-bold text-white">+500</p>
                <p className="mt-1 text-sm text-gray-400">عميل مهتم</p>
              </div>

              <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5 shadow-sm">
                <p className="text-2xl font-bold text-white">15+</p>
                <p className="mt-1 text-sm text-gray-400">سنوات خبرة</p>
              </div>

              <div className="rounded-2xl border border-[#837F44]/20 bg-[#111111] p-5 shadow-sm">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="mt-1 text-sm text-gray-400">متابعة ودعم</p>
              </div>
            </div>
          </div>

          <div
            id="lead-form"
            className="rounded-3xl border border-[#837F44]/20 bg-[#111111] p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">سجل اهتمامك الآن</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                اترك بياناتك وسيقوم فريقنا بالتواصل معك لعرض أفضل الخيارات
                الاستثمارية المناسبة لك.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="اكتب الاسم الكامل"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  مبلغ الاستثمار المتوقع
                </label>
                <input
                  type="text"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleChange}
                  placeholder="مثال: 50,000 ريال"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-[#2a2a2a] bg-black px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#837F44]"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-200">
                  نوع المستثمر
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "مستثمر جديد", value: "new" },
                    { label: "مستثمر سابق", value: "existing" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`cursor-pointer rounded-2xl border p-4 text-center transition ${
                        formData.investorType === item.value
                          ? "border-[#837F44] bg-[#837F44]/10"
                          : "border-[#2a2a2a] bg-black"
                      }`}
                    >
                      <input
                        type="radio"
                        name="investorType"
                        value={item.value}
                        checked={formData.investorType === item.value}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="hidden"
                        required
                      />
                      <span className="text-sm font-medium text-gray-300">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#837F44] px-5 py-3 text-base font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </button>

              {submitMessage ? (
                <p
                  className={`rounded-2xl border px-4 py-3 text-center text-sm leading-6 ${
                    submitMessage.type === "success"
                      ? "border-green-500/30 bg-green-500/10 text-green-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200"
                  }`}
                  role="status"
                >
                  {submitMessage.text}
                </p>
              ) : null}

              <p className="text-center text-xs leading-5 text-gray-500">
                بإرسال هذا النموذج فأنت توافق على أن يتم التواصل معك بخصوص
                الفرص الاستثمارية والخدمات ذات الصلة.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="rounded-full border border-[#837F44]/20 bg-[#111111] px-4 py-2 text-sm font-medium text-[#d4ce8a]">
            لماذا نحن
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            تجربة استثمار أكثر وضوحًا واحترافية
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            نمنحك بداية قوية من خلال فهم احتياجك، ثم توجيهك نحو الخيارات
            المناسبة بخطوات عملية وواضحة.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#837F44]/20 bg-[#111111] p-6 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#837F44]/45 bg-black text-[#d4ce8a] shadow-[inset_0_0_0_1px_rgba(131,127,68,0.08),0_8px_24px_rgba(0,0,0,0.24)] [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%)]">
              <TrendingUp aria-hidden="true" size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-xl font-bold text-white">فرص استثمارية متنوعة</h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              نوفر خيارات متعددة تناسب الأفراد الباحثين عن بداية استثمارية ذكية
              ومدروسة.
            </p>
          </div>

          <div className="rounded-3xl border border-[#837F44]/20 bg-[#111111] p-6 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#837F44]/45 bg-black text-[#d4ce8a] shadow-[inset_0_0_0_1px_rgba(131,127,68,0.08),0_8px_24px_rgba(0,0,0,0.24)] [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%)]">
              <Handshake aria-hidden="true" size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-xl font-bold text-white">
              تواصل مباشر مع فريق مختص
            </h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              بعد تسجيل بياناتك، يتواصل معك فريقنا لفهم أهدافك المالية وتقديم
              التوجيه المناسب.
            </p>
          </div>

          <div className="rounded-3xl border border-[#837F44]/20 bg-[#111111] p-6 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#837F44]/45 bg-black text-[#d4ce8a] shadow-[inset_0_0_0_1px_rgba(131,127,68,0.08),0_8px_24px_rgba(0,0,0,0.24)] [clip-path:polygon(0_10px,10px_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%)]">
              <ShieldCheck aria-hidden="true" size={26} strokeWidth={1.8} />
            </div>
            <h3 className="text-xl font-bold text-white">خصوصية وأمان للبيانات</h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              نهتم بحماية بيانات العملاء واستخدامها فقط لغرض التواصل وتقديم
              المعلومات المطلوبة.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
