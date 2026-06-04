import { CREATORS_DATA } from '../creatorsData';

// Dynamic brief generator fallback
export function generateBriefFallback(brandName: string, city: string, category: string, goal: string) {
  const brand = brandName || "Brand";
  const cat = category || "General";
  const cityLower = city.toLowerCase();

  // Pick regional language/culture context
  let localFlavor = "regional";
  let hashtags = ["#SCRAGScore", "#LocalCreators", `#${city}Marketing`];
  if (cityLower.includes("chennai")) {
    localFlavor = "Tamil/Tanglish cultural hooks, Madras heritage references";
    hashtags.push("#NammaChennai", "#MadrasVibe", "#ChennaiCreators");
  } else if (cityLower.includes("coimbatore")) {
    localFlavor = "Kongu dialect, Coimbatore enterprise and family-trust themes";
    hashtags.push("#Kovai", "#CoimbatoreTimes", "#KonguNadu");
  } else if (cityLower.includes("bangalore") || cityLower.includes("bengaluru")) {
    localFlavor = "Kannada/English hybrid, Tech-savviness, IT hub culture, cafe references";
    hashtags.push("#NammaBengaluru", "#Indiranagar", "#SiliconValleyIn");
  } else if (cityLower.includes("kochi")) {
    localFlavor = "Malayalam regional hooks, Kerala aesthetics, local music and backwater visual tones";
    hashtags.push("#KeralaVibes", "#KochiDiaries", "#GodsOwnCountry");
  } else if (cityLower.includes("mumbai")) {
    localFlavor = "Marathi/Hindi Bollywood references, fast-paced Mumbai lifestyle, local trains";
    hashtags.push("#MumbaiMeriJaan", "#AmchiMumbai", "#MumbaiVibe");
  } else if (cityLower.includes("delhi")) {
    localFlavor = "Punjabi/Hindi high-energy slang, Delhi Metro, local food culture, street lifestyle";
    hashtags.push("#DilliWalas", "#DelhiNCR", "#NammaDelhi");
  } else if (cityLower.includes("hyderabad")) {
    localFlavor = "Deccani Urdu/Telugu accents, Biryani love, cyber city high-growth aspirations";
    hashtags.push("#ManaHyderabad", "#HyderabadDiaries", "#BiryaniLove");
  } else if (cityLower.includes("pune")) {
    localFlavor = "Marathi heritage pride, student culture, IT & academic premium aesthetics";
    hashtags.push("#PuneCreators", "#PuneInstagrammers", "#Puneri");
  }

  return {
    brief_title: `Operation ${city} Reach: ${brand} Hyper-local Launch`,
    target_audience: `Ages 18-34, active regional consumers, daily smartphone users in ${city}`,
    campaign_hook: `Bridging the gap - why ${city} residents are loving ${brand}'s local approach.`,
    content_pillars: [
       `Authentic integration with local ${city} lifestyle and landmarks.`,
       `Direct product demonstration tailored to ${cat} regional preferences.`,
       `Interactive community challenge to drive regional sharing of ${brand}.`
    ],
    content_formats: ["Instagram Reel with native vernacular voiceover", "YouTube Shorts product breakdown"],
    creator_profile: `Mid-tail local creators with a SCRAG Score > 75, highly active in the local ${city} community with local dialect expertise (${localFlavor}).`,
    best_posting_times: ["Wednesdays @ 6:00 PM", "Sundays @ 11:00 AM IST", "Fridays @ 8:15 PM"],
    campaign_duration: "3 - 4 Weeks",
    estimated_budget_range: "₹45,000 – ₹1,20,000 depending on final tier selection",
    top_hashtags: hashtags.slice(0, 5),
    success_metrics: [
       "Minimum 12.5% regional engagement rate",
       "Over 85% localized comment sentiment check",
       "Incremental brand purchase inquiries via direct-messages"
    ],
    pro_tip: `Avoid highly polished studio-lit content. Use natural lighting and local locations unique to ${city} to immediately establish trust and regional authenticity.`
  };
}

