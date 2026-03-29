"use client";

import { useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    investmentAmount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">
              فرص استثمارية مدروسة وآمنة
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              استثمر اليوم
              <span className="block text-blue-600">
                وابدأ بناء مستقبل مالي أقوى
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              نحن نساعدك على الوصول إلى فرص استثمارية مناسبة لأهدافك المالية،
              بخطوات واضحة وفريق مختص يتواصل معك مباشرة لفهم احتياجك وتقديم
              الحل الأنسب لك.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#lead-form"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                ابدأ الآن
              </a>

              <a
                href="#features"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                اعرف المزيد
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-bold text-slate-900">+500</p>
                <p className="mt-1 text-sm text-slate-500">عميل مهتم</p>
              </div>

              <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-bold text-slate-900">15+</p>
                <p className="mt-1 text-sm text-slate-500">سنوات خبرة</p>
              </div>

              <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="mt-1 text-sm text-slate-500">متابعة ودعم</p>
              </div>
            </div>
          </div>

          <div
            id="lead-form"
            className="rounded-3xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-200/70 sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                سجل اهتمامك الآن
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                اترك بياناتك وسيقوم فريقنا بالتواصل معك لعرض أفضل الخيارات
                الاستثمارية المناسبة لك.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="اكتب الاسم الكامل"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  مبلغ الاستثمار المتوقع
                </label>
                <input
                  type="text"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleChange}
                  placeholder="مثال: 50,000 ريال"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-base font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700"
              >
                إرسال الطلب
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                بإرسال هذا النموذج فأنت توافق على أن يتم التواصل معك بخصوص
                الفرص الاستثمارية والخدمات ذات الصلة.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            لماذا نحن
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            تجربة استثمار أكثر وضوحًا واحترافية
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            نمنحك بداية قوية من خلال فهم احتياجك، ثم توجيهك نحو الخيارات
            المناسبة بخطوات عملية وواضحة.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              📈
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              فرص استثمارية متنوعة
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              نوفر خيارات متعددة تناسب الأفراد الباحثين عن بداية استثمارية
              ذكية ومدروسة.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-xl">
              🤝
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              تواصل مباشر مع فريق مختص
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              بعد تسجيل بياناتك، يتواصل معك فريقنا لفهم أهدافك المالية وتقديم
              التوجيه المناسب.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-xl">
              🔒
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              خصوصية وأمان للبيانات
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              نهتم بحماية بيانات العملاء واستخدامها فقط لغرض التواصل وتقديم
              المعلومات المطلوبة.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}