import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavigation from "../components/navigation/BottomNavigation";
import Colors from "../constants/colors";
import { useProfile } from "../features/profile/ProfileContext";

type Detail = { title: string; content: string; confirmClear?: boolean } | null;

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfile();
  const [detail, setDetail] = useState<Detail>(null);
  const [journalCleared, setJournalCleared] = useState(false);
  const initial = profile.name.trim().charAt(0).toUpperCase() || "A";

  const openDetail = (title: string, content: string) => setDetail({ title, content });
  const clearJournal = () => { setJournalCleared(true); setDetail({ title: "Journal data cleared", content: "The journal entries stored for this UI session have been cleared." }); };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{initial}</Text></View>
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{profile.name}</Text><Text style={styles.email}>{profile.email}</Text>
            <Pressable accessibilityRole="button" onPress={() => router.push("/edit-profile")}><Text style={styles.editLink}>Edit Profile →</Text></Pressable>
          </View>
        </View>
        <SettingsSection title="ACCOUNT"><SettingRow label="Edit Profile" onPress={() => router.push("/edit-profile")} /><SettingRow label="Change Password" onPress={() => router.push("/forgot-password")} /></SettingsSection>
        <SettingsSection title="MY WELLNESS">
          <SettingRow label="Cycle Information" onPress={() => openDetail("Cycle Information", `Last period: ${formatDate(profile.lastPeriodDate)}\nRecent cycles: ${profile.cycleLengths.join(", ")} days\nRecent periods: ${profile.periodLengths.join(", ")} days`)} />
          <SettingRow label="Prediction Data" onPress={() => openDetail("Prediction Data", `Age: ${calculateAge(profile.dateOfBirth) ?? "Not added"}\nBMI: ${formatBmi(profile)}\nSleep: ${profile.sleepHours || "Not added"} hours\nStress level: ${profile.stressLevel}/5\nExercise: ${exerciseLabel(profile.exerciseFrequency)}`)} />
          <SettingRow label="Mood History" onPress={() => openDetail("Mood History", "Mood tracking is ready. Your recorded moods will appear here once you begin using the Mood section.")} />
        </SettingsSection>
        <SettingsSection title="PRIVACY">
          <SettingRow label="Journal Privacy" onPress={() => openDetail("Journal Privacy", "Your journal entries are private. They are not shared with other users.")} />
          <SettingRow label="Data & Privacy" onPress={() => openDetail("Data & Privacy", "NAVYA uses your information to personalize cycle predictions. Backend data controls will be available when secure account storage is connected.")} />
          <SettingRow label={journalCleared ? "Local Journal Data Cleared" : "Clear Local Journal Data"} danger onPress={() => setDetail({ title: "Clear Local Journal Data?", content: "This will clear journal entries from the current UI session. This action cannot be undone.", confirmClear: true })} />
        </SettingsSection>
      </ScrollView>
      <BottomNavigation activeTab="Profile" />
      <InfoDialog detail={detail} onClose={() => setDetail(null)} onConfirmClear={clearJournal} />
    </SafeAreaView>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) { return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text><View style={styles.settingsCard}>{children}</View></View>; }
function SettingRow({ label, onPress, danger = false }: { label: string; onPress: () => void; danger?: boolean }) { return <Pressable accessibilityRole="button" onPress={onPress} style={styles.settingRow}><Text style={[styles.settingLabel, danger ? styles.dangerLabel : null]}>{label}</Text><Ionicons name="chevron-forward" size={22} color="#C6A1DE" /></Pressable>; }
function InfoDialog({ detail, onClose, onConfirmClear }: { detail: Detail; onClose: () => void; onConfirmClear: () => void }) { return <Modal transparent visible={Boolean(detail)} animationType="fade" onRequestClose={onClose}><Pressable style={styles.modalBackdrop} onPress={onClose}><Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}><Text style={styles.modalTitle}>{detail?.title}</Text><Text selectable style={styles.modalText}>{detail?.content}</Text><View style={styles.modalActions}>{detail?.confirmClear ? <Pressable accessibilityRole="button" onPress={onConfirmClear} style={styles.clearButton}><Text style={styles.clearButtonText}>Clear Data</Text></Pressable> : null}<Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}><Text style={styles.closeButtonText}>Close</Text></Pressable></View></Pressable></Pressable></Modal>; }

function formatDate(date: Date | null) { return date ? date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : "Not added"; }
function exerciseLabel(value: number | null) { return value === 0 ? "Rarely / Never" : value === 1 ? "Sometimes" : value === 2 ? "Frequently" : "Not added"; }
function calculateAge(date: Date | null) { if (!date) return null; const now = new Date(); let years = now.getFullYear() - date.getFullYear(); if (now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())) years -= 1; return years; }
function formatBmi(profile: ReturnType<typeof useProfile>["profile"]) { const feet = Number(profile.heightFeet); const inches = Number(profile.heightInches); const weight = Number(profile.weightKg); const height = (feet * 12 + inches) * 0.0254; return height > 0 && weight > 0 ? (weight / (height * height)).toFixed(1) : "Not added"; }

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background }, content: { paddingHorizontal: 15, paddingTop: 39, paddingBottom: 29, gap: 25 }, title: { color: Colors.darkPurple, fontSize: 28, fontWeight: "700" }, profileCard: { flexDirection: "row", alignItems: "center", gap: 21, padding: 26, borderWidth: 1, borderColor: "#E1C5FB", borderRadius: 30, backgroundColor: "#EBCFFF" }, avatar: { width: 80, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 40, backgroundColor: "#C978F1" }, avatarText: { color: Colors.white, fontSize: 31, fontWeight: "700" }, profileDetails: { flex: 1 }, name: { color: Colors.darkPurple, fontSize: 23, fontWeight: "700" }, email: { marginTop: 5, color: "#A37ABC", fontSize: 17 }, editLink: { marginTop: 7, color: "#C86CF3", fontSize: 16, fontWeight: "600" }, section: { gap: 10 }, sectionTitle: { marginLeft: 4, color: "#C2A0D5", fontSize: 13, fontWeight: "700", letterSpacing: 1 }, settingsCard: { overflow: "hidden", borderWidth: 1, borderColor: "#E8D9F5", borderRadius: 28, backgroundColor: Colors.white }, settingRow: { minHeight: 65, paddingHorizontal: 20, alignItems: "center", justifyContent: "space-between", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F0E7F8" }, settingLabel: { color: Colors.darkPurple, fontSize: 18 }, dangerLabel: { color: "#F13D4B" }, modalBackdrop: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "rgba(36, 21, 61, 0.3)" }, modalCard: { width: "100%", padding: 24, borderRadius: 25, backgroundColor: Colors.white }, modalTitle: { color: Colors.darkPurple, fontSize: 22, fontWeight: "700" }, modalText: { marginTop: 13, color: "#795C94", fontSize: 16, lineHeight: 25 }, modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 24 }, closeButton: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 18, backgroundColor: "#ECDDFF" }, closeButtonText: { color: Colors.darkPurple, fontSize: 15, fontWeight: "700" }, clearButton: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 18, backgroundColor: "#FFE8ED" }, clearButtonText: { color: "#E13C4C", fontSize: 15, fontWeight: "700" },
});
