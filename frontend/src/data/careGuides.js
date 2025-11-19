const careGuides = {
  'p1': [
    'Day 0: Welcome home! Let me settle in. No water today, please.',
    'Day 1: I\'m still adjusting. Check my soil, but I\'m probably not thirsty yet.',
    'Day 2: You can water me today if my soil is dry. Give me a good soak.',
    'Day 3: Just relaxing. Make sure I get some bright, indirect light.',
    'Day 4: I\'m enjoying my new home. No water needed.',
    'Day 5: Check my soil again. If it\'s dry, it\'s time for a drink.',
    'Day 6: Keep up the good work! I\'m a happy plant.',
  ],
  'p3': [
    'Day 0: I\'m a bit sensitive, so please be gentle. No water today.',
    'Day 1: Find a spot with bright, indirect light and try not to move me.',
    'Day 2: I might be thirsty today. Check my soil and water me if it\'s dry.',
    'Day 3: I like consistency. Keep my environment stable.',
    'Day 4: No water today. Just admire my beautiful leaves.',
    'Day 5: Check my soil. I don\'t like to be too wet or too dry.',
    'Day 6: I\'m a bit of a diva, but I\'m worth it!',
  ],
};

export const getCareGuide = (plantId) => {
  return careGuides[plantId] || [];
};