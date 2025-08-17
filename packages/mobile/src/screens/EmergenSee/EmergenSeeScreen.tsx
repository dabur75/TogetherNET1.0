import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useLanguage } from '../../contexts/LanguageContext'
import { useRTLStyles } from '../../utils/rtlUtils'

export default function EmergenSeeScreen() {
  const { language } = useLanguage()
  const rtlStyles = useRTLStyles()

  const title = language === 'he' ? 'Emergen-See' : 'Emergen-See'
  const subtitle =
    language === 'he'
      ? 'אני רואה אותך ברגע הכי חשוך שלך'
      : 'I see you in your darkest moment'

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
    backgroundColor: '#40E0D0',
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
    color: '#FFF',
    marginBottom: 20,
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  comingSoon: {
    fontSize: 16,
    color: '#FFF',
    fontStyle: 'italic',
    opacity: 0.8,
  },
})
