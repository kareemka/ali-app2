'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const bioShort = `علي فاضل خريج كلية الفنون الجميلة قسم المسرح فرع الإخراج عام ٢٠٠٥ مخرج وكاتب وممثل ومقدم بدأ مخرجا اثناء دراسته في كلية الفنون الجميلة تخرج أفلاما تجريبية ثم انتقل للعمل في القنوات دخل إلى قناة الشرقية عام 2005 كمخرج ثم عمل كمعد ومقدم برامج واستمر حتى عام 2013 بعدها عمل في قناة هنا بغداد أربعة أعوام وخلال عمله في القناتين قدم واعد وأخرج اكثر من ٢٠ برنامج ضخم ومئات الساعات من التقارير واللقاءات والوثائقيات وقدم عدد من البرامج الترفيهية مثل برنامج القناع والمايكروفون الذهبي ونيادرتال وبيت بيوت وميد ان كوريا في كوريا الجنوبية وميد ان تركيا في تركيا.`

const bioFull = `علي فاضل خريج كلية الفنون الجميلة قسم المسرح فرع الإخراج عام ٢٠٠٥ مخرج وكاتب وممثل ومقدم بدأ مخرجا اثناء دراسته في كلية الفنون الجميلة تخرج أفلاما تجريبية ثم انتقل للعمل في القنوات دخل إلى قناة الشرقية عام 2005 كمخرج ثم عمل كمعد ومقدم برامج واستمر حتى عام 2013 بعدها عمل في قناة هنا بغداد أربعة أعوام وخلال عمله في القناتين قدم واعد وأخرج اكثر من ٢٠ برنامج ضخم ومئات الساعات من التقارير واللقاءات والوثائقيات وقدم عدد من البرامج الترفيهية مثل برنامج القناع والمايكروفون الذهبي ونيادرتال وبيت بيوت وميد ان كوريا في كوريا الجنوبية وميد ان تركيا في تركيا وكانت برامج بميزانيات عالية وفي هنا بغداد كذلك قدم برامج كبيرة مثل الليلة الكبيرة والمعلم.

انتقل علي فاضل بعدها إلى البرامج الدرامية والمسلسلات وكانت أولى تجاربه برنامج علچ مي انتج خلاله ثلاثة مواسم سكتشات كوميدية شهدت بداية نجاح الفنان غسان إسماعيل وأثير كشكول واوس فاضل كممثلين كوميديين ومن بعدها قدم مسلسل تبسي كولا في رمضان ٢٠١٣ وچراوية في رمضان ٢٠١٥.`

const stats = [
  { value: '٦.٦ مليار', label: 'مشاهدة' },
  { value: '١٣.٥ م', label: 'مشترك' },
  { value: '+٦٠', label: 'عمل فني' },
  { value: '٢٠+', label: 'سنة خبرة' },
]

export default function Biography() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="biography" className="bg-black text-white relative overflow-hidden min-h-screen">
      <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-stretch gap-0 px-5">

        {/* TEXT SIDE */}
        <motion.div
          className="flex-1 flex flex-col justify-center py-20 lg:py-[120px] lg:pr-[60px] text-center lg:text-right"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="text-[13px] tracking-[4px] uppercase text-white/40 mb-4">
            السيرة الذاتية
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-4">
            علي فاضل
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-white/60 text-sm font-light">
            <span>مخرج</span>
            <span>·</span>
            <span>كاتب</span>
            <span>·</span>
            <span>ممثل</span>
            <span>·</span>
            <span>مقدم</span>
            <span>·</span>
            <span>منتج</span>
          </div>

          <div className="w-[50px] h-[1px] bg-white/20 my-7 mx-auto lg:mx-0" />

          <p className="text-white/70 text-sm leading-7 max-w-[500px] mx-auto lg:mx-0">
            {bioShort.split('\n\n').map((p, i) => (
              <span key={i}>
                {p}
                <br /><br />
              </span>
            ))}
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 border border-white/50 text-white/80 px-7 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition w-fit mx-auto lg:mx-0"
          >
            اقرأ السيرة الذاتية كاملة
          </button>

          {/* STATS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-right">
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/40">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          className="w-full lg:w-[45%] flex items-end justify-center relative"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <img
            src="/bio.png"
            alt="علي فاضل"
            className="max-h-[60vh] lg:max-h-[90vh] object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.05)]"
          />
        </motion.div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-start justify-center overflow-y-auto z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div className="bg-[#1b1a1a] w-full min-h-screen max-w-full">

            {/* header */}
            <div className="flex justify-end p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="text-white text-3xl"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <div className="px-5 pb-10">
              <div className="max-w-[900px] mx-auto">

                <h1 className="text-3xl md:text-5xl font-bold uppercase border-b border-white/10 pb-5 mb-8">
                  السيرة الذاتية
                </h1>

                <p className="text-white/80 text-base md:text-lg leading-8 whitespace-pre-line">
                  {bioFull}
                </p>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}