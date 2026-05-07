import { createContext, useContext, ReactNode } from "react";

interface I18nContextType {
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
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

  // Landing page - Objectives
  "Real-time Monitoring": { en: "Real-time Monitoring", ar: "المراقبة الفورية" },
  "Continuous heart rate & SpO2 tracking from your IoT device with millisecond precision.": { en: "Continuous heart rate & SpO2 tracking from your IoT device with millisecond precision.", ar: "تتبع مستمر لمعدل ضربات القلب وSpO2 من جهاز إنترنت الأشياء بدقة المللي ثانية." },
  "Smart Alerts": { en: "Smart Alerts", ar: "التنبيهات الذكية" },
  "AI-powered instant notifications when vitals leave the safe range, with customizable thresholds.": { en: "AI-powered instant notifications when vitals leave the safe range, with customizable thresholds.", ar: "إشعارات فورية مدعومة بالذكاء الاصطناعي عندما تخرج العلامات الحيوية عن النطاق الآمن، مع عتبات قابلة للتخصيص." },
  "Doctor Access": { en: "Doctor Access", ar: "وصول الطبيب" },
  "Seamless data sharing with healthcare providers for remote diagnostics and timely interventions.": { en: "Seamless data sharing with healthcare providers for remote diagnostics and timely interventions.", ar: "مشاركة بيانات سلسة مع مقدمي الرعاية الصحية للتشخيص عن بُعد والتدخلات في الوقت المناسب." },
  "Secure & Private": { en: "Secure & Private", ar: "آمن وخاص" },
  "End-to-end encryption with HIPAA-compliant data handling and role-based access controls.": { en: "End-to-end encryption with HIPAA-compliant data handling and role-based access controls.", ar: "تشفير شامل مع معالجة بيانات متوافقة مع HIPAA وضوابط وصول قائمة على الأدوار." },
  "Project Objectives": { en: "Project Objectives", ar: "أهداف المشروع" },
  "Empowering patients and doctors with continuous, accessible, and intelligent vital sign monitoring.": { en: "Empowering patients and doctors with continuous, accessible, and intelligent vital sign monitoring.", ar: "تمكين المرضى والأطباء من خلال مراقبة العلامات الحيوية المستمرة والمتاحة والذكية." },
  "Our Mission": { en: "Our Mission", ar: "مهمتنا" },
  "HealthLink was developed to address the growing need for accessible, continuous health monitoring. By combining IoT technology with modern web platforms, we aim to democratize healthcare and bring hospital-grade monitoring to every home.": { en: "HealthLink was developed to address the growing need for accessible, continuous health monitoring. By combining IoT technology with modern web platforms, we aim to democratize healthcare and bring hospital-grade monitoring to every home.", ar: "تم تطوير HealthLink لتلبية الاحتياج المتزايد للمراقبة الصحية المستمرة والمتاحة. من خلال دمج تقنية إنترنت الأشياء مع المنصات الحديثة، نهدف إلى إضفاء الطابع الديمقراطي على الرعاية الصحية وإحضار مراقبة مستوى المستشفى إلى كل منزل." },
  "Continuous Health Tracking": { en: "Continuous Health Tracking", ar: "التتبع الصحي المستمر" },
  "Enable 24/7 monitoring of vital signs through affordable Arduino-based IoT sensors, making healthcare accessible to everyone regardless of location or economic status.": { en: "Enable 24/7 monitoring of vital signs through affordable Arduino-based IoT sensors, making healthcare accessible to everyone regardless of location or economic status.", ar: "تمكين مراقبة العلامات الحيوية على مدار الساعة طوال أيام الأسبوع من خلال أجهزة استشعار إنترنت الأشياء Arduino بأسعار معقولة، مما يجعل الرعاية الصحية متاحة للجميع بغض النظر عن الموقع أو الوضع الاقتصادي." },
  "Early Warning System": { en: "Early Warning System", ar: "نظام الإنذار المبكر" },
  "Detect abnormal patterns in heart rate and blood oxygen levels before they become critical, enabling preventive care and reducing emergency situations.": { en: "Detect abnormal patterns in heart rate and blood oxygen levels before they become critical, enabling preventive care and reducing emergency situations.", ar: "اكتشاف الأنماط غير الطبيعية في معدل ضربات القلب ومستويات الأكسجين قبل أن تصبح حرجة، مما يتيح الرعاية الوقائية وتقليل حالات الطوارئ." },
  "Remote Patient Care": { en: "Remote Patient Care", ar: "الرعاية عن بُعد للمرضى" },
  "Bridge the gap between patients and healthcare providers through real-time data sharing, allowing doctors to monitor multiple patients remotely and intervene when necessary.": { en: "Bridge the gap between patients and healthcare providers through real-time data sharing, allowing doctors to monitor multiple patients remotely and intervene when necessary.", ar: "سد الفجوة بين المرضى ومقدمي الرعاية الصحية من خلال مشاركة البيانات في الوقت الفعلي، مما يسمح للأطباء بمراقبة العديد من المرضى عن بُعد والتدخل عند الضرورة." },
  "Data-Driven Decisions": { en: "Data-Driven Decisions", ar: "قرارات قائمة على البيانات" },
  "Transform raw sensor data into actionable insights with trend analysis, historical reports, and intelligent recommendations for better health management.": { en: "Transform raw sensor data into actionable insights with trend analysis, historical reports, and intelligent recommendations for better health management.", ar: "تحويل بيانات المستشعر الخام إلى رؤى قابلة للتنفيذ مع تحليل الاتجاهات والتقارير التاريخية والتوصيات الذكية لإدارة صحة أفضل." },
  "Patient Empowerment": { en: "Patient Empowerment", ar: "تمكين المريض" },
  "Give patients visibility into their own health metrics, fostering proactive health management and informed conversations with medical professionals.": { en: "Give patients visibility into their own health metrics, fostering proactive health management and informed conversations with medical professionals.", ar: "منح المرضى رؤية في مقاييس صحتهم الخاصة، وتعزيز إدارة الصحة الاستباقية والمحادثات المستنيرة مع المتخصصين الطبيين." },
  "Scalable Architecture": { en: "Scalable Architecture", ar: "بنية قابلة للتوسع" },
  "Build a robust, extensible platform that can integrate with various medical devices and scale to support hospitals, clinics, and home care simultaneously.": { en: "Build a robust, extensible platform that can integrate with various medical devices and scale to support hospitals, clinics, and home care simultaneously.", ar: "بناء منصة قوية وقابلة للتوسع يمكنها التكامل مع أجهزة طبية متنوعة والتوسع لدعم المستشفيات والعيادات والرعاية المنزلية في نفس الوقت." },
  "Powered By": { en: "Powered By", ar: "مدعوم من" },

  // Auth
  "Log In": { en: "Log In", ar: "تسجيل الدخول" },
  "Your Vitals, Always Connected": { en: "Your Vitals, Always Connected", ar: "علاماتك الحيوية، دائماً متصلة" },
  "HealthLink is an IoT-powered platform that continuously measures heart rate and blood oxygen using an Arduino sensor, streams readings in real time, and connects patients with doctors for proactive care.": { en: "HealthLink is an IoT-powered platform that continuously measures heart rate and blood oxygen using an Arduino sensor, streams readings in real time, and connects patients with doctors for proactive care.", ar: "HealthLink هي منصة مدعومة بإنترنت الأشياء تقيس معدل ضربات القلب وأكسجين الدم باستمرار باستخدام مستشعر Arduino، وتدفق القراءات في الوقت الفعلي، وربط المرضى بالأطباء للرعاية الاستباقية." },
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = (key: string) => translations[key]?.["en"] || key;

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
