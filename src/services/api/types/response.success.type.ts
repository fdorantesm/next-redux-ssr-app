export type SuccessResponse<T> = {
  data: T;
  statusCode: number;
  type: string;
};
