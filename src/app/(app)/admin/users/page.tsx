"use client";

import StatusHandler from "@/components/statusHandler/StatusHandler";
import { User, UserInfo } from "@/types/user";
import EditIcon from "@mui/icons-material/Edit";
import {
  Chip,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ApproveButton from "./_components/ApproveButton";
import { useState } from "react";
import EditUserProfile from "./_components/EditUserProfile";
import ViewUserProfileButton from "./_components/ViewUserProfileButton";

const UsersPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<User["id"] | undefined>(
    undefined
  );
  const { data, status, refetch } = useQuery<UserInfo[], Error, UserInfo[]>({
    queryKey: ["users"],
  });

  return (
    <>
      <EditUserProfile
        handleClose={() => setSelectedUserId(undefined)}
        userId={selectedUserId}
      />
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
                        <ApproveButton
                          isApproved={user.approved}
                          userId={user.id}
                        />
                        <ViewUserProfileButton user={user.profile} />
                        <Tooltip title="ویرایش">
                          <IconButton
                            color="primary"
                            onClick={() => setSelectedUserId(user.id)}
                            disabled
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
    </>
  );
};

export default UsersPage;
