interface Props {
  size?: "sm" | "md" | "lg";
  /** trueにすると画像ファイル(public/logo.png)を使用 */
  useImage?: boolean;
}

export default function Logo({ size = "md", useImage = false }: Props) {
  const sizes = { sm: 80, md: 120, lg: 200 };
  const w = sizes[size];
  const h = w * 0.52;

  if (useImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/logo.png" alt="A to B" width={w} height={h} style={{ objectFit: "contain" }} />;
  }

  // SVG: ロゴ画像に合わせた再現
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 240 125"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="A to B"
    >
      {/* A */}
      <text
        x="4" y="110"
        fontFamily="Playfair Display, Georgia, serif"
        fontWeight="900"
        fontSize="96"
        fill="#1c1917"
        letterSpacing="-2"
      >A</text>

      {/* B */}
      <text
        x="170" y="110"
        fontFamily="Playfair Display, Georgia, serif"
        fontWeight="900"
        fontSize="96"
        fill="#1c1917"
        letterSpacing="-2"
      >B</text>

      {/* to */}
      <text
        x="120" y="100"
        fontFamily="DM Sans, system-ui, sans-serif"
        fontWeight="500"
        fontSize="18"
        fill="#1c1917"
        textAnchor="middle"
      >to</text>

      {/* アーク（A の底部から B へ） */}
      <path
        d="M 52 92 Q 120 18 194 88"
        stroke="#e8503a"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* スタートドット */}
      <circle cx="52" cy="92" r="4.5" fill="#e8503a" />

      {/* エンド矢印 */}
      <polygon
        points="194,82 203,90 193,96"
        fill="#e8503a"
      />

      {/* サウンドウェーブ（アーク頂点付近） */}
      <g transform="translate(105, 28)" fill="#e8503a">
        <rect x="0"  y="10" width="3" height="9"  rx="1.5" />
        <rect x="6"  y="5"  width="3" height="16" rx="1.5" />
        <rect x="12" y="1"  width="3" height="20" rx="1.5" />
        <rect x="18" y="5"  width="3" height="16" rx="1.5" />
        <rect x="24" y="10" width="3" height="9"  rx="1.5" />
      </g>
    </svg>
  );
}
