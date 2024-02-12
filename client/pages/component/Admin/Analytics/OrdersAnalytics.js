import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import Loader from "../../Loader";
import { useGetOrdersAnalyticsQuery } from "../../../../redux/analytics/analyticsApi";

export default function OrdersAnalytics({ isDashboard }) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.orders.last12Months.forEach((item) => {
      analyticsData.push({ name: item.name, Count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] mb-2 px-10" : "mt-[50px] px-10"}
          >
            <h1
              className={`text-[25px] text-black dark:text-white font-[500] font-Poppins py-2 px-5 text-start ${
                isDashboard && "!text-[20px]"
              } !text-start px-5`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className="bg-transparent block mb-3 text-sm font-medium text-gray-900 dark:text-white px-5">
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`w-[95%] mx-auto ${
              !isDashboard ? "h-[85%] bg-gray-100 dark:bg-gray-900" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "90%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#E2ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
