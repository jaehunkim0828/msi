export default function Arrowdown({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size ? size : "18"}
      height={size ? size : "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3338_26822)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.42873 7.21434C5.22649 7.21434 5.04418 7.33616 4.96679 7.523C4.8894 7.70983 4.93217 7.92489 5.07517 8.06789L8.6466 11.6393C8.84186 11.8346 9.15844 11.8346 9.35371 11.6393L12.9251 8.06789C13.0681 7.92489 13.1109 7.70983 13.0335 7.523C12.9561 7.33616 12.7738 7.21434 12.5716 7.21434L5.42873 7.21434Z"
          fill={color ? color : "#66748A"}
        />
      </g>
      <defs>
        <clipPath id="clip0_3338_26822">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
