import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server'
import {headers} from "next/headers";
import {db} from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: .env 또는 .env.local 파일에 CLERK_SIGNING_SECRET 키를 추가 하세요.');
  }

  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('SVIX-ID');
  const svix_timestamp = headerPayload.get('SVIX-Timestamp');
  const svix_signature = headerPayload.get('SVIX-Signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: headers에 Sivx를 확인 하세요.', {
      status: 400,
    });
  };

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'SVIX-ID': svix_id,
      'SVIX-Timestamp': svix_timestamp,
      'SVIX-Signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error:', err);
    return new Response('Error:', {
      status: 400
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { data } = evt

    await  db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url
    });
  }

  if (eventType === 'user.deleted') {
    const { data } = evt;

    if (!data.id) {
      return new Response('Error: 사용자 정보가 존재하지 않습니다.', { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === 'user.updated') {
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  // 성공적인 응답은 가장 마지막에 return 해야 함
  return new Response('Webhook received', { status: 200 });
}