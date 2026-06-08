import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Campaign Brief Generator
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { brandName, city, category, goal } = req.body;
    const model = "gemini-3-flash-preview";
    
    const prompt = `Brand: ${brandName}
City: ${city}
Category: ${category}
Goal: ${goal}

Write a hyper-local influencer campaign brief using SCRAG intelligence.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are SCRAG's AI campaign strategist. You specialize in hyper-local influencer marketing for Indian regional brands. Respond ONLY in this JSON format with no markdown, no preamble:\n{\n  \"brief_title\": \"string\",\n  \"target_audience\": \"string\",\n  \"campaign_hook\": \"string\",\n  \"content_pillars\": [\"string\", \"string\", \"string\"],\n  \"content_formats\": [\"string\", \"string\"],\n  \"creator_profile\": \"string\",\n  \"best_posting_times\": [\"string\", \"string\"],\n  \"campaign_duration\": \"string\",\n  \"estimated_budget_range\": \"string\",\n  \"top_hashtags\": [\"string\",\"string\",\"string\",\"string\",\"string\"],\n  \"success_metrics\": [\"string\",\"string\",\"string\"],\n  \"pro_tip\": \"string\"\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Brief API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Campaign Outcome Predictor
app.post("/api/predict-outcome", async (req, res) => {
  try {
    const { score, budget, platform, contentType, nicheMatch, tier } = req.body;
    const model = "gemini-3-flash-preview";

    const prompt = `SCRAG Score: ${score}
Budget: ₹${budget}
Platform: ${platform}
Content type: ${contentType}
Niche match: ${nicheMatch}/20
City tier: ${tier}

Predict this influencer campaign's outcome with reasoning.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are a campaign performance predictor for the SCRAG platform. Respond ONLY in JSON, no markdown, no explanation:\n{\n  \"success_probability\": number (0-100),\n  \"confidence_level\": \"High\" | \"Medium\" | \"Low\",\n  \"predicted_reach\": \"string (e.g. 45,000 – 62,000)\",\n  \"predicted_engagement_rate\": \"string (e.g. 6.2% – 8.4%)\",\n  \"predicted_conversions\": \"string\",\n  \"roi_estimate\": \"string (e.g. 3.2x – 4.8x)\",\n  \"risk_factors\": [\"string\", \"string\"],\n  \"success_factors\": [\"string\", \"string\"],\n  \"verdict\": \"string (2 sentences max)\",\n  \"recommendation\": \"string\"\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Predict API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const model = "gemini-3-flash-preview";

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: `You are SCRAG Assistant — an expert in regional creator search and hyper-local campaign optimization for Indian brands. You have access to structured insights across 8 regional hub cities: Coimbatore, Chennai, Bangalore, Mumbai, Delhi, Hyderabad, Kochi, and Pune.

Niches available: Travel, Food, Tech, Fashion, Fitness, Comedy, Education, Beauty, Finance, Auto.
SCRAG scores range from 0–100. Scores above 70 are considered strong campaign fits.

CRITICAL FORMATTING INSTRUCTIONS:
1. NEVER output massive block paragraphs.
2. ALWAYS split your answers into structured, clear, and easy-to-read lists (either bullet points starting with '-' or numbered steps starting with '1.').
3. For creator recommendations, present profiles one-by-one with clear metrics on separate bulleted lines. Use double asterisks for bold highlights (e.g. **Niche Match:** Travel, **SCRAG Score:** 84, **Region:** Kochi).
4. Explain calculation metrics, cities, or campaigns in orderly items.
5. End every single output with a proactive, clean follow-up suggsetion or question.`,
      },
    });

    // Simple message relay for history
    let lastResponse = "";
    for (const msg of messages.slice(-1)) {
        const result = await chat.sendMessage({ message: msg.content });
        lastResponse = result.text || "";
    }

    res.json({ text: lastResponse });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Campaign Timeline Builder
