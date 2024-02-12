import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import Loader from "../../Loader";
import { useGetUsersAnalyticsQuery } from "../../../../redux/analytics/analyticsApi";

export default function UsersAnalytics({ isDashboard }) {
  const { data, isLoading } = useGetUsersAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.users.last12Months.forEach((item) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px] w-[95%] mx-auto"
              : "mt-[50px] shadow-sm ml-8 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : "mb-10 px-8"}`}>
            <h1
              className={`text-[25px] text-black dark:text-white font-[500] font-Poppins py-2 px-5 text-start ${
                isDashboard && "!text-[20px]"
              } !text-start`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className="bg-transparent block mb-2 text-sm font-medium text-gray-900 dark:text-white px-5">
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[40vh]" : "h-[75vh]"
            } flex items-center justify-center bg-gray-100 dark:bg-[#111C43]`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d52d9"
                  fill="#4d52d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
