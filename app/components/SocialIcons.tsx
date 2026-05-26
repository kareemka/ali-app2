'use client'

import { useEffect } from 'react'
import { useSettingsStore } from '@/stores/settings.store'

interface SocialIconsProps {
  containerClassName?: string
}

export function SocialIcons({ containerClassName = "flex items-center gap-2" }: SocialIconsProps) {
  const { settings, fetchSettings } = useSettingsStore()

  useEffect(() => {
    if (!settings) {
      fetchSettings()
    }
  }, [fetchSettings, settings])

  if (!settings) return null

  return (
    <div className={containerClassName}>
      {settings.storeEmail && (
        <a href={`mailto:${settings.storeEmail}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
        </a>
      )}
      {settings.facebook && (
        <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <svg width="30" height="30" viewBox="0 0 56.7 56.7" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <path fill="#FFFFFF" d="M28.3,5.2c-13.6,0-24.6,11-24.6,24.6c0,13.6,11,24.6,24.6,24.6S53,43.4,53,29.8C53,16.2,41.9,5.2,28.3,5.2z M34.9,29.7h-4.3c0,6.8,0,15.2,0,15.2h-6.3c0,0,0-8.3,0-15.2h-3v-5.4h3v-3.5c0-2.5,1.2-6.4,6.4-6.4l4.7,0v5.2c0,0-2.8,0-3.4,0c-0.6,0-1.3,0.3-1.3,1.5v3.2h4.8L34.9,29.7z" />
          </svg>
        </a>
      )}
      {settings.instagram && (
        <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <svg width="30" height="30" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <g>
              <path fill="#FFFFFF" d="M64.1,75.3c6.2,0,11.2-4.9,11.2-10.9c0-6-5-10.9-11.2-10.9c-6.2,0-11.2,4.9-11.2,10.9C52.8,70.5,57.9,75.3,64.1,75.3z" />
              <path fill="#FFFFFF" d="M76.7,53.9h6.3c1.4,0,2.5-1.1,2.5-2.5v-6c0-1.4-1.1-2.5-2.5-2.5h-6.3c-1.4,0-2.5,1.1-2.5,2.5v6C74.2,52.8,75.4,53.9,76.7,53.9z" />
              <path fill="#FFFFFF" d="M81.4,65.1c0,9.3-7.8,16.8-17.3,16.8c-9.6,0-17.3-7.5-17.3-16.8c0-1.7,0.3-3.3,0.7-4.8h-5.1v23.6c0,1.2,1,2.2,2.2,2.2h38.8c1.2,0,2.2-1,2.2-2.2V60.3h-4.9C81.1,61.8,81.4,63.4,81.4,65.1z" />
              <path fill="#FFFFFF" d="M64,8C33.1,8,8,33.1,8,64c0,30.9,25.1,56,56,56c30.9,0,56-25.1,56-56C120,33.1,94.9,8,64,8z M91.9,85.3c0,3.9-3.2,7.2-7.2,7.2H43.3c-3.9,0-7.2-3.2-7.2-7.2V43.9c0-3.9,3.2-7.2,7.2-7.2h41.5c3.9,0,7.2,3.2,7.2,7.2L91.9,85.3L91.9,85.3z" />
            </g>
          </svg>
        </a>
      )}
      {settings.twitter && (
        <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <svg width="30" height="30" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <path fill="#FFFFFF" d="M30,0C13.4,0,0,13.4,0,30s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0z M42.8,23.1c0,0.3,0,0.6,0,0.9c0,9.2-6.7,19.8-18.9,19.8c-3.7,0-7.2-1.2-10.2-3.2c0.5,0.1,1,0.1,1.6,0.1c3.1,0,6-1.1,8.2-3c-2.9-0.1-5.3-2.1-6.2-4.9c0.4,0.1,0.8,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2c-3-0.7-5.3-3.5-5.3-7c0,0,0-0.1,0-0.1c0.9,0.5,1.9,0.9,3,0.9c-1.8-1.3-2.9-3.5-2.9-5.9c0-1.3,0.3-2.5,0.9-3.5c3.3,4.3,8.2,7.2,13.7,7.5c-0.1-0.5-0.2-1.1-0.2-1.6c0-3.9,3-7,6.6-6.9c1.9,0,3.6,0.9,4.8,2.3c1.5-0.3,2.9-0.8,4.2-1.6c-0.5,1.6-1.5,3-2.9,3.8c1.3-0.1,2.6-0.5,3.8-1C45.3,21,44.1,22.2,42.8,23.1z" />
          </svg>
        </a>
      )}
      {settings.discord && (
        <a href={settings.discord} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </div>
        </a>
      )}
      {settings.whatsapp && (
        <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
        </a>
      )}
      {settings.youtube && (
        <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <svg width="30" height="30" viewBox="0 0 270 268" className="transition-transform duration-300 group-hover:-rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-[0.9]">
            <path fill="#FFFFFF" d="M135-1c74.5,0,135,60.5,135,135s-60.5,135-135,135S0,208.5,0,134S60.5-1,135-1z M215.8,93.4c-1.9-7.3-7.7-13-14.9-14.9c-13.2-3.5-65.9-3.5-65.9-3.5s-52.8,0-65.9,3.5c-7.3,1.9-13,7.7-14.9,14.9c-3.5,13.2-3.5,40.6-3.5,40.6s0,27.5,3.5,40.6c1.9,7.3,7.7,13,14.9,14.9c13.2,3.5,65.9,3.5,65.9,3.5s52.8,0,65.9-3.5c7.3-1.9,13-7.7,14.9-14.9c3.5-13.2,3.5-40.6,3.5-40.6S219.4,106.5,215.8,93.4z M118.1,159.3v-50.6L162,134C162,134,118.1,159.3,118.1,159.3z" />
          </svg>
        </a>
      )}
      {settings.tiktok && (
        <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-all duration-300 hover:scale-125">
          <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </div>
        </a>
      )}
    </div>
  )
}
