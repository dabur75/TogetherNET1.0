import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useLanguage } from '../../contexts/LanguageContext'

export default function BankerPresence() {
  const { language } = useLanguage()

  const bankerText = language === 'he' ? '🏦' : '🏦'
  const bankerTooltip =
    language === 'he' ? 'הבנקאי שלך כאן בשבילך' : 'Your banker is here for you'

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.bankerIcon}>
        <Text style={styles.bankerEmoji}>{bankerText}</Text>
      </View>
      <Text style={styles.tooltip}>{bankerTooltip}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    alignItems: 'center',
  },
  bankerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bankerEmoji: {
    fontSize: 18,
  },
  tooltip: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    padding: 8,
    borderRadius: 6,
    fontSize: 12,
    opacity: 0,
    // TODO: Add animation to show tooltip on press
  },
})
