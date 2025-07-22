import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath('/messages'); // Revalidate the messages page to show the new message
    // revalidatePath('/some_other page','page'); // default that it will revalidate the current page
    // But 
    // revalidatePath("/message",'layout') // it will revalidate the layout of the messages page(all the /message and its children)
    //=========================================
    // revalidateTag('msg'); // Revalidate the msg tag to update any cached data, it will find all the pages that are using this tag
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
