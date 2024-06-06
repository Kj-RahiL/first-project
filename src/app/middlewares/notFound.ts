/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (
  err: any,
  req: Request,
  res: Response,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found !!',
    error: '',
  });
};

export default notFound;
