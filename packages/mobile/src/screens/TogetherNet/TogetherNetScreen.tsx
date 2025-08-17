import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useLanguage } from '../../contexts/LanguageContext'
import { useRTLStyles } from '../../utils/rtlUtils'

export default function TogetherNetScreen() {
  const { language } = useLanguage()
  const rtlStyles = useRTLStyles()

  const title = language === 'he' ? 'TogetherNet' : 'TogetherNet'
  const subtitle =
    language === 'he'
      ? 'אתה חלק מהרשת שעוזרת לאחרים להחלים'
      : "You're part of the network helping others heal"

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, { textAlign: rtlStyles.textAlign }]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { textAlign: rtlStyles.textAlign }]}>
          {subtitle}
        </Text>
        <Text style={[styles.comingSoon, { textAlign: rtlStyles.textAlign }]}>
          {language === 'he' ? 'בקרוב...' : 'Coming soon...'}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#FFD700',
    marginBottom: 20,
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  comingSoon: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
})
