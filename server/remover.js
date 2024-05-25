import fetch from 'node-fetch';
import FormData from 'form-data';
import { readFileSync } from 'fs';
import 'dotenv/config';

async function removePerson(photo, mask) {
  const form = new FormData();
  form.append('image_file', photo, 'photo.jpg'); // Add a filename
  form.append('mask_file', mask, 'mask.png'); // Add a filename

  try {
    const response = await fetch('https://clipdrop-api.co/cleanup/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error('Error during API call:', error);
  }
}

export default removePerson;

