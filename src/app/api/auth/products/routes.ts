import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const categorySlug = searchParams.get("category");

    


  } catch (error){
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}