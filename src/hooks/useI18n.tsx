import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Lang, string>> = {
  "IoT Health Monitor": { en: "IoT Health Monitor", ar: "مراقب الصحة إنترنت الأشياء" },
  "Dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "Patient Profile": { en: "Patient Profile", ar: "ملف المريض" },
  "Doctor View": { en: "Doctor View", ar: "عرض الطبيب" },
  "Alerts": { en: "Alerts", ar: "التنبيهات" },
  "Device": { en: "Device", ar: "الجهاز" },
  "API Keys": { en: "API Keys", ar: "مفاتيح API" },
  "Chat": { en: "Chat", ar: "المحادثة" },
  "Navigation": { en: "Navigation", ar: "التنقل" },
  "Logout": { en: "Logout", ar: "تسجيل الخروج" },
  "Patient Monitor": { en: "Patient Monitor", ar: "مراقبة المريض" },
  "Heart Rate": { en: "Heart Rate", ar: "معدل ضربات القلب" },
  "Blood Oxygen": { en: "Blood Oxygen", ar: "أكسجين الدم" },
  "BPM Trend": { en: "BPM Trend", ar: "اتجاه النبض" },
  "SpO2 Trend": { en: "SpO2 Trend", ar: "اتجاه الأكسجين" },
  "Connected": { en: "Connected", ar: "متصل" },
  "Normal": { en: "Normal", ar: "طبيعي" },
  "Warning": { en: "Warning", ar: "تحذير" },
  "Critical": { en: "Critical", ar: "حرج" },
  "Average": { en: "Average", ar: "المتوسط" },
  "Max": { en: "Max", ar: "الأعلى" },
  "Min": { en: "Min", ar: "الأدنى" },
  "Last updated": { en: "Last updated", ar: "آخر تحديث" },
  "Health Monitor": { en: "Health Monitor", ar: "مراقب الصحة" },
  "VitaLink": { en: "VitaLink", ar: "فيتالينك" },
  "Export CSV": { en: "Export CSV", ar: "تصدير CSV" },
  "Export JSON": { en: "Export JSON", ar: "تصدير JSON" },
  "Import Data": { en: "Import Data", ar: "استيراد البيانات" },
  "Personal Information": { en: "Personal Information", ar: "المعلومات الشخصية" },
  "Weekly Health Summary": { en: "Weekly Health Summary", ar: "ملخص الصحة الأسبوعي" },
  "Generate Key": { en: "Generate Key", ar: "إنشاء مفتاح" },
  "Write Key": { en: "Write Key", ar: "مفتاح الكتابة" },
  "Read Key": { en: "Read Key", ar: "مفتاح القراءة" },
  "External Keys": { en: "External Keys", ar: "المفاتيح الخارجية" },
  "Arduino Integration": { en: "Arduino Integration", ar: "تكامل أردوينو" },
  "Search alerts": { en: "Search alerts", ar: "بحث في التنبيهات" },
  "All": { en: "All", ar: "الكل" },
  "Active": { en: "Active", ar: "نشط" },
  "Resolved": { en: "Resolved", ar: "تم الحل" },
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
