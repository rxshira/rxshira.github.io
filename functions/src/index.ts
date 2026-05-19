import {onCall, HttpsError} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions";
import * as admin from "firebase-admin";
import { Resend } from 'resend';

admin.initializeApp();

setGlobalOptions({ 
  maxInstances: 10,
  region: "us-central1"
});

/**
 * Callable function to send emails securely from the backend.
 * Explicitly requests access to the RESEND_API_KEY secret.
 */
export const sendEmailNotification = onCall({ 
  secrets: ["RESEND_API_KEY"],
  maxInstances: 10 
}, async (request) => {
  // Security: Ensure the user is authenticated
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authenticated access required.');
  }

  const { to, subject, html } = request.data;

  // Retrieve the secret from the environment
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new HttpsError('failed-precondition', 'Internal server error: Email service not configured.');
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: 'IBM Carpool <onboarding@resend.dev>',
      to: to || 'shiraxrubin@gmail.com',
      subject: subject || 'Carpool Portal Update',
      html: html || '<p>A new update is available in your intern dashboard.</p>'
    });

    return { success: true, id: result.data?.id };
  } catch (error: any) {
    console.error("Email Error:", error);
    throw new HttpsError('internal', error.message);
  }
});
