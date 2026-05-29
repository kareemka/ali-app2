'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const bioShort = `علي فاضل خريج كلية الفنون الجميلة قسم المسرح فرع الإخراج عام ٢٠٠٥ مخرج وكاتب وممثل ومقدم بدأ مخرجا اثناء دراسته في كلية الفنون الجميلة تخرج أفلاما تجريبية ثم انتقل للعمل في القنوات دخل إلى قناة الشرقية عام 2005 كمخرج ثم عمل كمعد ومقدم برامج واستمر حتى عام 2013 بعدها عمل في قناة هنا بغداد أربعة أعوام وخلال عمله في القناتين قدم واعد وأخرج اكثر من ٢٠ برنامج ضخم ومئات الساعات من التقارير واللقاءات والوثائقيات وقدم عدد من البرامج الترفيهية مثل برنامج القناع والمايكروفون الذهبي ونيادرتال وبيت بيوت وميد ان كوريا في كوريا الجنوبية وميد ان تركيا في تركيا وكانت برامج بميزانيات عالية وفي هنا بغداد كذلك قدم برامج كبيرة مثل الليلة الكبيرة والمعلم .`

const bioMobileShort = `علي فاضل خريج كلية الفنون الجميلة قسم المسرح فرع الإخراج عام ٢٠٠٥ مخرج وكاتب وممثل ومقدم بدأ مخرجا اثناء دراسته في كلية الفنون الجميلة تخرج أفلاما تجريبية ثم انتقل للعمل في القنوات دخل إلى قناة الشرقية عام 2005 كمخرج ثم عمل كمعد ومقدم برامج واستمر حتى عام 2013 بعدها عمل في قناة هنا بغداد أربعة أعوام وخلال عمله في القناتين قدم واعد وأخرج اكثر من ٢٠ برنامج   .`

const bioDesktopShort = bioShort;
const bioFull = `علي فاضل خريج كلية الفنون الجميلة قسم المسرح فرع الإخراج عام ٢٠٠٥ مخرج وكاتب وممثل ومقدم بدأ مخرجا اثناء دراسته في كلية الفنون الجميلة تخرج أفلاما تجريبية ثم انتقل للعمل في القنوات دخل إلى قناة الشرقية عام 2005 كمخرج ثم عمل كمعد ومقدم برامج واستمر حتى عام 2013 بعدها عمل في قناة هنا بغداد أربعة أعوام وخلال عمله في القناتين قدم واعد وأخرج اكثر من ٢٠ برنامج ضخم ومئات الساعات من التقارير واللقاءات والوثائقيات وقدم عدد من البرامج الترفيهية مثل برنامج القناع والمايكروفون الذهبي ونيادرتال وبيت بيوت وميد ان كوريا في كوريا الجنوبية وميد ان تركيا في تركيا وكانت برامج بميزانيات عالية وفي هنا بغداد كذلك قدم برامج كبيرة مثل الليلة الكبيرة  والمعلم  .
انتقل علي فاضل بعدها إلى البرامج الدرامية والمسلسلات وكانت أولى تجاربه برنامج علچ مي انتج خلاله ثلاثة مواسم سكتشات كوميدية شهدت بداية نجاح الفنان غسان إسماعيل وأثير كشكول واوس فاضل كممثلين كوميديين ومن بعدها قدم مسلسل تبسي كولا في رمضان ٢٠١٣ وچراوية في رمضان ٢٠١٥ ومن بعدها قدم اشهر أعماله وأكثرها انتشارا (برنامج ولاية بطيخ) الذي نقل اسمه نقلة نوعية وغير مسيرته الفنية بالكامل البرنامج الكوميدي الأشهر في تاريخ العراق والذي استمرّ لعشرة مواسم على مدار عشرة أعوام حتى اطفىء أضوائه واختتم مشواره في ديسمبر من عام ٢٠٢٤  وكان البرنامج سببا في استقالته من العمل في القنوات الفضائية وفتح شركة خيال الظل للإنتاج الفني في عام ٢٠١٧ وقدم خلالها مجموعة من اهم الأعمال الدرامية كمخرج ومنتج ومؤلف 
ولاية بطيخ من الموسم الثالث حتى العاشر مخرجا ومؤلفا ومنتجا
بطيخيات ثلاثة مواسم ٢٠١٦ مخرجا وكاتبا ومنتجا
زيدان المليان ٢٠١٨ مخرجا ومنتجا
افتح يا بستم ٢٠١٨ مخرجا ومنتجا 
ايام الإجازة الجزء الثاني ٢٠١٩ مخرجا ومنتجا 
برنامج حچي زايد ٢٠١٩ منتجا
بنج عام الجزء الاول ٢٠٢٠ مخرجا وكاتبا ومنتجا
تسجيل خروج ٢٠٢٠ مخرجا ومنتجا 
برنامج دوشيش ٢٠٢٠ منتجا
بنج عام الجزء الثاني ٢٠٢١ منتجا 
بث مباشر ٢٠٢٢ منتجا
برنامج نجوم على نار ٢٠٢٢ منتجا
شارع الأميرات ٢٠٢٣ منتجا 
برنامج نجوم على نار ٢ ٢٠٢٣ منتجا
غيد ٢٠٢٣ مخرجا وكاتبا ومنتجا
بودكاست شي منسي منتجا
العائلة إكس ٢٠٢٤ مخرجا وكاتبا ومنتجا
عفو عام ٢٠٢٥ منتجا
لم الشمل ٢٠٢٥ مخرجا وكاتبا ومنتجا
برنامج تك گول ٢٠٢٥مقدما ومنتجا
عشرين مسلسل على منصة اوكي شورت دراما ٢٠٢٥ منتجا
بدل تالف ٢٠٢٦ منتجا
يحيى ٢٠٢٦ منتجا
٩ ملم ٢٠٢٦ منتجا
بودكاست المحقق منتجا
برنامج طگة ٢٠٢٦ منتجا
ليل البنفسج ٢٠٢٦ مخرجا ومنتجا
موقع برنامج ولاية بطيخ ورغم توقف البرنامج قبل سنوات مازال الأعلى محليا وعربيا حصلت على درع اليوتيوب الذهبي والماسي ومشتركيها ثلاثة عشر ونصف مليون مشترك، وأكثر من ستة مليارات وستمائة مليون مشاهدة .
حاصل على جائزة افضل مقدم برامج من مهرجان كلية الإعلام ٢٠١٨ وأفضل مخرج دراما في العراق لأربع مرات في خمس سنوات وجوائز تكريمية من كل المهرجانات العراقية المرموقة .
يملك علي فاضل تجارب ومشاركات إنتاجية سينمائية ومسرحية ايضا ومشاركات في مهرجانات سينمائية وإعلامية إقليمية وعربية 
وبعد ان انتج وشارك في صناعة ما يقارب ستين برنامج ومسلسل خلال ٩ سنوات من عمر شركته الخاصة يستمر علي فاضل بعمله للسنوات القادمة .`

