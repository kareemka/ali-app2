import Header, { MAIN_OFFSET_CLASS } from './components/Header'
import Showreel from './components/sections/Showreel'
import Biography from './components/sections/Biography'
import Filmography from './components/sections/Filmography'
import Commercials from './components/sections/Commercials'
import PressReleases from './components/sections/PressReleases'
// import LastSection from './components/sections/LastSection'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <main className={MAIN_OFFSET_CLASS}>
        <Showreel />
        <Biography />
        <Filmography />
        <Commercials />
        <PressReleases />
        {/* <LastSection /> */}
      </main>
      <Footer />
    </>
  )
}
