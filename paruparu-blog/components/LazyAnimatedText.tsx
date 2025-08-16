import dynamic from "next/dynamic";

const AnimatedText = dynamic(() => import("./animation/AnimatedText"), {
  loading: () => (
    <div className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-wider">
      パルムの成長日記
    </div>
  ),
  ssr: false,
});

export default AnimatedText;
