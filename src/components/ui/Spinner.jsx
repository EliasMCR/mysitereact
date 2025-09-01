/**
 * Spinner
 *
 * Props:
 * - size: tamanho em px (default: 32)
 * - color: cor do traço (default: "#2563eb" -> azul tailwind-600)
 * - speed: duração da rotação em segundos (default: 1)
 * - ariaLabel: acessibilidade (default: "Carregando")
 */
export const Spinner = ({
  size = 32,
  color = "#2563eb",
  speed = 1,
  ariaLabel = "Carregando",
}) => {
  return (
    <svg
      role="status"
      aria-label={ariaLabel}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: `spin ${speed}s linear infinite`,
      }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </svg>
  );
};
