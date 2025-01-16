const IconPng = ({ name, size }) => {
  const src = `/assets/images/icon/${name}.png`;
  const widthHeight = size ? `${size}px` : "48px";
  return <img src={src} width={widthHeight} height={widthHeight}></img>;
};
export default IconPng;
