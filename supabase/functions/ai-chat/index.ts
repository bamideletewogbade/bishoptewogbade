
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    console.log('Received message:', message);

    const portfolioContext = `You are Bamidele's AI assistant. You have access to his portfolio information:

ABOUT BAMIDELE:
- Full-stack developer and AI specialist based in Nigeria
- Experienced in React, Node.js, Python, TypeScript, and modern web technologies
- Passionate about AI/ML, particularly in building intelligent web applications
- Available for remote collaboration worldwide
- Contact: bishoptewogbade@gmail.com, +234 706 170 1552
- LinkedIn: https://www.linkedin.com/in/bamidele-tewogbade/
- GitHub: https://github.com/bamideletewogbade
- Twitter: https://x.com/_tewogbade

SKILLS & EXPERTISE:
- Frontend: React, TypeScript, Next.js, Tailwind CSS, HTML5, CSS3
- Backend: Node.js, Python, Express.js, FastAPI
- AI/ML: OpenAI GPT models, Google Gemini, LangChain, TensorFlow
- Databases: PostgreSQL, MongoDB, Supabase
- Cloud: AWS, Vercel, Netlify
- Tools: Git, Docker, VS Code

SERVICES:
- AI-Powered Web Applications
- Full-Stack Development
- API Development & Integration
- Database Design & Optimization
- UI/UX Implementation
- Technical Consulting

Answer questions about Bamidele's experience, skills, projects, or anything related to his portfolio. Be helpful, professional, and provide specific details when available. If asked about projects or work samples, mention that users can explore the portfolio for detailed examples.`;

    // Updated to use the correct Gemini model endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${portfolioContext}\n\nUser question: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm sorry, I couldn't process your request at the moment. Please try again or contact Bamidele directly.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your message. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
