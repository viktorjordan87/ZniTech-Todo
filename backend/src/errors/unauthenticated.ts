import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
  statusCode: number;
}

export default UnAuthenticatedError;
