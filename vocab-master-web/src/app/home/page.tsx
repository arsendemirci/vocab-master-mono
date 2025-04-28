"use client";
import styles from "./page.module.scss";
import { AppButton } from "@/components";
import Image from "next/image";
import { apiRoutes } from "@/lib/router";
import { ApiResponse } from "@/types";

export default function Home() {
  const clWrap: string = `${styles.wrapper}`;
  const clFeatures: string = `${styles.features}`;
  const clCard: string = `${styles.card}`;
  const clHead: string = `${styles.headline}`;
  const handleStartSeed = () => {
    try {
      const res: any = apiRoutes.SEED_DATA.call();
      console.log(res.message);
    } catch (err) {
      console.error("Error seeding words:", err);
    }
  };
  return (
    <div className={clWrap}>
      <div className={clHead}>
        <h2>Vocab Master</h2>
        <AppButton onClick={handleStartSeed}>Start Seeding</AppButton>
        <p>
          Welcome to Vocab Master,
          <br /> You can try the quick game, if you want the perfect experience
          create your profile to keep your progress, watch your statistics and
          customize your game.
          <br /> Many cool features waiting for you after you create your Vocab
          Master account and login.
        </p>
        <hr className={styles.hr} data-content="&#9830;" />
      </div>
      <div className={clFeatures}>
        <div className={clCard}>
          <Image
            src={require("../../assets/images/brain.png").default}
            alt="brain"
          />
          <h3>Practice Makes Perfect</h3>
          <p>Practice in a way that you have fun and master the vocabulary</p>
        </div>
        <div className={clCard}>
          <Image
            src={require("../../assets/images/graph.png").default}
            alt="graph"
          />
          <h3>Watch Your Progress</h3>
          <p>
            Keep up the progress , you can watch your statistics in Dashboard.{" "}
          </p>
        </div>
        <div className={clCard}>
          <Image
            src={require("../../assets/images/customization.png").default}
            alt="customization"
          />
          <h3>Customize Your Experience</h3>
          <p>
            You can create and manage your own vocabulary lists and customize
            the game according to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
