import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export function LangToggle() {
  const { lang, setLang } = useI18n();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
    </Button>
  );
}
