import { Request, Response } from "express";
import StatusCode from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const create = async (
  request: Request<{}, {}, ICidade>,
  response: Response
) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    await bodyValidation.validate(request.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;
    return response.status(StatusCode.BAD_REQUEST).json({
      errors: {
        default: yupError.message,
      },
    });
  }

  console.log(validatedData);
  return response.send("Create!");
};
