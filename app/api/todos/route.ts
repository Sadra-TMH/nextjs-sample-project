import { NextResponse } from "next/server";

const DATA_SOURCE = "https://jsonplaceholder.typicode.com/todos";

const apiKey: string = process.env.API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE);
  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: "Todo id is required." });

  await fetch(`${DATA_SOURCE}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
    },
  });
  return NextResponse.json({ message: `Todo ${id} deleted.` });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();

  if (!userId || !title)
    return NextResponse.json({
      message: "Todo userId and title are required.",
    });

  const res = await fetch(DATA_SOURCE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo: Todo = await res.json();
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { id, userId, title, completed }: Todo = await request.json();

  if (!userId || !title || !id || typeof completed !== "boolean")
    return NextResponse.json({
      message: "Todo paramteres are required.",
    });

  const res = await fetch(`${DATA_SOURCE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": apiKey,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo: Todo = await res.json();
  return NextResponse.json(updatedTodo);
}
