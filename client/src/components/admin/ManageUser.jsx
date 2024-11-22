import React, { useState, useEffect } from "react";
import {
  getListAllUser,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomStore from "../../stores/ecom-store";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { CheckCircle, XCircle, Edit, Trash2, Check, X } from "lucide-react";
import { dateFormat } from "../../utils/dateformat";
import { toast } from "react-toastify";

const ManageUser = () => {
  const token = useEcomStore((state) => state.token);
  // console.log(token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);

    //ค่า id, enable ต้องตรงกับ servers
    const value = {
      id: userId,
      enabled: !userStatus,
    };

    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);

        handleGetUsers(token);
        toast.success("updated status successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    console.log(userId, userRole);

    //ค่า id, enable ต้องตรงกับ servers
    const value = {
      id: userId,
      role: userRole,
    };

    changeUserRole(token, value)
      .then((res) => {
        console.log(res);

        handleGetUsers(token);
        toast.success("update role successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   console.log(users);

  return (
    <div className="container mx-auto p-4">
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell align="center" className="font-bold">
                ลำดับ
              </TableCell>
              <TableCell align="center" className="font-bold">
                อีเมล์
              </TableCell>
              <TableCell align="center" className="font-bold">
                บทบาท
              </TableCell>
              <TableCell align="center" className="font-bold">
                วันที่แก้ไข
              </TableCell>

              <TableCell align="center" className="font-bold">
                สถานะ
              </TableCell>
              <TableCell align="center" className="font-bold">
                จัดการ
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <div>{user.email}</div>
                </TableCell>

                <TableCell align="center">
                  <FormControl fullWidth>
                    <InputLabel>role</InputLabel>
                    <Select
                      onChange={(e) =>
                        handleChangeUserRole(user.id, e.target.value)
                      }
                      value={user.role}
                      label="role"
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell align="center">
                  {dateFormat(user.updatedAt)}
                </TableCell>

                <TableCell align="center">
                  <div className="flex justify-center space-x-2">
                    {user.enabled ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </div>
                </TableCell>

                <TableCell key={index} align="center">
                  <div className="flex justify-center space-x-2">
                    <Tooltip
                      title={user.enabled ? "Disable User" : "Enable User"}
                    >
                      <IconButton
                        color={user.enabled ? "secondary" : "primary"}
                        onClick={() =>
                          handleChangeUserStatus(user.id, user.enabled)
                        }
                      >
                        {user.enabled ? (
                          <X className="w-5 h-5 text-red-500" /> // ไอคอนสีแดงเมื่อ disable
                        ) : (
                          <Check className="w-5 h-5 text-green-500" /> // ไอคอนสีเขียวเมื่อ enable
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageUser;
