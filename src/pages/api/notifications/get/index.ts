import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await axios
    .get(
      `${process.env.BACKEND_ENDPOINT}/api/notifications/${req.body.userid}`,
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
