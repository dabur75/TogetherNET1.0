import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLanguage } from '../../contexts/LanguageContext'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { useRTLStyles } from '../../utils/rtlUtils'

type HeartBankNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HeartBank'
>

export default function HeartBankScreen() {
  const navigation = useNavigation<HeartBankNavigationProp>()
  const { language, toggleLanguage } = useLanguage()
  const rtlStyles = useRTLStyles()

  const welcomeText =
    language === 'he' ? 'ברוך הבא לבנק הלב שלך' : 'Welcome to your HeartBank'

  const depositText = language === 'he' ? 'הפקד היום' : 'Make a deposit today'

  const exerciseText = language === 'he' ? 'תרגיל יומי' : 'Daily Exercise'

  const crisisText = language === 'he' ? 'תמיכה במשבר' : 'Crisis Support'

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Language Toggle */}
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={toggleLanguage}
        >
          <Text style={styles.languageText}>
            {language === 'he' ? 'EN' : 'עב'}
          </Text>
        </TouchableOpacity>

        {/* Welcome Header */}
        <View style={styles.header}>
          <Text
            style={[styles.welcomeText, { textAlign: rtlStyles.textAlign }]}
          >
            {welcomeText}
          </Text>
          <Text style={[styles.subtitle, { textAlign: rtlStyles.textAlign }]}>
            {language === 'he'
              ? 'בנה את הערך העצמי שלך הפקדה אחר הפקדה'
              : 'Build your self-worth, one deposit at a time'}
          </Text>
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          {/* Daily Exercise Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('DailyExercise')}
          >
            <Text style={styles.actionButtonText}>{exerciseText}</Text>
            <Text style={styles.actionButtonSubtext}>
              {language === 'he'
                ? 'תרגיל חדש כל בוקר'
                : 'New exercise every morning'}
            </Text>
          </TouchableOpacity>

          {/* Make Deposit Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => navigation.navigate('DailyExercise')}
          >
            <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
              {depositText}
            </Text>
            <Text
              style={[styles.actionButtonSubtext, styles.primaryButtonSubtext]}
            >
              {language === 'he'
                ? 'התחל לבנות עושר רגשי'
                : 'Start building emotional wealth'}
            </Text>
          </TouchableOpacity>

          {/* Crisis Support Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.crisisButton]}
            onPress={() => navigation.navigate('EmergenSee')}
          >
            <Text style={[styles.actionButtonText, styles.crisisButtonText]}>
              {crisisText}
            </Text>
            <Text
              style={[styles.actionButtonSubtext, styles.crisisButtonSubtext]}
            >
              {language === 'he' ? 'אני כאן בשבילך' : "I'm here for you"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={[styles.statsTitle, { textAlign: rtlStyles.textAlign }]}>
            {language === 'he' ? 'סטטיסטיקות מהירות' : 'Quick Stats'}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>
                {language === 'he' ? 'הפקדות' : 'Deposits'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>
                {language === 'he' ? 'ימי רצף' : 'Streak Days'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>
                {language === 'he' ? 'ערך מצטבר' : 'Total Value'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Soft white from Sigalit system
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  languageToggle: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    marginBottom: 20,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  header: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#FFD700',
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  actionsContainer: {
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  crisisButton: {
    backgroundColor: '#40E0D0',
    borderColor: '#40E0D0',
  },
  actionButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  primaryButtonText: {
    color: '#1A1A1A',
  },
  crisisButtonText: {
    color: '#FFF',
  },
  actionButtonSubtext: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  primaryButtonSubtext: {
    color: '#1A1A1A',
  },
  crisisButtonSubtext: {
    color: '#FFF',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
})
