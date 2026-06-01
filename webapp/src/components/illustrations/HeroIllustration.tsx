export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 背景の円 */}
      <circle cx="260" cy="180" r="150" fill="#fff5f3" />

      {/* 人物 — アーティスト */}
      {/* 体 */}
      <rect x="220" y="195" width="40" height="80" rx="20" fill="#1c1917" />
      {/* 頭 */}
      <circle cx="240" cy="175" r="28" fill="#f4c5a0" />
      {/* 髪 */}
      <ellipse cx="240" cy="156" rx="22" ry="14" fill="#1c1917" />
      {/* 左腕 */}
      <rect x="192" y="200" width="30" height="14" rx="7" fill="#1c1917" transform="rotate(-30 192 200)" />
      {/* 右腕（楽器を持つ） */}
      <rect x="258" y="200" width="32" height="14" rx="7" fill="#1c1917" transform="rotate(25 258 200)" />

      {/* ギター */}
      <ellipse cx="310" cy="230" rx="22" ry="28" fill="#e8503a" opacity="0.9" />
      <ellipse cx="310" cy="230" rx="10" ry="12" fill="#c73b27" />
      <rect x="307" y="175" width="6" height="60" rx="3" fill="#e8503a" />
      <line x1="296" y1="220" x2="324" y2="220" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
      <line x1="296" y1="228" x2="324" y2="228" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
      <line x1="296" y1="236" x2="324" y2="236" stroke="#fff" strokeWidth="1.5" opacity="0.7" />

      {/* 音符 */}
      <text x="355" y="165" fontSize="22" fill="#e8503a" opacity="0.8">♪</text>
      <text x="340" y="135" fontSize="16" fill="#e8503a" opacity="0.5">♫</text>
      <text x="370" y="195" fontSize="14" fill="#e8503a" opacity="0.6">♩</text>

      {/* ステージ */}
      <ellipse cx="240" cy="295" rx="130" ry="18" fill="#e8503a" opacity="0.12" />

      {/* 観客（小さい人たち） */}
      {[[90, 260], [130, 255], [160, 260], [330, 255], [360, 260], [395, 258]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y - 14} r="9" fill="#1c1917" opacity="0.15" />
          <rect x={x - 7} y={y} width="14" height="22" rx="7" fill="#1c1917" opacity="0.15" />
        </g>
      ))}

      {/* サウンドウェーブ装飾 */}
      <g transform="translate(65, 140)" opacity="0.3">
        {[0, 8, 16, 24, 32].map((x, i) => (
          <rect key={i} x={x} y={[4, 0, -4, 0, 4][i]} width="5" height={[12, 20, 26, 20, 12][i]} rx="2.5" fill="#e8503a" />
        ))}
      </g>

      {/* プラットフォームロゴ風バッジ */}
      {[
        { x: 50, y: 80, label: "CAMPFIRE" },
        { x: 368, y: 100, label: "Bandcamp" },
        { x: 42, y: 220, label: "ENjiNE" },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect x={x} y={y} width={label.length * 7.5 + 16} height="24" rx="12" fill="white" stroke="#e8503a" strokeWidth="1.5" opacity="0.7" />
          <text x={x + 8} y={y + 16} fontSize="10" fill="#e8503a" fontWeight="600" fontFamily="sans-serif">{label}</text>
        </g>
      ))}

      {/* アーク装飾（ロゴモチーフ） */}
      <path
        d="M 60 310 Q 240 200 420 310"
        stroke="#e8503a"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6,4"
        opacity="0.25"
      />
    </svg>
  );
}
