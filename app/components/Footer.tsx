'use client'

import { SocialIcons } from './SocialIcons'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 text-xs uppercase font-light">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
          {/* الحقوق */}
          <div className="text-xs font-light uppercase">
            @ 2026 جميع الحقوق محفوظة للمخرج والمنتج علي فاضل.
          </div>

          <SocialIcons containerClassName="flex flex-wrap items-center justify-center md:justify-end gap-2" />
        </div>
      </div>
    </footer>
  )
}