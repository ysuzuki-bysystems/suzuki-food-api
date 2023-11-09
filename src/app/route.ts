import { NextResponse } from "next/server";

//export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    foods: [
      {
        name: "てんぷらうどん",
        is_main_dish: true,
      },
      {
        name: "だしまき卵",
        is_main_dish: false,
      },
      {
        name: "𩸽",
        is_main_dish: false,
      },
      {
        name: "グリーンピースごはん",
        is_main_dish: null,
      },
      {
        name: "ライスサラダ",
        is_main_dish: false,
      },
    ],
  });
}
