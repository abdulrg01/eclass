import { PiUsersFourLight } from "react-icons/pi";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import AllInvoices from "../../../admin/order/AllInvoices";
import { useEffect, useState } from "react";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "../../../../redux/analytics/analyticsApi";
import Loader from "../../Loader";

export function CircularProgressWithLabel({ open, value }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
}

export default function DashboardWidgets({ open }) {
  const [ordersComparedPercentage, setOrdersComparedPercentage] = useState();
  const [usersComparedPercentage, setUsersComparedPercentage] = useState();
  const { data, isLoading } = useGetUsersAnalyticsQuery();
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery();

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;

          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          setUsersComparedPercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparedPercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <>
      {isLoading && ordersLoading ? (
        <Loader />
      ) : (
        <div className="mt-[10px] min-h-screen">
          <div className="grid grid-cols-[75%,25%] sm:grid-cols-1 sm:grid sm:p-3">
            <div className="p-3">
              <UsersAnalytics isDashboard={true} />
            </div>

            <div className="pt-[80px] pr-5">
              <div className="w-full bg-gray-100 dark:bg-[#111C43] rounded-sm shadow">
                <div className="flex items-center p-3 justify-between flex-wrap">
                  <div>
                    <BiBorderLeft className="dark:text-[#45CBAB] text-[#000] text-[20px]" />
                    <h5 className="pt-2 font-Poppins dark:text-[#fff] text-[20px] font-[400]">
                      {ordersComparedPercentage?.currentMonth}
                    </h5>
                    <h5 className="pt-2 font-Poppins dark:text-[#45CBAB] text-[20px] font-[400]">
                      Sales Obtained
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={
                        ordersComparedPercentage?.percentChange > 0 ? 100 : 0
                      }
                      open={open}
                    />
                    <h5 className="text-center pt-4">
                      {ordersComparedPercentage?.percentChange > 0
                        ? "+" +
                          ordersComparedPercentage?.percentChange.toFixed(2)
                        : "-" +
                          ordersComparedPercentage?.percentChange.toFixed(
                            2
                          )}{" "}
                      %
                    </h5>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-100  dark:bg-[#111C43] rounded-sm shadow my-8">
                <div className="flex items-center p-3 justify-between flex-wrap">
                  <div>
                    <PiUsersFourLight className="dark:text-[#45CBAB] text-[#000] text-[20px]" />
                    <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                      {usersComparedPercentage?.currentMonth}
                    </h5>
                    <h5 className="pt-2 font-Poppins dark:text-[#45CBAB] text-black text-[20px] font-[400]">
                      New Users
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      value={
                        usersComparedPercentage?.percentChange > 0 ? 100 : 0
                      }
                      open={open}
                    />
                    <h5 className="text-center pt-4">
                      {usersComparedPercentage?.percentChange > 0
                        ? "+" +
                          usersComparedPercentage?.percentChange.toFixed(2)
                        : "-" +
                          usersComparedPercentage?.percentChange.toFixed(
                            2
                          )}{" "}
                      %
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[65%,35%] mt-[-20px] ml-8">
            <div className="dark:bg-[#111c43] bg-gray-100 w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
              <OrdersAnalytics isDashboard={true} />
            </div>
            <div className="p-5">
              <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
                Recent Transaction
              </h5>
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
