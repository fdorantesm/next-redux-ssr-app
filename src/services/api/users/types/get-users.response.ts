import { User } from "src/types/user.type";
import { SuccessResponse } from "../../types/response.success.type";

export type GetUsersResponse = SuccessResponse<User[]>;
