import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/auth/register`, req.body)
    .then((response) => response.data);
  return res.status(200).json(result);
};

export default handler;
