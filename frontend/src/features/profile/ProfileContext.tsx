import React, { createContext, useMemo, useState } from "react";

export type ProfileData = {
  name: string;
  email: string;
  lastPeriodDate: Date | null;
  cycleLengths: string[];
  periodLengths: string[];
  dateOfBirth: Date | null;
  menarcheAge: string;
  heightFeet: string;
  heightInches: string;
  weightKg: string;
  sleepHours: string;
  stressLevel: number;
  exerciseFrequency: number | null;
  medicationContraceptive: number | null;
};

const defaultProfile: ProfileData = {
  name: "Aarya Sharma", email: "aarya@example.com", lastPeriodDate: null,
  cycleLengths: ["28", "28", "28"], periodLengths: ["5", "5", "5"],
  dateOfBirth: null, menarcheAge: "", heightFeet: "", heightInches: "", weightKg: "",
  sleepHours: "6", stressLevel: 3, exerciseFrequency: null, medicationContraceptive: null,
};

type ProfileContextValue = { profile: ProfileData; updateProfile: (values: Partial<ProfileData>) => void };
const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const value = useMemo(() => ({ profile, updateProfile: (values: Partial<ProfileData>) => setProfile((current) => ({ ...current, ...values })) }), [profile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = React.use(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider.");
  return context;
}
