"use client";

import StatusHandler from "@/components/statusHandler/StatusHandler";
import { UserInfo } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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
  Chip,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const UsersPage = () => {
  const { data, status, refetch } = useQuery<UserInfo[], Error, UserInfo[]>({
    queryKey: ["users"],
  });

  function onApprove(id: number) {}
  function onEdit(id: number) {}

  return (
    <div className="flex-1 overflow-auto h-full flex flex-col">
      <StatusHandler status={status} refetch={refetch}>
        <Container maxWidth="xl" className="flex-1 overflow-auto">
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شماره</TableCell>
                  <TableCell align="center">نام</TableCell>
                  <TableCell align="center">موبایل</TableCell>
                  <TableCell align="center">شهر</TableCell>
                  <TableCell align="center">وضعیت</TableCell>
                  <TableCell align="center">تاریخ ثبت نام</TableCell>
                  <TableCell align="center">عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((user, index) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{(index + 1).toLocaleString("fa")}</TableCell>
                    <TableCell align="center">
                      {user.profile.first_name} {user.profile.last_name}
                    </TableCell>
                    <TableCell align="center">{user.mobile}</TableCell>
                    <TableCell align="center">{user.profile.city}</TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title={user.approved ? "تایید شده" : "منتظر تایید"}
                      >
                        {user.approved ? (
                          <Chip
                            label="تایید شده"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            label="منتظر تایید"
                            color="warning"
                            size="small"
                          />
                        )}
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {new Date(user.created_at).toLocaleString("fa")}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={user.approved ? "عدم تایید" : "تایید"}>
                        <IconButton
                          color={user.approved ? "error" : "success"}
                          onClick={() => onApprove(user.id)}
                        >
                          {user.approved ? (
                            <PersonRemoveIcon />
                          ) : (
                            <PersonAddIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="ویرایش">
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(user.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </StatusHandler>
    </div>
  );
};

export default UsersPage;
