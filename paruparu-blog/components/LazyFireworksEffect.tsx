import dynamic from "next/dynamic";

const FireworksEffect = dynamic(() => import("./FireworksEffect"), {
  loading: () => null,
  ssr: false,
});

export default FireworksEffect;
