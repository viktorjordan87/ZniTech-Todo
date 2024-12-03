import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }

  statusCode: number;
}

export default UnauthorizedError;
