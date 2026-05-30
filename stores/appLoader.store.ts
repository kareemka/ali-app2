/**
 * appLoader.store.ts
 * Store مركزي يُشغّل كل الـ API calls دفعة واحدة
 * ويتابع ما إذا كانت جميع البيانات قد اكتمل تحميلها.
 */
import { create } from 'zustand'
import { useFilmographyStore } from './filmography.store'
import { useCommercialsStore } from './commercials.store'
import { useNewsStore } from './news.store'
import { useSettingsStore } from './settings.store'
import { useBackstageStore } from './backstage.store'

interface AppLoaderState {
  ready: boolean
  fetchAll: () => Promise<void>
}

export const useAppLoaderStore = create<AppLoaderState>((set) => ({
  ready: false,

  fetchAll: async () => {
    set({ ready: false })

    // نشغّل كل الـ stores بالتوازي ونصبر حتى تكتمل جميعها
    await Promise.allSettled([
      useFilmographyStore.getState().fetchFilms(),
      useCommercialsStore.getState().fetchCommercials(),
      useNewsStore.getState().fetchNews(),
      useSettingsStore.getState().fetchSettings(),
      useBackstageStore.getState().fetchBackstage(),
    ])

    set({ ready: true })
  },
}))

export const useAppReady = () => useAppLoaderStore((s) => s.ready)
