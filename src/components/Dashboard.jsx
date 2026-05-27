import { useEffect, useState } from "react";

import API from "../api";

import KPICards from "./KPICards";
import Charts from "./Charts";
import RecentCallsTable from "./RecentCallsTable";

import { calculateAnalytics } from "../lib/analytics";

import mockCalls from "../data/cdrMock.json";

export default function Dashboard() {

  const [calls, setCalls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalCalls, setTotalCalls] =
    useState(0);

  useEffect(() => {

    fetchAnalytics();

    setCalls(mockCalls);

    setLoading(false);

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await API.get(
        "/analytics/total-calls"
      );

      setTotalCalls(
        res.data.totalCalls
      );

    } catch (err) {

      console.log(err);
    }
  };

  if (loading) {

    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  const stats = calculateAnalytics(calls);

  return (

    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Call Analytics Dashboard
        </h1>

        <h2 className="text-xl mt-2">
          Total Calls: {totalCalls}
        </h2>

        <p className="text-muted-foreground">
          Telecom CDR Insights
        </p>

      </div>

      <KPICards stats={stats} />

      <Charts stats={stats} />

      <section>

        <h2 className="text-2xl font-bold mb-4">
          Recent Call Logs
        </h2>

        <RecentCallsTable calls={calls} />

      </section>

    </div>
  );
}