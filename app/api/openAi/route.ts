import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    const body = await req.json();
    const myInterviewer = await openai.beta.assistants.create(body);
    return NextResponse.json(myInterviewer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const { interviewerId } = await req.json();

    if (!interviewerId) {
      return NextResponse.json(
        { error: 'Interviewer not available.' },
        { status: 400 }
      );
    }

    const deleteInterviewer = await openai.beta.assistants.del(interviewerId);

    return NextResponse.json(deleteInterviewer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT method - Update Interviewer
export async function PUT(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });

    const body = await req.json();
    const { interviewerId, instructions } = body;
    if (!interviewerId || !instructions) {
      return NextResponse.json(
        { error: 'Assistant ID and instructions are required.' },
        { status: 400 }
      );
    }

    const updatedInterviewer = await openai.beta.assistants.update(interviewerId, {
      instructions
    });
    return NextResponse.json(updatedInterviewer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
