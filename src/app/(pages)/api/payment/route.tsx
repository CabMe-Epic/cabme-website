// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  email: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Type-checked data extraction
    const { name, email }: Data = req.body;

    // Process the data (e.g., save to database)

    // Respond with JSON data
    res.status(200).json({ message: "Data received", data: { name, email } });
  } else {
    // Handle methods other than POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
