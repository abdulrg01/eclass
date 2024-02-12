import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader";
import { useGetCoursesAnalyticsQuery } from "../../../../redux/analytics/analyticsApi";

export default function CourseAnalytics() {
  const { data, isLoading } = useGetCoursesAnalyticsQuery();

  const analyticsData = [];

  data &&
    data.courses.last12Months.forEach((item) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen w-[95%] m-auto p-3">
          <div className="mt-[50px]">
            <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins py-2 px-5 text-start">
              Courses Analytics
            </h1>
            <p className="bg-transparent block mb-3 text-sm font-medium text-gray-900 dark:text-white px-5">
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className=" w-full h-[77%] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
