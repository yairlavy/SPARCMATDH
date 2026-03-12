export const candidateQuestions = [
  {
    section: "Basic Details",
    icon: "User",
    questions: [
      { id: "age", label: "Age", type: "text", placeholder: "e.g. 24" },
      { id: "height", label: "Height", type: "text", placeholder: "e.g. 5'6\" or 168cm" },
      { id: "city", label: "City / Current Residence", type: "text", placeholder: "Where do they live now?" },
      { id: "occupation", label: "Current Occupation", type: "text", placeholder: "What do they do professionally?" },
      { id: "studies", label: "Studies / Education", type: "text", placeholder: "Degree, field, institution..." },
      { id: "daily_life", label: "What does a typical day look like for them?", type: "textarea", hint: "Help us understand their rhythm and lifestyle", placeholder: "Describe their day-to-day..." },
    ]
  },
  {
    section: "Life Journey",
    icon: "Route",
    questions: [
      { id: "childhood", label: "Where did they grow up? What was their childhood like?", type: "textarea", hint: "Family atmosphere, neighborhood, memorable experiences", placeholder: "Share about their upbringing..." },
      { id: "schools", label: "Schools & Formative Education", type: "textarea", hint: "High school, yeshiva/seminary, any impactful teachers or experiences", placeholder: "Key educational milestones..." },
      { id: "army_service", label: "Army / National Service / Gap Year", type: "textarea", hint: "What did they do? How did it shape them?", placeholder: "Service experience, if applicable..." },
      { id: "life_stages", label: "Major life stages or meaningful transitions", type: "textarea", hint: "Moving cities, career changes, personal growth moments", placeholder: "What shaped who they are today?" },
    ]
  },
  {
    section: "Personality & Character",
    icon: "Heart",
    questions: [
      { id: "strengths", label: "What are their greatest strengths?", type: "textarea", hint: "Think about what friends and family would say about them", placeholder: "Kind, driven, thoughtful..." },
      { id: "character_traits", label: "Core character traits", type: "textarea", hint: "How would you describe their essence in a few words?", placeholder: "e.g. warm, principled, witty, calm..." },
      { id: "communication_style", label: "How do they communicate?", type: "textarea", hint: "Are they a deep listener? Expressive? Thoughtful speaker?", placeholder: "Describe how they connect with others..." },
      { id: "emotional_style", label: "Emotional style", type: "textarea", hint: "How do they handle emotions? Are they open, steady, empathetic?", placeholder: "Their emotional nature..." },
      { id: "social_style", label: "Social style", type: "textarea", hint: "Life of the party? Intimate circle? Comfortable one-on-one?", placeholder: "How they are in social settings..." },
    ]
  },
  {
    section: "What Makes Them Unique",
    icon: "Sparkles",
    questions: [
      { id: "special_qualities", label: "What makes this person truly stand out?", type: "textarea", hint: "The thing people remember after meeting them", placeholder: "That special quality..." },
      { id: "values", label: "Core values they live by", type: "textarea", hint: "What principles guide their decisions?", placeholder: "e.g. honesty, chesed, growth, family..." },
      { id: "worldview", label: "How do they see the world?", type: "textarea", hint: "Optimistic? Thoughtful? Mission-driven?", placeholder: "Their perspective on life..." },
      { id: "memorable_traits", label: "A memorable trait or story that captures who they are", type: "textarea", hint: "An anecdote or detail that shows their character", placeholder: "Something that paints a picture..." },
    ]
  },
  {
    section: "Hobbies & Interests",
    icon: "Palette",
    questions: [
      { id: "hobbies", label: "Regular hobbies and leisure activities", type: "textarea", placeholder: "What do they enjoy doing?" },
      { id: "passions", label: "Passions or deep interests", type: "textarea", hint: "Something they light up talking about", placeholder: "What excites them?" },
      { id: "environments", label: "Favorite environments or settings", type: "textarea", hint: "Nature? City life? Shabbos table? Library?", placeholder: "Where are they happiest?" },
      { id: "creative_intellectual", label: "Creative or intellectual interests", type: "textarea", hint: "Music, art, learning, writing, cooking...", placeholder: "What feeds their mind or soul?" },
    ]
  },
  {
    section: "Aspirations & Goals",
    icon: "Target",
    questions: [
      { id: "personal_goals", label: "Personal goals and dreams", type: "textarea", placeholder: "What are they working towards?" },
      { id: "family_vision", label: "Family vision", type: "textarea", hint: "What kind of home do they dream of building?", placeholder: "Their vision for a future family..." },
      { id: "religious_aspirations", label: "Religious aspirations", type: "textarea", hint: "How do they want to grow spiritually?", placeholder: "Their religious direction..." },
      { id: "career_direction", label: "Career direction", type: "textarea", placeholder: "Where are they headed professionally?" },
    ]
  },
  {
    section: "Religious Lifestyle",
    icon: "BookOpen",
    questions: [
      { id: "observance_level", label: "Level of observance", type: "textarea", hint: "How would you describe their religious life?", placeholder: "Shabbat, kashrut, davening, learning..." },
      { id: "home_style", label: "Style of home they want to build", type: "textarea", hint: "Open Shabbos table? Torah-centered? Balanced?", placeholder: "What's their vision for a Jewish home?" },
      { id: "hashkafa", label: "Hashkafa / Worldview", type: "textarea", hint: "How do they integrate Torah and the modern world?", placeholder: "Their approach to Judaism..." },
      { id: "community_pref", label: "Community preferences", type: "textarea", placeholder: "What kind of community do they want to be part of?" },
    ]
  }
];

export const partnerQuestions = [
  {
    section: "Desired Qualities",
    icon: "Heart",
    questions: [
      { id: "important_qualities", label: "Most important qualities in a partner", type: "textarea", hint: "What truly matters to them?", placeholder: "e.g. kindness, ambition, humor, depth..." },
      { id: "personality_pref", label: "Preferred personality type", type: "textarea", hint: "Outgoing? Calm? Intellectual? Creative?", placeholder: "What personality resonates with them?" },
      { id: "values_pref", label: "Important values in a partner", type: "textarea", placeholder: "What values must their partner share?" },
    ]
  },
  {
    section: "Lifestyle & Religious Level",
    icon: "Home",
    questions: [
      { id: "lifestyle_pref", label: "Preferred lifestyle", type: "textarea", hint: "Active? Homebody? Balanced? Adventurous?", placeholder: "What kind of lifestyle fits?" },
      { id: "religious_level_pref", label: "Preferred religious level", type: "textarea", hint: "How religious should their partner be?", placeholder: "Level of observance and commitment..." },
      { id: "home_dynamic", label: "Preferred home dynamic", type: "textarea", hint: "Roles, balance, warmth, atmosphere...", placeholder: "What should their home feel like?" },
    ]
  },
  {
    section: "Life Goals & Compatibility",
    icon: "Compass",
    questions: [
      { id: "life_goals_pref", label: "Important life goals in a partner", type: "textarea", placeholder: "Career, family, community, growth..." },
      { id: "relationship_type", label: "Type of relationship they envision", type: "textarea", hint: "Equal partners? Traditional? Collaborative?", placeholder: "How should the relationship work?" },
      { id: "dealbreakers", label: "Any dealbreakers or non-negotiables?", type: "textarea", hint: "Be honest — what absolutely won't work?", placeholder: "Things that are off the table..." },
    ]
  }
];