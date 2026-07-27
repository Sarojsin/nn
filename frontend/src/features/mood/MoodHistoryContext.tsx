import React, { createContext, useMemo, useState } from "react";
import { MoodId } from "./moodRepository";

type MoodHistoryContextValue = { loggedMood: MoodId | null; logMood: (mood: MoodId) => void };
const MoodHistoryContext = createContext<MoodHistoryContextValue | null>(null);

export function MoodHistoryProvider({ children }: { children: React.ReactNode }) {
  const [loggedMood, setLoggedMood] = useState<MoodId | null>(null);
  const value = useMemo(() => ({ loggedMood, logMood: setLoggedMood }), [loggedMood]);
  return <MoodHistoryContext.Provider value={value}>{children}</MoodHistoryContext.Provider>;
}

export function useMoodHistory() {
  const context = React.use(MoodHistoryContext);
  if (!context) throw new Error("useMoodHistory must be used within MoodHistoryProvider.");
  return context;
}
