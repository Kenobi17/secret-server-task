import { Request, Response, Handler } from 'express';
import { writeSecretToDB, findSecret, ISecret } from '../utils/secret.utils';

export const createSecret: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const secret: string = req.body.secret;
    const expireAfter: number = Number(req.body.expireAfter) || 0;

    const savedSecret: ISecret = await writeSecretToDB(secret, expireAfter);

    return res.status(200).json(savedSecret);
  } catch (error: any) {
    console.error(error.message);

    return res.status(500).json('Internal server error');
  }
};

export const getSecret: Handler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const hash = req.params.hash as string;

    const secret: ISecret = await findSecret(hash);

    return res.status(200).json(secret);
  } catch (error: any) {
    console.error(error.message);

    switch (error.message) {
      case 'Secret not found':
        return res.status(404).json('Secret not found');
      case 'Secret expired':
        return res.status(410).json('Secret expired');
      default:
        return res.status(500).json('Internal server error');
    }
  }
};
