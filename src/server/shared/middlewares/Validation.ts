import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetSchema = <T>(schema: Schema<any>) => Schema<any>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (request, response, next) => {
    const schemas = getAllSchemas(schema => schema)

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(request[key as TProperty], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (error.path === undefined) return;
          errors[error.path] = error.message;
        });

        errorsResult[key as TProperty] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return response.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };
