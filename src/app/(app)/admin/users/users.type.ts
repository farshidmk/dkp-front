export type UserFilterItems = {
  name: string;
  mobile: string;
  isApproved: UserIsApproved;
};

export enum UserIsApproved {
  Approved = "approved",
  NotApproved = "notApproved",
  All = "all",
}
