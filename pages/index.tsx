import type { NextPage } from "next"
import Head from "next/head"

import Section from "../components/Section/Section"
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
                </div>

                <Section color={"#14191f"} divider={"mountains"}>
                    <div className={styles.tech}>HTML</div>
                    <div className={styles.tech}>JS</div>
                    <div className={styles.tech}>CSS</div>
                    <div className={styles.tech}>React</div>
                </Section>

                <Section color={"rgb(73, 67, 67)"}>
                    <div className={styles.tech}>HTML</div>
                    <div className={styles.tech}>JS</div>
                    <div className={styles.tech}>CSS</div>
                    <div className={styles.tech}>React</div>
                </Section>

                <Section color={"rgb(241, 157, 69)"} divider={"bezier"}>
                    <div className={styles.tech}>HTML</div>
                    <div className={styles.tech}>JS</div>
                    <div className={styles.tech}>CSS</div>
                    <div className={styles.tech}>React</div>
                </Section>

                <Section color={"#14191f"} divider={"bezier"}>
                    <div className={styles.tech}>HTML</div>
                    <div className={styles.tech}>JS</div>
                    <div className={styles.tech}>CSS</div>
                    <div className={styles.tech}>React</div>
                </Section>
            </div>
        </div>
    )
}

export default Home
