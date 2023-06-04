import { Investment } from "src/types/investment.type";
import { SuccessResponse } from "../../types/response.success.type";

export type GetMyInvestmentsSuccessResponse = SuccessResponse<Investment[]>;
