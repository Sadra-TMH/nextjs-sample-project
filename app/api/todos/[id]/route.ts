import { NextResponse } from "next/server";

const DATA_SOURCE = "https://jsonplaceholder.typicode.com/todos";

const apiKey: string = process.env.API_KEY as string;

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  const res = await fetch(`${DATA_SOURCE}/${id}`);

  const todo: Todo = await res.json();

  if (!todo.id) return NextResponse.json({ message: "No Todo found" });

  return NextResponse.json(todo);
}
