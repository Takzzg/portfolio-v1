import type { NextPage } from "next"
import Head from "next/head"

import Moutains from "../components/Mountains/Moutains"
import styles from "../styles/pages/Home.module.scss"

const Home: NextPage = () => {
    return (
        <div className={styles.home}>
            <Head>
                <title>Guido Queiroz</title>
                <meta name="description" content="Guido Queiroz's Portfolio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.mainCont}>
                <div className={styles.mainTitle}>
                    <div className={`${styles.textAccent} ${styles.firstLine}`}>
                        Hello.
                    </div>
                    <div className={styles.secondLine}>I&apos;m Guido</div>
                    <div className={styles.thirdLine}>A web developer</div>

                    <Moutains />
                </div>

                <div
                    className={styles.technologies}
                    style={{ backgroundColor: "#14191f" }}
                >
                    <div className={styles.tech}>HTML</div>
                    <div className={styles.tech}>JS</div>
                    <div className={styles.tech}>CSS</div>
                    <div className={styles.tech}>React</div>
                </div>
            </div>
        </div>
    )
}

export default Home
