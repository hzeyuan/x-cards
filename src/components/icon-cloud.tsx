"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  type ICloud,
  type SimpleIcon,
} from "react-icon-cloud";



export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};


export const renderCustomIcon = (iconOrDomain: SimpleIcon | string, theme: string) => {
  const size = 42; // 你可以根据需要调整这个值
  let imgSrc: string;
  let title: string;
  imgSrc = `https://api.iowen.cn/favicon/${iconOrDomain}.png`;
  title = iconOrDomain;

  return (
    <a
      key={title}
      title={title}
      href={`https://${iconOrDomain}`}
      target="_blank"
      style={{ cursor: 'pointer' }}
      onClick={(e) => e.preventDefault()}
    >
      <img
        loading="lazy"
        src={imgSrc}
        alt={title}
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
    </a>
  );
};

export type DynamicCloudProps = {
  customDomains?: string[];
};


export default function IconCloud({ customDomains = [] }: DynamicCloudProps) {
  const { theme } = useTheme();
  const renderedIcons = useMemo(() => {

    const customIcons = customDomains.map((domain) =>
      renderCustomIcon(domain, theme || "light")
    );

    return [...customIcons];
  }, [customDomains, theme]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}