import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Lang, string>> = {
  // Header & layout
  "IoT Health Monitor": { en: "IoT Health Monitor", ar: "مراقب الصحة إنترنت الأشياء" },

  // Sidebar
  "Dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "My Profile": { en: "My Profile", ar: "ملفي الشخصي" },
  "Doctor View": { en: "Doctor View", ar: "عرض الطبيب" },
  "Alerts": { en: "Alerts", ar: "التنبيهات" },
  "Device": { en: "Device", ar: "الجهاز" },
  "API Keys": { en: "API Keys", ar: "مفاتيح API" },
  "Chat": { en: "Chat", ar: "المحادثة" },
  "Navigation": { en: "Navigation", ar: "التنقل" },
  "Logout": { en: "Logout", ar: "تسجيل الخروج" },
  "VitaLink": { en: "VitaLink", ar: "فيتالينك" },
  "Health Monitor": { en: "Health Monitor", ar: "مراقب الصحة" },

  // Dashboard
  "Patient Monitor": { en: "Patient Monitor", ar: "مراقبة المريض" },
  "Real-time heart rate & blood oxygen tracking": { en: "Real-time heart rate & blood oxygen tracking", ar: "تتبع معدل ضربات القلب وأكسجين الدم في الوقت الفعلي" },
  "Sensor Active": { en: "Sensor Active", ar: "المستشعر نشط" },
  "Disconnected": { en: "Disconnected", ar: "غير متصل" },
  "Heart Rate": { en: "Heart Rate", ar: "معدل ضربات القلب" },
  "Blood Oxygen (SpO2)": { en: "Blood Oxygen (SpO2)", ar: "أكسجين الدم (SpO2)" },
  "Current Range": { en: "Current Range", ar: "النطاق الحالي" },
  "Saturation Level": { en: "Saturation Level", ar: "مستوى التشبع" },
  "Avg": { en: "Avg", ar: "المتوسط" },
  "Max": { en: "Max", ar: "الأعلى" },
  "Min": { en: "Min", ar: "الأدنى" },
  "Average": { en: "Average", ar: "المتوسط" },
  "Status": { en: "Status", ar: "الحالة" },
  "Healthy": { en: "Healthy", ar: "صحي" },
  "Low": { en: "Low", ar: "منخفض" },
  "Heart Rate Trend": { en: "Heart Rate Trend", ar: "اتجاه معدل ضربات القلب" },
  "SpO2 Trend": { en: "SpO2 Trend", ar: "اتجاه الأكسجين" },
  "Normal": { en: "Normal", ar: "طبيعي" },
  "Warning": { en: "Warning", ar: "تحذير" },
  "Critical": { en: "Critical", ar: "حرج" },

  // API Keys page
  "Manage authentication keys for your Arduino device and external services": {
    en: "Manage authentication keys for your Arduino device and external services",
    ar: "إدارة مفاتيح المصادقة لجهاز أردوينو والخدمات الخارجية",
  },
  "Generate Write Key": { en: "Generate Write Key", ar: "إنشاء مفتاح كتابة" },
  "Generate Read Key": { en: "Generate Read Key", ar: "إنشاء مفتاح قراءة" },
  "Add External API Key": { en: "Add External API Key", ar: "إضافة مفتاح API خارجي" },
  "Paste an API key from a third-party service (e.g., cloud MQTT broker, webhook endpoint)": {
    en: "Paste an API key from a third-party service (e.g., cloud MQTT broker, webhook endpoint)",
    ar: "الصق مفتاح API من خدمة خارجية (مثل وسيط MQTT السحابي، نقطة نهاية الويب هوك)",
  },
  "Label": { en: "Label", ar: "التسمية" },
  "e.g. MQTT Broker": { en: "e.g. MQTT Broker", ar: "مثال: وسيط MQTT" },
  "Paste your key here": { en: "Paste your key here", ar: "الصق مفتاحك هنا" },
  "Save Key": { en: "Save Key", ar: "حفظ المفتاح" },
  "Arduino Integration Guide": { en: "Arduino Integration Guide", ar: "دليل تكامل أردوينو" },
  "Created": { en: "Created", ar: "تاريخ الإنشاء" },
  "Last used": { en: "Last used", ar: "آخر استخدام" },
  "Never": { en: "Never", ar: "لم يُستخدم" },
  "Copied!": { en: "Copied!", ar: "تم النسخ!" },
  "API key copied to clipboard.": { en: "API key copied to clipboard.", ar: "تم نسخ مفتاح API." },
  "Key regenerated": { en: "Key regenerated", ar: "تم تجديد المفتاح" },
  "Your old key is now invalid.": { en: "Your old key is now invalid.", ar: "مفتاحك القديم لم يعد صالحاً." },
  "Key generated": { en: "Key generated", ar: "تم إنشاء المفتاح" },
  "Key deleted": { en: "Key deleted", ar: "تم حذف المفتاح" },
  "The API key has been removed.": { en: "The API key has been removed.", ar: "تم إزالة مفتاح API." },
  "Missing fields": { en: "Missing fields", ar: "حقول مفقودة" },
  "Please enter both a label and key.": { en: "Please enter both a label and key.", ar: "يرجى إدخال التسمية والمفتاح." },
  "Key saved": { en: "Key saved", ar: "تم حفظ المفتاح" },
  "External API key has been stored.": { en: "External API key has been stored.", ar: "تم تخزين مفتاح API الخارجي." },

  // Profile page
  "Patient Profile": { en: "Patient Profile", ar: "ملف المريض" },
  "Personal Information": { en: "Personal Information", ar: "المعلومات الشخصية" },
  "Weekly Health Summary": { en: "Weekly Health Summary", ar: "ملخص الصحة الأسبوعي" },
  "Export CSV": { en: "Export CSV", ar: "تصدير CSV" },
  "Export JSON": { en: "Export JSON", ar: "تصدير JSON" },
  "Import Data": { en: "Import Data", ar: "استيراد البيانات" },

  // Alerts
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
