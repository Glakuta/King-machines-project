import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
      machineName: formData.get('machineName'),
      consent: formData.get('consent'),
    };

    // Validation
    if (!data.name || !data.email || !data.message || !data.consent) {
      return new Response(JSON.stringify({ error: 'Wszystkie wymagane pola muszą zostać wypełnione' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      return new Response(JSON.stringify({ error: 'Nieprawidłowy adres e-mail' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Here you would integrate with your email service
    // Examples: SendGrid, Mailgun, Resend, Nodemailer, WordPress wp_mail, etc.
    
    // Example with WordPress REST API (if you have a contact form endpoint):
    /*
    const wpResponse = await fetch(`${import.meta.env.WP_URL}/wp-json/contact-form/v1/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    */

    // For now, log and simulate success
    console.log('Contact form submission:', data);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Wystąpił błąd podczas wysyłania wiadomości' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};