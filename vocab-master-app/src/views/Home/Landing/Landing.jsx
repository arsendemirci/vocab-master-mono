import React from "react";
// import { useIPC } from "#hooks";
// import { useDispatch } from "react-redux";
// import { showLoader } from "#appSlice";
import styles from "./Landing.module.scss";

function Landing() {
  const clWrap = `${styles.wrapper}`;
  const clFeatures = `${styles.features}`;
  const clCard = `${styles.card}`;
  const clHead = `${styles.headline}`;
  return (
    <div className={clWrap}>
      <div className={clHead}>
        <h2>Vocab Master</h2>
        <p>
          Welcome to Vocab Master,
          <br /> You can try the quick game, if you want the perfect experience
          create your profile to keep your progress, watch your statistics and
          customize your game.
          <br />
          Many cool features waiting for you after you create your Vocab Master
          account and login.
        </p>
        <hr className={styles.hr} data-content="&#9830;"></hr>
      </div>

      <div className={clFeatures}>
        <div className={clCard}>
          <img src={require("../../../assets/images/brain.png").default} />
          <h3>Practice Makes Perfect</h3>
          <p>Practice in a way that you have fun and master the vocabulary.</p>
        </div>
        <div className={clCard}>
          <img src={require("../../../assets/images/graph.png").default} />
          <h3>Watch Your Progress</h3>
          <p>
            Keep up the progress , you can watch your statistics in Dashboard.
          </p>
        </div>
        <div className={clCard}>
          <img
            src={require("../../../assets/images/customization.png").default}
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

export default Landing;
