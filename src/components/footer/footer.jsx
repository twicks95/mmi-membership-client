import Image from "next/image";
import footerStyles from "./footerStyles.module.css";

export default function footer() {
  return (
    <div
      className={`w-full absolute left-0 bottom-0 flex items-center justify-center ${footerStyles.container} ${footerStyles.background} ${footerStyles.text}`}
    >
      <Image src="/assets/svg/ellipse.svg" width={4} height={4} alt="" />
      <p className="mx-1 text-sm text-footer-main">MMIers Card</p>
      <Image src="/assets/svg/ellipse.svg" width={4} height={4} alt="" />
    </div>
  );
}
