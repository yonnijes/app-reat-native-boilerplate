import { config } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui'

// Rick and Morty color palette
const portalGreen = '#97CE4C'
const portalBlue = '#00D9FF'
const rickBlue = '#87CEEB'
const mortyYellow = '#F5E800'
const spaceDark = '#1A1A2E'
const spaceDeep = '#16213E'
const portalPink = '#E94560'
const alienGreen = '#44CF6C'

const customTokens = createTokens({
    ...config.tokens,
    color: {
        ...config.tokens.color,
        portalGreen,
        portalBlue,
        rickBlue,
        mortyYellow,
        spaceDark,
        spaceDeep,
        portalPink,
        alienGreen,
    },
})

const appConfig = createTamagui({
    ...config,
    tokens: customTokens,
    themes: {
        ...config.themes,
        dark: {
            ...config.themes.dark,
            background: spaceDark,
            backgroundHover: spaceDeep,
            backgroundPress: spaceDeep,
            backgroundFocus: spaceDeep,
            color: '#FFFFFF',
            colorHover: portalGreen,
            colorPress: portalGreen,
            colorFocus: portalGreen,
            borderColor: portalGreen,
            borderColorHover: portalBlue,
            borderColorFocus: portalBlue,
            borderColorPress: portalBlue,
        },
        light: {
            ...config.themes.light,
            background: '#F0F0F0',
            backgroundHover: '#E0E0E0',
            backgroundPress: '#D0D0D0',
            backgroundFocus: '#D0D0D0',
            color: spaceDark,
            colorHover: portalGreen,
            colorPress: portalGreen,
            colorFocus: portalGreen,
            borderColor: portalGreen,
            borderColorHover: portalBlue,
            borderColorFocus: portalBlue,
            borderColorPress: portalBlue,
        },
    },
})

export type AppConfig = typeof appConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default appConfig
