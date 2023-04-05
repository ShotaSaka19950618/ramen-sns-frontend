import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const config = {
  api: { bodyParser: false },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/upload/`, req, {
      headers: {
        "Content-Type": req.headers["content-type"],
        Authorization: `Bearer ${req.headers["authorization"]}`,
      },
    })
    .then((response) => response.data);
  return res.status(200).json(result);
};

export default handler;