// Campaign Outcome Predictor fallback
export function predictOutcomeFallback(
  score: number, 
  budget: number, 
  platform: string, 
  contentType: string, 
  nicheMatch: number, 
  tier: string
) {
  // Model factors
  const scragFactor = score / 100;
  const nicheFactor = nicheMatch / 20;
  const budgetRatio = Math.min(1.5, Math.max(0.1, budget / 100000));

  // Determine base success probability
  let prob = Math.round((scragFactor * 45) + (nicheFactor * 35) + (budgetRatio * 20));
  prob = Math.max(15, Math.min(98, prob));

  // Estimate metrics
  const minReach = Math.round(budget * 0.8 * scragFactor * (platform === "Instagram" ? 1.2 : 0.9));
  const maxReach = Math.round(budget * 1.6 * scragFactor * (platform === "Instagram" ? 1.4 : 1.1));
  const reachStr = `${minReach.toLocaleString()} – ${maxReach.toLocaleString()}`;

  const engagementMin = (score / 15 + nicheMatch / 3).toFixed(1);
  const engagementMax = (score / 11 + nicheMatch / 2).toFixed(1);
  const engagementStr = `${engagementMin}% – ${engagementMax}%`;

  const minConversions = Math.round(minReach * 0.015 * (scragFactor + 0.2));
  const maxConversions = Math.round(maxReach * 0.035 * (scragFactor + 0.3));
  const convStr = `${minConversions.toLocaleString()} – ${maxConversions.toLocaleString()}`;

  // ROI estimate
  const roiMultiplier = (scragFactor * 2.2 + nicheFactor * 1.8 + 0.5) * (platform === "YouTube" ? 1.1 : 1.0);
  const roiMin = roiMultiplier.toFixed(1);
  const roiMax = (roiMultiplier * 1.4).toFixed(1);
  const roiStr = `${roiMin}x – ${roiMax}x`;

  let riskFactors = ["Slight content saturation in regional feeds", "Irregular posting schedule variations"];
  let successFactors = ["Highly aligned localized audience matching your niche", "Optimized regional SCRAG validation check"];

  if (score < 60) {
    riskFactors.push("Unvetted creator health status / low SCRAG total");
  }
  if (nicheMatch < 10) {
    riskFactors.push("Niche disconnect with regional audience interest");
  }
  if (budget < 30000) {
    riskFactors.push("Lower budget threshold for high-impact distribution");
  }

  return {
    success_probability: prob,
    confidence_level: prob >= 75 ? "High" : prob >= 50 ? "Medium" : "Low",
    predicted_reach: reachStr,
    predicted_engagement_rate: engagementStr,
    predicted_conversions: convStr,
    roi_estimate: roiStr,
    risk_factors: riskFactors.slice(0, 3),
    success_factors: successFactors.slice(0, 3),
    verdict: `A SCRAG rating of ${score} paired with ${contentType} content on ${platform} offers a reliable framework with an estimated return potential reaching up to ${roiMax}x.`,
    recommendation: `Proceed with localized targeting. Enforce tight regional slang keywords in first-generation scripts to maximize micro-influence trust factor.`
  };
}

// Campaign Timeline Builder fallback
export function generateTimelineFallback(
  brandName: string, 
  city: string, 
  niche: string, 
  goal: string, 
  duration: string
) {
  const brand = brandName || "Brand";

  // Build sequential calendar events
  const dayMilestones = duration.includes("30") 
    ? [
        { day: "Day 1-5", phase: "Regional Onboarding", action: "Equip local creators in " + city + " with regional " + brand + " guidelines.", content_type: "Intro briefing", platform: "Email/WhatsApp", goal: "Alignment" },
        { day: "Day 6-12", phase: "Teaser Content Cycle", action: "Launch first teaser video reviewing regional " + niche + " pain points.", content_type: "Instagram Story", platform: "Instagram", goal: "Awareness" },
        { day: "Day 13-20", phase: "Main Launch Activation", action: "Publish high-energy video demonstrations highlighting the core hook.", content_type: "Reels / Video", platform: "Instagram / YT", goal: "Conversions" },
        { day: "Day 21-26", phase: "User UGC Campaign", action: "Invite local followers in " + city + " to win regional prizes and discount codes.", content_type: "Sticker Challenge", platform: "Instagram", goal: "Shares" },
        { day: "Day 27-30", phase: "Final Campaign Push", action: "Post limited-offer reminders highlighting the campaign success.", content_type: "Carousel Review", platform: "Multi-platform", goal: "Urgency" }
      ]
    : [
        { day: "Day 1-2", phase: "Onboarding & Asset Delivery", action: "Direct delivery of assets and local sample kits to " + city + " creators.", content_type: "Sample unboxing", platform: "Direct Logistics", goal: "Alignment" },
        { day: "Day 3-5", phase: "Launch & Teaser Reveal", action: "Teaser content focusing on regional lifestyle problems under " + niche + ".", content_type: "Quick Story Polls", platform: "Instagram", goal: "Awareness" },
        { day: "Day 6-10", phase: "Main Solution Demonstration", action: "Full-length Reels / Shorts demonstrating " + brand + " resolving the goal.", content_type: "Dedicated Reel", platform: "Instagram/YouTube", goal: "Engagement" },
        { day: "Day 11-14", phase: "Direct Conversions Sweep", action: "Deploy distinct promo codes to finalize regional audience purchase cycle.", content_type: "Swipe-up CTA Video", platform: "Instagram / YT", goal: "Conversion Boost" }
      ];

  return {
    timeline: dayMilestones,
    peak_day: duration.includes("30") ? "Day 18 (Sustained main launch activation)" : "Day 8 (Post-unboxing main Reels launch)",
    warm_up_tip: `Engage with regional comments in the first 90 minutes. This signals strong local engagement back to the platform algorithms for ${city}.`,
    scale_tip: `Identify the highest-performing creator video and immediately run regional meta ads behind it targeting zip codes in ${city}.`
  };
}

