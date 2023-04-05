import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await axios
    .put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}api/users/${req.body.userid}/follow`,
      {
        targetUserid: req.body.targetUserid,
      },
      {
        headers: {
          Authorization: `Bearer ${req.headers["authorization"]}`,
        },
      }
    )
    .then((response) => response.data);
  return res.status(200).json(result);
};

export default handler;
