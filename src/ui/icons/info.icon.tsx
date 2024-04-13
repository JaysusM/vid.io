interface InfoIconProps {
  size: string;
  className?: string;
  color?: string;
}

const InfoIcon = ({ size, className, color = "#000000" }: InfoIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#000000"
        stroke-width="1.5"
      ></circle>
      <path
        d="M12 17V11"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
      ></path>
      <circle
        cx="1"
        cy="1"
        r="1"
        transform="matrix(1 0 0 -1 11 9)"
        fill="#000000"
      ></circle>
    </g>
  </svg>
);

export default InfoIcon;
