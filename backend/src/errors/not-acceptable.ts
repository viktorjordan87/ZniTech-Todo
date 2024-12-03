import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class NotAcceptable extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_ACCEPTABLE;
  }
  statusCode: number;
}

export default NotAcceptable;
