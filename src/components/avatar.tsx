import Avatar from "@mui/material/Avatar";
import tinycolor from "tinycolor2";
import stringToColor from "string-to-color";

export function LetterAvatar(props: Props) {
  const letter = getFirstLetterFromString(props.value).toUpperCase();
  const bgColor = stringToColor(props.value);
  const textColor = getContrastTextColor(bgColor);
  return <Avatar sx={{ bgcolor: bgColor, color: textColor }}>{letter}</Avatar>;
}

interface Props {
  value: string;
}

function getContrastTextColor(bgColor: string) {
  const textColor = tinycolor.mostReadable(bgColor, ["#000000", "#ffffff"], {
    includeFallbackColors: true,
    level: "AAA",
    size: "small",
  });
  return textColor.toHexString();
}

function getFirstLetterFromString(str: string, fallback?: string): string {
  const trimmedStr = (str || "").replace(/[^a-zA-Z]/g, "");
  const lastChar = trimmedStr.charAt(0);

  if (!lastChar) {
    return fallback || "A";
  }

  return lastChar;
}
