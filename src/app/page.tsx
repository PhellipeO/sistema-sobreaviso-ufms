import Calculadora from "@/components/Calculadora";
import Feriados from "@/components/Feriados";

export default function Home() {
  return (
    <div className="space-y-6">
      <Calculadora />
      <Feriados />
    </div>
  );
}
