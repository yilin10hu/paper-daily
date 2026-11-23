import { useState } from 'react';

const modes = [
  { label: '回到起点', moves: [0, 0], note: '起点：世界 B 的坐标是 A 的两倍，但两张图完全一样。' },
  { label: '按比例移动', moves: [10, 20], note: 'A 走 10 cm，B 走 20 cm：相机位移与世界一起变大，图像仍然一样。' },
  { label: '都走 10 cm', moves: [10, 10], note: '都走 10 cm：同样长的一步，在 B 的图像里只产生一半的像素位移。' },
] as const;

function ImagePlane({ world, scale, move }: { world: string; scale: number; move: number }) {
  const center = 200;
  // Pinhole camera translating only along its x axis, with f = 800 px.
  const project = (x: number, z: number) => Math.round(800 * (scale * x - move / 100) / (scale * z));
  const near = project(0.4, 2);
  const far = project(-0.8, 8);
  const signed = (value: number) => value < 0 ? `−${-value}` : `+${value}`;
  return <figure className="fr-scale-plane">
    <figcaption><strong>世界 {world}</strong><span>距起点 {move} cm</span></figcaption>
    <svg viewBox="0 0 400 122" aria-hidden="true" focusable="false">
      <path d="M20 30H380M20 61H380M20 92H380M40 16V106M120 16V106M280 16V106M360 16V106" fill="none" stroke="#40594b"/>
      <path d="M200 14V108" fill="none" stroke="#849786" strokeDasharray="3 5"/>
      <circle cx={center + near} cy="44" r="8" fill="#f0b287"/>
      <path d="M-8 0L0 -8 8 0 0 8Z" transform={`translate(${center + far} 78)`} fill="#bfd2a2"/>
    </svg>
    <p className="fr-scale-values"><span><i aria-hidden="true"/>近点 {signed(near)} px</span><span><i aria-hidden="true"/>远点 {signed(far)} px</span></p>
  </figure>;
}

export function ScaleExperiment() {
  const [modeIndex, setModeIndex] = useState(0);
  const { moves, note } = modes[modeIndex];
  return <section className="fr-scale" id="room-scale" aria-labelledby="room-scale-title">
    <div className="fr-section-label"><span>03 — 小实验</span><span>EXPERIMENT 002</span></div>
    <h2 id="room-scale-title">同一张图，两个世界</h2>
    <p className="fr-scale-lead">能从画面看出镜头走了几厘米吗？这里有两个世界。B 的坐标尺度是 A 的两倍：近点从 2 米变 4 米，远点从 8 米变 16 米，横向坐标也翻倍。</p>
    <div className="fr-scale-controls" role="group" aria-label="选择相机移动方式">
      {modes.map(({ label }, index) =>
        <button key={label} type="button" aria-pressed={modeIndex === index} onClick={() => setModeIndex(index)}>{label}</button>
      )}
    </div>
    <div className="fr-scale-results" aria-live="polite" aria-atomic="true">
      <div className="fr-scale-planes">
        <ImagePlane world="A" scale={1} move={moves[0]}/>
        <ImagePlane world="B" scale={2} move={moves[1]}/>
      </div>
      <p className="fr-scale-outcome">{note}</p>
    </div>
    <p className="fr-scale-foot">虚线是画面中心，有符号的数值是点到中心的水平像素偏移。两台虚拟相机焦距相同（800 px），只向右平移，不转动。针孔投影里，横向距离与深度若成比例放大，其比值就不变。要读出真实距离，还需要一个已知的尺度，比如测得的深度。</p>
  </section>;
}
