import Image from "next/image";
import cardTierStyles from "./cardTierStyles.module.css";

export default function cardTier({ membershipType = "", currentPoint = null }) {
  return (
    <div
      className={`
        ${cardTierStyles.container} 
        ${
          membershipType.toLowerCase() === "silver"
            ? cardTierStyles.cardSilver
            : membershipType.toLowerCase() === "gold"
            ? cardTierStyles.cardGold
            : membershipType.toLowerCase() === "platinum"
            ? cardTierStyles.cardPlatinum
            : cardTierStyles.cardDiamond
        }`}
    >
      <div className={`flex justify-between px-6 py-5`}>
        <div className="w-full">
          <span
            className={`${cardTierStyles.tierName} ${cardTierStyles.pointsText}`}
          >
            {membershipType}
          </span>
          <div className="flex">
            <span
              className={`mr-4 ${cardTierStyles.pointsNumber}`}
              style={{ lineHeight: "2.5rem" }}
            >
              {currentPoint}
            </span>
            <span className="self-end">points</span>
          </div>
        </div>
        <div className="self-center">
          {membershipType.toLowerCase() === "silver" ? (
            <Image
              src="/assets/svg/silver.svg"
              height={52}
              width={52}
              alt="diamond"
            />
          ) : membershipType.toLowerCase() === "gold" ? (
            <Image
              src="/assets/svg/crown.svg"
              height={52}
              width={52}
              alt="diamond"
            />
          ) : membershipType.toLowerCase() === "platinum" ? (
            <Image
              src="/assets/svg/trophy.svg"
              height={52}
              width={52}
              alt="diamond"
            />
          ) : (
            <Image
              src="/assets/svg/diamond.svg"
              height={52}
              width={52}
              alt="diamond"
            />
          )}
        </div>
      </div>
    </div>
  );
}
