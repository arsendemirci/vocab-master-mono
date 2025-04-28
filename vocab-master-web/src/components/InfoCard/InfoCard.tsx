import style from "./InfoCard.module.scss";

const InfoCard = ({ infoMsg, title, titleImg }) => {
  return (
    <div className={style.infoCard}>
      <img src={titleImg} alt="check"></img>
      <h1>{title}</h1>
      <p>{infoMsg}</p>
    </div>
  );
};
export default InfoCard;