// Regional Trend Forecaster fallback
export function analyzeTrendFallback(city: string, niche: string, range: string) {
  let multiplier = 1.15;
  let status: "Accelerating" | "Supercharged" | "Stable" | "Saturated" = "Stable";
  let platform = "Instagram";
  let insight = `The ${niche} interest in ${city} shows organic regional growth, proving beneficial for targeted messaging over the next period.`;

  const cityLower = city.toLowerCase();
  const nicheLower = niche.toLowerCase();

  // Custom localized trend matrices
  if (cityLower.includes("coimbatore")) {
    if (nicheLower.includes("food") || nicheLower.includes("travel")) {
      multiplier = 1.45;
      status = "Supercharged";
      platform = "Instagram Reels";
      insight = "Coimbatore regional food-blogging hub and premium family-trust lifestyle content are at an all-time peak index search rate.";
    } else {
      multiplier = 1.18;
      status = "Accelerating";
      platform = "Instagram";
      insight = "Coimbatore enterprise-driven manufacturing and premium wellness sectors show fresh localized business growth.";
    }
  } else if (cityLower.includes("bangalore")) {
    multiplier = 1.55;
    status = "Supercharged";
    platform = "YouTube / LinkedIn";
    insight = "Bangalore's highly tech-literate startup culture, workspace reviews, and active physical health niches produce highest national index scores.";
  } else if (cityLower.includes("kochi")) {
    if (nicheLower.includes("travel") || nicheLower.includes("beauty")) {
      multiplier = 1.38;
      status = "Accelerating";
      platform = "Instagram Reels";
      insight = "Kochi's unique visual-first travel, homestay curation, and Kerala aesthetic fashion trends are driving micro-audiences wild.";
    } else {
      multiplier = 1.12;
      status = "Stable";
      platform = "Instagram";
      insight = "Kochi audiences prefer authentic, peer-level daily-vlogs with regional Malayalam dialogue styling over brand models.";
    }
  } else if (cityLower.includes("chennai")) {
    if (nicheLower.includes("food") || nicheLower.includes("fashion")) {
      multiplier = 1.42;
      status = "Supercharged";
      platform = "Instagram / YouTube";
      insight = "Chennai regional cooking, traditional heritage styling reviews, and local street discoveries hold exceptional engagement benchmarks.";
    } else {
      multiplier = 1.25;
      status = "Accelerating";
      platform = "Instagram";
      insight = "Chennai families respond strongly to high-sentiment family lifestyle updates and educational regional accounts.";
    }
  }

  if (range === "7days") {
    insight += " Rapid viral potential on short-term trending audio loops detected.";
  } else if (range === "quarterly") {
    insight += " Heavy recurring seasonal search growth projects long-term durable campaign performance.";
  }

  return {
    trendMultiplier: parseFloat(multiplier.toFixed(2)),
    growthStatus: status,
    recommendedPlatform: platform,
    trendInsight: insight
  };
}

