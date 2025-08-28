import StatsCards from "@/components/charts/StatsCards";
import SalesOverviewChart from "@/components/charts/SalesOverviewChart";
import SalesOverviewMap from "@/components/charts/SalesOverviewMap";
import AIForecastInputsChart from "@/components/charts/AIForecastInputs";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <StatsCards />

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-2"
        style={{ alignItems: "start" }}
      >
        <div style={{ minWidth: 0 }}>
          <SalesOverviewChart style={{ height: 300, width: "100%" }} />
        </div>
        <div style={{ minWidth: 0 }}>
          {/* <SalesOverviewMap style={{ height: 280, width: "100%" }} /> */}
          <AIForecastInputsChart style={{ height: 240, width: "100%" }} />
        </div>
      </div>

      <div className="mt-8" style={{ maxWidth: 600 }}>
        {/* <AIForecastInputsChart style={{ height: 240, width: "100%" }} /> */}
        <SalesOverviewMap style={{ height: 280, width: "100%" }} />
      </div>
    </main>
  );
}