app.post("/api/generate-timeline", async (req, res) => {
  try {
    const { brand, city, niche, goal, duration } = req.body;
    const model = "gemini-3-flash-preview";

    const prompt = `Brand: ${brand}, City: ${city}, Niche: ${niche}, Goal: ${goal}, Duration: ${duration}

Build a day-by-day influencer campaign timeline.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are a campaign timeline strategist for SCRAG. Respond ONLY in JSON:\n{\n  \"timeline\": [\n    {\n      \"day\": \"Day 1-2\",\n      \"phase\": \"string\",\n      \"action\": \"string\",\n      \"content_type\": \"string\",\n      \"platform\": \"string\",\n      \"goal\": \"string\"\n    }\n  ],\n  \"peak_day\": \"string\",\n  \"warm_up_tip\": \"string\",\n  \"scale_tip\": \"string\"\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Timeline API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Campaign Simulator API
app.post("/api/simulate-campaign", async (req, res) => {
  try {
    const { brandName, campaignTitle, goal, audience, region, startDate, endDate, budget, platforms, influencers } = req.body;
    const model = "gemini-3.5-flash";

    const prompt = `Brand/Company Name: ${brandName}
Campaign Title: ${campaignTitle || "Untitled Campaign"}
Campaign Goal: ${goal}
Target Audience: ${audience}
Region/City: ${region}
Start Date: ${startDate}
End Date: ${endDate}
Budget: ₹${budget || "N/A"}
Preferred Platforms: ${platforms ? platforms.join(", ") : "N/A"}
Influencer Handles: ${influencers ? influencers.join(", ") : "None specified"}

Using this campaign profile, perform a Campaign Simulation using SCRAG (Social Activity, Contextual Relevance, Regional Influence, Audience Trust, Growth Momentum) intelligence.
Analyze the campaign potential, reach, engagement, and provide actionable localized recommendations.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are AuraSearch's Campaign Simulation Engine. Analyze the campaign profile and predict the campaign potential, reach, engagement, and actionable strategic insights. Return ONLY JSON, no markdown formatting (no backticks, no comments). JSON Format:\n{\n  \"campaignScore\": number (0-100),\n  \"estimatedReach\": \"string (e.g. 50k - 75k users)\",\n  \"engagementRange\": \"string (e.g. 4.8% - 6.2%)\",\n  \"insights\": [\n    \"string (strategic actionable recommendation 1)\",\n    \"string (strategic actionable recommendation 2)\",\n    \"string (strategic actionable recommendation 3)\"\n  ],\n  \"scragBreakdown\": {\n    \"socialActivity\": number (0-100),\n    \"contextualRelevance\": number (0-100),\n    \"regionalInfluence\": number (0-100),\n    \"audienceTrust\": number (0-100),\n    \"growthMomentum\": number (0-100)\n  }\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Simulation API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// AI Timeline Builder API (v2 / Influencer specific)
app.post("/api/generate-influencer-timeline", async (req, res) => {
  try {
    const { handle, context, durationWeeks } = req.body;
    const model = "gemini-3.5-flash";

    const prompt = `Influencer Handle: ${handle}
Campaign Context: ${context || "General Brand Promotion"}
Duration: ${durationWeeks} weeks

Create a week-by-week influencer-specific content calendar and analyze historical post metrics. Keep the timeline exciting and tactical. Provide 1 task/event per week, with details like event description, recommended platform (Instagram/YouTube), and predicted reach boost percentage. Also provide estimated historical posts analysis and topic insights.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are the AuraSearch AI Timeline and Influencer Analyst. For the specified influencer handle, contextual brief, and week duration, generate a structural planning roadmap and mock up realistic public-data analytics in JSON format with no markdown, no explanation. JSON Format:\n{\n  \"timelineEvents\": [\n    {\n      \"week\": number,\n      \"event\": \"string (e.g., Unboxing Teaser Reel)\",\n      \"platform\": \"Instagram\" | \"YouTube\" | \"Other\",\n      \"description\": \"string (e.g., Post a high-energy transition Reel demonstrating the item...)\",\n      \"expectedBoost\": \"string (e.g., +12%)\"\n    }\n  ],\n  \"historicalStats\": {\n    \"avgEngagement\": number (e.g., 5.8),\n    \"topPostEngagement\": number (e.g., 9.4),\n    \"topPostDate\": \"string (YYYY-MM-DD)\",\n    \"postingFrequency\": \"string (e.g., 3.4 posts/week)\",\n    \"topPlatform\": \"string (e.g., Instagram Reel)\",\n    \"peakDays\": \"string (e.g., Wednesday & Saturday)\"\n  }\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Influencer Timeline API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Analyze Trend endpoint
app.post("/api/analyze-trend", async (req, res) => {
  try {
    const { city, niche, range = "30days" } = req.body;
    const model = "gemini-3.5-flash";

    let rangeContext = "";
    if (range === "7days") {
      rangeContext = "Focus specifically on the short-term 7-day growth pattern, detecting rapid micro-trends, rising search triggers, high-agility creative hooks, and sudden regional viral spikes.";
    } else if (range === "30days") {
      rangeContext = "Focus on the mid-term 30-day growth pattern, highlighting steady monthly momentum, sustaining target-niche interests, and campaign saturation levels.";
    } else if (range === "quarterly") {
      rangeContext = "Focus on the long-term quarterly (90-day) growth pattern, capturing macro regional shifts, seasonal campaign cycles, structural consumer search patterns, and sustained regional ROI projections.";
    }

    const prompt = `City: ${city}
Niche: ${niche}
Growth Period Scope: ${range} - ${rangeContext}

Perform a deep analysis of current regional growth patterns, hyper-local marketing search trends, regional creator saturation, and local consumer sentiments for this niche in this specific Indian city for the specified timeframe. Reflect realistic regional dynamics (e.g., Coimbatore has high food/tech interest, Bangalore has extremely high tech/finance startup culture, Chennai has specific fashion/travel dynamics). Provide a realistic multiplier between 0.8 and 1.6 that our metrics engine should apply to campaign returns (ROI).`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are the SCRAG AI Regional Trend Forecaster. You analyze database matrices and real-time regional audience focus over selected timescales. Respond strictly in valid JSON format with no markdown wrappers or backticks. Format:\n{\n  \"trendMultiplier\": number (0.8 to 1.6 representing regional multiplier),\n  \"growthStatus\": \"Accelerating\" | \"Supercharged\" | \"Stable\" | \"Saturated\",\n  \"recommendedPlatform\": \"string\",\n  \"trendInsight\": \"string (1-2 sentences of professional local growth insight tailored specifically to the requested growth pattern period, showcasing understanding of search trends or local preferences over that timeframe)\"\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Analyze Trend API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Benchmark Analysis API
app.post("/api/benchmark-analysis", async (req, res) => {
  try {
    const { creatorA, creatorB } = req.body;
    const model = "gemini-3.5-flash";

    const prompt = `Compare these two Indian creators:
Creator A:
- Name: ${creatorA.name}
- City: ${creatorA.city}
- Niche: ${creatorA.niche}
- Followers: ${creatorA.followers}
- Engagement Rate: ${creatorA.engagementRate}%
- Avg Likes: ${creatorA.avgLikes}
- Avg Comments: ${creatorA.avgComments}
- SCRAG Total Score: ${creatorA.scragTotal}
- Social Activity: ${creatorA.scragS}
- Contextual Relevance: ${creatorA.scragC}
- Regional Influence: ${creatorA.scragR}
- Audience Trust: ${creatorA.scragA}
- Growth Momentum: ${creatorA.scragG}

Creator B:
- Name: ${creatorB.name}
- City: ${creatorB.city}
- Niche: ${creatorB.niche}
- Followers: ${creatorB.followers}
- Engagement Rate: ${creatorB.engagementRate}%
- Avg Likes: ${creatorB.avgLikes}
- Avg Comments: ${creatorB.avgComments}
- SCRAG Total Score: ${creatorB.scragTotal}
- Social Activity: ${creatorB.scragS}
- Contextual Relevance: ${creatorB.scragC}
- Regional Influence: ${creatorB.scragR}
- Audience Trust: ${creatorB.scragA}
- Growth Momentum: ${creatorB.scragG}

Based on these statistics, generate a high-quality, professional, comparative benchmark analysis. Match the style of premium enterprise platforms like CreatorIQ and Sprout Social. Provide their relative competitive positions, strengths, weaknesses, and a recommendation summary of which campaigner goals they align with best. Keep sentences punchy, insightful, and strategic.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are the AuraSearch Enterprise Benchmark Analyst. Analyze the comparison metrics of two digital creators and output a strict JSON structure containing the benchmark report. Do not return markdown, backticks, or comments. JSON Format:\n{\n  \"creatorAStrengths\": \"string (2 sentence explanation of A's primary competitive edge)\",\n  \"creatorBStrengths\": \"string (2 sentence explanation of B's primary competitive edge)\",\n  \"suitabilityAnalysis\": \"string (2 sentence analysis explaining which campaigns we recommend Creator A vs Creator B for)\",\n  \"marketPositionA\": \"string (e.g., High-Engagement Niche Specialist)\",\n  \"marketPositionB\": \"string (e.g., Regional Reach Pioneer)\",\n  \"categoryLeadershipA\": number (0-100),\n  \"categoryLeadershipB\": number (0-100)\n}",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Benchmark API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// SCRAG Calculator Intelligence API
app.post("/api/scrag-calculator-analysis", async (req, res) => {
  try {
    const { creator } = req.body;
    const model = "gemini-3.5-flash";

    const prompt = `Analyze this digital creator using our SCRAG Framework:
Name: ${creator.name}
City: ${creator.city}
State: ${creator.state}
Niche: ${creator.niche}
Followers: ${creator.followers}
Platform: ${creator.platform}
Engagement Rate: ${creator.engagementRate}%

SCRAG Metrics (out of 20):
- Social Activity (S): ${creator.scragS}
- Contextual Relevance (C): ${creator.scragC}
- Regional Influence (R): ${creator.scragR}
- Audience Trust (A): ${creator.scragA}
- Growth Momentum (G): ${creator.scragG}
Total SCRAG Score: ${creator.scragTotal} / 100

Generate a highly professional, agency-ready SCRAG audit report in strict JSON format. Each property must contain a tailored, informative text snippet. No backticks, comments, or markdown. Output JSON matches:
{
  "strengths": "Provide 1-2 powerful bullet points explaining their main core advantages under the SCRAG framework.",
  "weaknesses": "Provide 1 highlight of optimization areas or minor risks based on their lowest score parameter.",
  "audienceQuality": "Brief assessment of audience trust, community attachment, and local demographic loyalty.",
  "campaignSuitability": "Explanation of how they align with business objectives, conversion ratios, and local activations.",
  "recommendedCampaignType": "A precise, fancy campaign title (e.g. Ultra-Localized Dialect Engagement Rally),",
  "riskLevel": "Low | Medium | High",
  "estimatedQualityTier": "Elite | High Potential | Growth Creator | Emerging Creator",
  "campaignSuitabilityScore": 0-100 (number)
}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are the AuraSearch Enterprise Performance Auditor. Output a strict JSON structure containing the SCRAG report. Avoid any conversational filler outside of the JSON.",
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("SCRAG Calculator API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });
}

startServer();
