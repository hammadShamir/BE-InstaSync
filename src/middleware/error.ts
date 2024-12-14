import { NextFunction, Request, Response } from "express";
import { IMetaData } from "../utils/interfaces/response";
import { Boom } from "@hapi/boom";
import Joi from "joi";

const isProduction = false;

const handler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let metaData: IMetaData;
  if (err.isJoi) {
    metaData = handleJoiError(err);
  } else if (err.isBoom) {
    metaData = handleBoomError(err);
  } else {
    metaData = handleDefaultError(err);
  }

  if (err.data) {
    metaData.message += err.data;
  }

  if (!isProduction) {
    metaData.stack = err.stack || null;
  }

  res.status(+metaData.status).json(metaData);
};

const handleBoomError = (err: Boom): IMetaData => {
  return {
    status: +err.output.statusCode,
    message: err.message,
  };
};

const handleJoiError = (err: Joi.ValidationError): IMetaData => {
  return {
    status: 400,
    message: err.details[0].message, // Removed i18n for simplicity
  };
};

const handleDefaultError = (err: any): IMetaData => {
  return {
    status: 500,
    message: err.message || "Internal Server Error",
  };
};

export default handler;
