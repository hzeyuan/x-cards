import type { NextApiRequest } from "next";
import { NextResponse, type NextRequest } from "next/server";




export const GET = async (req: NextApiRequest) => {
    // const url = req.searchParams.get('url');
    const url = req.url;
    const regex = /[?&]url=([^&#]*)/;
    const match = url.match(regex);
    const extractedUrl = match ? decodeURIComponent(match[1]) : null;
    const res = await fetch(`https://cmt.itsvg.in/api?url=${extractedUrl}`, {
        method: 'GET',

    })
    const data = await res.json();
    console.log('res', data);
    return NextResponse.json({
        status: 200,
        data,
    });
}