// Chatbot fallback expert replies
export function chatFallback(messages: any[]) {
  const lastUserMsg = messages[messages.length - 1]?.content || "";
  const query = lastUserMsg.toLowerCase();

  let reply = "";

  if (query.includes("kochi") || query.includes("cochin")) {
    const kochiCreators = CREATORS_DATA.filter(c => c.city.toLowerCase() === "kochi");
    reply = `### Kochi Region Creator Analysis
Kochi creators are currently showing exceptional growth trends due to localized aesthetic styles. Here are audited individuals within our region database:

` + kochiCreators.map(c => `- **${c.name}**
  * **Niche:** ${c.niche}
  * **SCRAG Rating:** ${c.scragTotal}/100
  * **Growth Trend:** +${(c.scragTotal * 0.12).toFixed(1)}% this week
  * **Followers:** ${c.followers >= 100000 ? (c.followers / 1000000).toFixed(1) + 'M' : Math.round(c.followers/1000) + 'K'}
  * **Best Fit:** Hyperlocal audience acquisition`).join("\n\n") + `

Would you like me to build a brief or campaign timeline for a brand launch in Kochi?`;
  } else if (query.includes("coimbatore") || query.includes("kovai")) {
    const kovaiCreators = CREATORS_DATA.filter(c => c.city.toLowerCase() === "coimbatore");
    reply = `### Coimbatore Region Creator Insights
Coimbatore boasts a high-trust, commerce-oriented regional audience database. Highly-aligned creators:

` + kovaiCreators.map(c => `- **${c.name}**
  * **Niche:** ${c.niche}
  * **SCRAG Rating:** ${c.scragTotal}/100
  * **Growth Trend:** +${(c.scragTotal * 0.15).toFixed(1)}% this week
  * **Followers:** ${c.followers >= 1000000 ? (c.followers / 1000000).toFixed(2) + 'M' : Math.round(c.followers/1000) + 'K'}
  * **Key Benefit:** Elite loyalty, localized Tamil community integration`).join("\n\n") + `

Would you like to run a simulated outcome forecast for one of these Coimbatore influencers?`;
  } else if (query.includes("scrag") || query.includes("calculate") || query.includes("score")) {
    reply = `### SCRAG Methodology Breakdown
The SCRAG metric measures hyper-local campaign effectiveness across four fundamental indicators:

1. **S**entiment & Engagement Check (30% weight) — Audits local comments to remove auto-bots and track active local trust levels.
2. **C**reative Consistency Rating (25% weight) — Maps regional relevance over the last 90 days.
3. **R**egional Density Index (25% weight) — Guarantees the creator's audience resides strictly in their physical hub city.
4. **AG**ility & Viral potential (20% weight) — Tracks velocity response to sudden local trends.

A total score above **70** signals high-trust viability for regional marketing investments. Would you like to use our ROIEstimator to run simulated budget calculations?`;
  } else if (query.includes("pricing") || query.includes("price") || query.includes("cost")) {
    reply = `### Pricing & Campaign Estimates
Regional campaign budgets are highly optimized within SCRAG networks compared to Tier 1 channels:

- **Micro campaigns (₹15,000 - ₹35,000):** Targets 1-3 micro-influencers yielding a localized reach of ~30k to 80k. Excellent for initial store launches.
- **Mid-tier campaigns (₹40,000 - ₹1,20,000):** Consolidates mid-tail local leaders to command Chennai, Coimbatore, or Kochi feeds. Strong conversions.
- **Enterprise networks (₹1,50,000+):** Maps multi-city networks for full-coverage South India launches.

Do you have a specific regional budget range so I can recommend the perfect combination?`;
  } else {
    // General Regional Creator recommendation
    const topCreators = [...CREATORS_DATA].sort((a,b) => b.scragTotal - a.scragTotal).slice(0, 3);
    reply = `### High-Performance Regional Creators
Here are top-performing audited regional influencers on the AuraSearch network this week:

` + topCreators.map((c, i) => `${i+1}. **${c.name}** in **${c.city}**
   * **Niche Match:** ${c.niche}
   * **SCRAG Score:** **${c.scragTotal}/100**
   * **Estimated ROI:** 4.2x - 5.6x
   * **Audience Alignment:** Very High`).join("\n") + `

Which city or industry is your upcoming campaign targeting so I can pull specific localized performance records?`;
  }

  return { text: reply };
}
