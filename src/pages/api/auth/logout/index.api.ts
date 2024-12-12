import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        "Set-Cookie",
        serialize("auth", "", {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 0,
            path: "/"
        })
    );

    res.status(200).json({ message: "Logged out successfully" });
}
