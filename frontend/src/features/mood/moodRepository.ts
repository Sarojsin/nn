export type MoodId = "happy" | "sad" | "angry" | "anxious" | "tired" | "stressed";
export type ActivityType = "journal" | "breathing" | "grounding" | "relaxation";

export type MoodConfig = { id: MoodId; label: string; emoji: string; color: string; quote: string; activity: ActivityType; activityLabel: string };

export const moodConfigurations: Record<MoodId, MoodConfig> = {
  happy: { id: "happy", label: "Happy", emoji: "😊", color: "#FFF6D9", quote: "What made you feel happy today? Let this bright moment be something you notice and keep close.", activity: "journal", activityLabel: "✨ Capture This Moment" },
  sad: { id: "sad", label: "Sad", emoji: "😔", color: "#EEF5FF", quote: "What is making you feel this way? You do not have to rush through this feeling.", activity: "journal", activityLabel: "💭 Express Your Feelings" },
  angry: { id: "angry", label: "Angry", emoji: "😠", color: "#FFF0EA", quote: "Pause, breathe, and give yourself space before carrying the weight forward.", activity: "breathing", activityLabel: "Try a breathing exercise" },
  anxious: { id: "anxious", label: "Anxious", emoji: "😰", color: "#EDFFF4", quote: "Come back to this moment. You only need to take the next small step.", activity: "grounding", activityLabel: "Try a grounding exercise" },
  tired: { id: "tired", label: "Tired", emoji: "😴", color: "#F2EDFF", quote: "Rest is not a reward. Let your body have the softness it is asking for.", activity: "relaxation", activityLabel: "Take a relaxation pause" },
  stressed: { id: "stressed", label: "Stressed", emoji: "😣", color: "#FFF0FA", quote: "You are allowed to slow down. One steady breath can make room for calm.", activity: "breathing", activityLabel: "Try a breathing exercise" },
};

export const weeklyMoodHistory: (MoodId | null)[] = ["happy", "tired", "anxious", "happy", "angry", "happy", "happy"];
export const monthlyMoodHistory: Record<number, MoodId> = { 2: "happy", 3: "tired", 5: "anxious", 7: "happy", 10: "angry", 12: "happy", 15: "sad", 18: "stressed", 21: "happy" };

export const getMoodConfiguration = (value: string | undefined) => moodConfigurations[(value as MoodId) in moodConfigurations ? value as MoodId : "happy"];
