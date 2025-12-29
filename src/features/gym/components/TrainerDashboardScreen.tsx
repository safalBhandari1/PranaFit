// src/features/gym/components/TrainerDashboardScreen.tsx (FIXED)
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useEnhancedTheme } from '../../../shared/hooks/useEnhancedTheme';
import { ThemeView } from '../../../shared/ui/ThemeView';
import { ThemeText } from '../../../shared/ui/ThemeText';
import { createTrainerDashboardStyles } from '../styles/trainerDashboardStyles';

const TrainerDashboardScreen: React.FC = () => {
  const { theme } = useEnhancedTheme();
  const styles = createTrainerDashboardStyles(theme);

  return (
    <ThemeView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemeText variant="h1" style={styles.title}>
          Trainer Dashboard
        </ThemeText>
        <ThemeText style={styles.subtitle}>
          Manage your clients and training programs
        </ThemeText>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          {/* Stat Card 1 */}
          <View style={styles.statCard}>
            <ThemeText style={styles.statCardTitle}>Active Clients</ThemeText>
            <ThemeText variant="h2" style={styles.statCardValue}>12</ThemeText>
            <ThemeText style={styles.statCardSubtitle}>Currently training</ThemeText>
          </View>

          {/* Stat Card 2 */}
          <View style={styles.statCard}>
            <ThemeText style={styles.statCardTitle}>Sessions Today</ThemeText>
            <ThemeText variant="h2" style={styles.statCardValue}>3</ThemeText>
            <ThemeText style={styles.statCardSubtitle}>Upcoming sessions</ThemeText>
          </View>

          {/* Stat Card 3 */}
          <View style={styles.statCard}>
            <ThemeText style={styles.statCardTitle}>Programs</ThemeText>
            <ThemeText variant="h2" style={styles.statCardValue}>8</ThemeText>
            <ThemeText style={styles.statCardSubtitle}>Active programs</ThemeText>
          </View>

          {/* Stat Card 4 */}
          <View style={styles.statCard}>
            <ThemeText style={styles.statCardTitle}>Progress</ThemeText>
            <ThemeText variant="h2" style={styles.statCardValue}>92%</ThemeText>
            <ThemeText style={styles.statCardSubtitle}>Goal completion</ThemeText>
          </View>
        </View>

        {/* Upcoming Sessions */}
        <View style={styles.section}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Today's Sessions
          </ThemeText>
          <View style={styles.sessionsCard}>
            <View style={styles.sessionItem}>
              <View style={styles.sessionTime}>
                <ThemeText style={styles.sessionTimeText}>10:00 AM</ThemeText>
              </View>
              <View style={styles.sessionDetails}>
                <ThemeText style={styles.sessionClient}>John Doe</ThemeText>
                <ThemeText style={styles.sessionType}>Strength Training</ThemeText>
              </View>
              <View style={styles.sessionStatus}>
                <ThemeText style={styles.statusConfirmed}>Confirmed</ThemeText>
              </View>
            </View>

            <View style={styles.sessionItem}>
              <View style={styles.sessionTime}>
                <ThemeText style={styles.sessionTimeText}>2:00 PM</ThemeText>
              </View>
              <View style={styles.sessionDetails}>
                <ThemeText style={styles.sessionClient}>Jane Smith</ThemeText>
                <ThemeText style={styles.sessionType}>Cardio & Conditioning</ThemeText>
              </View>
              <View style={styles.sessionStatus}>
                <ThemeText style={styles.statusPending}>Pending</ThemeText>
              </View>
            </View>

            <View style={styles.sessionItem}>
              <View style={styles.sessionTime}>
                <ThemeText style={styles.sessionTimeText}>4:30 PM</ThemeText>
              </View>
              <View style={styles.sessionDetails}>
                <ThemeText style={styles.sessionClient}>Mike Johnson</ThemeText>
                <ThemeText style={styles.sessionType}>Personal Training</ThemeText>
              </View>
              <View style={styles.sessionStatus}>
                <ThemeText style={styles.statusConfirmed}>Confirmed</ThemeText>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Client Progress */}
        <View style={styles.section}>
          <ThemeText variant="h2" style={styles.sectionTitle}>
            Client Progress Updates
          </ThemeText>
          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <ThemeText style={styles.progressClient}>Sarah Wilson</ThemeText>
              <ThemeText style={styles.progressText}>
                +5kg on bench press this week
              </ThemeText>
            </View>
            <View style={styles.progressItem}>
              <ThemeText style={styles.progressClient}>Robert Chen</ThemeText>
              <ThemeText style={styles.progressText}>
                Lost 2kg, body fat down 3%
              </ThemeText>
            </View>
            <View style={styles.progressItem}>
              <ThemeText style={styles.progressClient}>Emma Davis</ThemeText>
              <ThemeText style={styles.progressText}>
                Completed marathon training program
              </ThemeText>
            </View>
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemeView>
  );
};

export default TrainerDashboardScreen;