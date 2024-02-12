import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useGetAllOrdersQuery } from "../../../redux/orders/ordersApi";
import { useGetUsersQuery } from "../../../redux/user/userApi";
import { useGetCoursesQuery } from "../../../redux/courses/coursesApi";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import Loader from "../../component/Loader";
import { Box } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

export default function AllInvoices({ isDashboard }) {
  const { theme, setTheme } = useTheme();
  const { data, isLoading } = useGetAllOrdersQuery();
  const { data: userData, isLoading: userDataLoading } = useGetUsersQuery();
  const { data: courseData, isLoading: courseDataLoading } =
    useGetCoursesQuery();

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (data) {
      const temp = data.map((item) => {
        const user = userData?.find((user) => user._id === item.userId);

        const course = courseData?.course.find(
          (course) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows = [];

  orderData &&
    orderData.forEach((item) => {
      rows.push({
        id: item._id,
        userEmail: item.userEmail,
        username: item.username,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <>
      {isLoading && courseDataLoading && userDataLoading ? (
        <Loader />
      ) : (
        <div className={!isDashboard ? "mt-14" : "mt-[0px]"}>
          <Box m={isDashboard ? "0" : "40px"}>
            <Box
              m={isDashboard ? "0" : "40px 0 0 0"}
              height={isDashboard ? "33vh" : "90vh"}
              overflow={"hidden"}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30 !important"
                      : "1px solid #ccc !important",
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none !important",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#AAA5fc",
                  borderBottom: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#111C43" : "#AAA5fc",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: "none",
                  backgroundColor: theme === "dark" ? "#111C43" : "#AAA5fc",
                },
                "& .MuiCheckBox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid
                checkboxSelection={isDashboard ? false : true}
                rows={rows}
                columns={columns}
                components={isDashboard ? {} : { Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}