export default function Biography() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section
      id="biography"
      className="relative bg-black text-white overflow-hidden min-h-screen"
    >

      <div className="relative w-full min-h-screen">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="
            absolute top-0 left-0 bottom-0
            w-[45%] sm:w-[45%] md:w-[55%]
            h-screen sm:h-full
          "
        >
          {/* SOFT GRADIENT BLEND */}
          <div
            className="absolute inset-y-0 right-0 z-10 w-24 md:w-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0))',
            }}
          />

          <img
            src="/bio.png"
            alt="علي فاضل"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 30%',
            }}
          />
        </motion.div>

        {/* TEXT */}
        <div
          className="
            absolute top-0 right-0 bottom-0 flex flex-col justify-center
            w-[70%] sm:w-[55%] md:w-[50%]
            px-3 md:px-[60px] pb-10 md:pb-[60px]
          "
        >
          {/* optional soft overlay for readability */}
          <div className="absolute inset-0 md:hidden  pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative z-10"
          >
            <h1
              className="font-bold uppercase mb-2 sm:mb-6 tracking-widest text-right"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 4.5rem)',
                letterSpacing: '0.15em',
              }}
            >
              السيرة الذاتية
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="text-white leading-8 mb-8 text-right"
                style={{
                  fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                  direction: 'rtl',
                }}
              >
                <span className="block md:hidden">
                  {bioMobileShort}
                </span>

                <span className="hidden md:block">
                  {bioDesktopShort}
                </span>
              </p>

              <div className="text-right">
                <button
                  onClick={() => setModalOpen(true)}
                  className="border border-white/40 hover:bg-white hover:text-black transition"
                  style={{
                    padding: '10px 24px',
                    fontSize: '0.7rem',
                    letterSpacing: '3px',
                  }}
                >
                  أقرأ المزيد
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div className="min-h-screen bg-[#111] text-white">
            <div className="flex justify-start p-6">
              <button
                onClick={() => setModalOpen(false)}
                className="text-4xl"
              >
                ×
              </button>
            </div>

            <div className="max-w-[900px] mx-auto px-6 pb-24" dir="rtl">
              <h1 className="text-4xl md:text-5xl font-bold mb-10 uppercase tracking-widest">
                السيرة الذاتية
              </h1>

              <p className="text-white/80 leading-9 text-sm md:text-base">
                {bioFull}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}