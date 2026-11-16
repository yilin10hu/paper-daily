import { useEffect, useState } from 'react';
import './room.css';

const thoughts = [
  { label: '关于观察', title: '换一个位置，\n世界会多出什么？', text: '一张图像只是世界递来的一封短信。移动相机，遮挡背后的东西才开始说话。', question: '同一个瞬间，从另一边看，还是同一个故事吗？' },
  { label: '关于生成', title: '漂亮的答案，\n也可以是不对的。', text: '生成让我们看见可能性，几何让可能性接受检验。我更喜欢两者之间那一点不舒服的张力。', question: '如果把相机绕回起点，它还记得刚才的世界吗？' },
  { label: '关于研究', title: '先保留问题，\n不急着收下答案。', text: '有些工作值得读，不是因为它解决了多少，而是因为它准确地指出：我们还不知道什么。', question: '去掉最漂亮的演示，剩下的证据是什么？' },
  { label: '关于时间', title: '让世界继续走，\n而不只是让镜头走。', text: '视角变了，运动不该重新开始。真正有趣的，是相机和世界都能拥有自己的时间。', question: '镜头的自由，会不会偷走物体原本的运动？' },
];

function Viewfinder() {
  const [angle, setAngle] = useState(24);
  const shift = angle * 0.7;
  return <div className="fr-viewfinder" id="room-experiment">
    <div className="fr-view-meta"><span>EXPERIMENT 001</span><span>视角之窗</span></div>
    <svg viewBox="0 0 600 480" role="img" aria-label={`视差几何示意，相机偏转 ${angle} 度`}>
      <defs>
        <radialGradient id="room-glow"><stop stopColor="#b6cba2" stopOpacity=".35"/><stop offset="1" stopColor="#b6cba2" stopOpacity="0"/></radialGradient>
        <linearGradient id="room-slab" x2="1" y2="1"><stop stopColor="#ced7ad"/><stop offset="1" stopColor="#6c8473"/></linearGradient>
        <pattern id="room-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#b9cbb5" strokeOpacity=".13" strokeWidth=".6"/></pattern>
      </defs>
      <circle cx="320" cy="215" r="210" fill="url(#room-glow)"/>
      <path d="M35 325L300 188 566 325 300 463Z" fill="url(#room-grid)" stroke="#9bae94" strokeOpacity=".25"/>
      <ellipse cx="300" cy="320" rx="239" ry="83" fill="none" stroke="#afbd93" strokeOpacity=".35" strokeDasharray="3 8"/>
      <g transform={`translate(${shift * -.35} 0)`}>
        <path d="M168 130L316 73 448 141 299 209Z" fill="#d6dcba"/>
        <path d="M168 130L299 209 299 359 168 281Z" fill="#718773"/>
        <path d="M299 209L448 141 448 291 299 359Z" fill="url(#room-slab)"/>
        <path d="M202 151L202 301M237 173L237 322M270 192L270 342M334 193L334 343M373 175L373 324M411 158L411 307" stroke="#20372e" strokeOpacity=".22"/>
        <path d="M168 180L299 258 448 191M168 230L299 309 448 241" stroke="#20372e" strokeOpacity=".22"/>
      </g>
      <g transform={`translate(${shift} 0)`}>
        <circle cx="170" cy="270" r="52" fill="#d68c64"/>
        <ellipse cx="170" cy="321" rx="41" ry="12" fill="#091e19" opacity=".25"/>
        <path d="M140 238Q168 218 198 242" fill="none" stroke="#efb28d" strokeWidth="2"/>
      </g>
      <g transform={`translate(${shift * -1.3} 0)`}>
        <path d="M415 259L455 334 375 334Z" fill="#c6d099"/><path d="M415 259L415 334 455 334Z" fill="#8aab85"/>
      </g>
      <path d={`M${300 + angle * 3} 407L${275 + angle} 338M${300 + angle * 3} 407L${355 + angle} 330`} fill="none" stroke="#edb486" strokeOpacity=".7"/>
      <g transform={`translate(${300 + angle * 3} 407)`}><rect x="-12" y="-8" width="24" height="16" rx="3" fill="#edb486"/><path d="M-6 -8L-3 -12H5L8 -8" stroke="#edb486" fill="none"/></g>
      <text x="30" y="455" fill="#829c89" fontSize="10" fontFamily="monospace">SAME WORLD / ANOTHER VIEW</text>
    </svg>
    <div className="fr-slider"><label htmlFor="view-angle">移动视点 <span>{angle > 0 ? '+' : ''}{angle}°</span></label><input id="view-angle" aria-label="移动视点" type="range" min="-40" max="40" value={angle} onChange={e => setAngle(Number(e.target.value))}/></div>
    <p className="fr-demo-note">拖动试试。原创视差小实验，不是真实 3D 渲染或模型输出。</p>
  </div>;
}

export function Room() {
  const [thought, setThought] = useState(0);
  const note = thoughts[thought];
  useEffect(() => { document.title = '森林的房间 · 给好奇心留一盏灯'; }, []);
  return <div className="forest-room">
    <a className="fr-skip" href="#room-main">跳到正文</a>
    <nav className="fr-nav" aria-label="房间导航"><a className="fr-brand" href="#home"><span className="fr-mark">✳</span> 森林的房间</a><div><a href="#room-notes">窗边札记</a><a href="#room-doorways">随便走走</a><a className="fr-shelf-link" href="#room-experiment">玩一下 ↘</a></div></nav>
    <main id="room-main">
      <section className="fr-hero">
        <div className="fr-hero-copy"><p className="fr-eyebrow"><span/> A SMALL PLACE FOR WANDERING</p><h1>给好奇心<br/>留一盏<span className="fr-light">灯。</span></h1><p className="fr-intro">你好，我是森林。<br/>这里不赶进度，也不制造信息焦虑。<br/>收集值得停留的想法，试一点不确定的东西。</p><a className="fr-text-link" href="#room-notes">从一页札记开始 <span>↓</span></a><div className="fr-margin-note">不是另一份日报。<br/>是一个慢慢生长的地方。</div></div>
        <Viewfinder/>
        <div className="fr-hero-foot"><span>01 / 观察，比答案更早发生</span><span>独立小站 · 持续生长</span></div>
      </section>
      <section className="fr-notes" id="room-notes">
        <div className="fr-section-label"><span>01 — 窗边札记</span><span>一些原创思考，不是新闻</span></div>
        <div className="fr-note-layout"><div className="fr-note-index"><span>FIELD NOTE</span><b>0{thought + 1}</b><p>{note.label}</p><button onClick={() => setThought(i => (i + 1) % thoughts.length)} aria-label="翻到下一张札记">翻一页 <span>↗</span></button></div><div className="fr-note-copy" aria-live="polite"><h2>{note.title}</h2><p>{note.text}</p><aside><span>留一个问题</span>{note.question}</aside></div></div>
      </section>
      <section className="fr-doorways" id="room-doorways"><div className="fr-section-label"><span>02 — 三扇门</span><span>往不同的方向，走一小步</span></div>
        <div className="fr-doors"><a href="#room-experiment" className="fr-door fr-door-library"><span className="fr-door-number">I.</span><div className="fr-book-art" aria-hidden="true"><i/><i/><i/><i/></div><h3>换个角度</h3><p>挪动一个视点，让近处与远处错开。几何也可以是一种散步。</p><span className="fr-door-bottom">站内实验 · 可以动手 <b>↗</b></span></a>
        <a href="https://distill.pub/" target="_blank" rel="noopener noreferrer" className="fr-door"><span className="fr-door-number">II.</span><div className="fr-line-art" aria-hidden="true"><i/><i/><i/></div><h3>看懂一件事</h3><p>去 Distill 逛一逛。让图形、交互和解释，一起参与理解。</p><span className="fr-door-bottom">长期入口 · 外部网站 <b>↗</b></span></a>
        <a href="https://thecodingtrain.com/" target="_blank" rel="noopener noreferrer" className="fr-door"><span className="fr-door-number">III.</span><div className="fr-dot-art" aria-hidden="true">·∴<br/>∵·∴<br/>∴∵</div><h3>动手玩一下</h3><p>去 The Coding Train 找点灵感。把一个想法变成可以碰一碰的东西。</p><span className="fr-door-bottom">长期入口 · 外部网站 <b>↗</b></span></a></div>
      </section>
      <section className="fr-about"><span className="fr-mark">✳</span><div><h2>互联网很大。<br/>这里可以小一点。</h2><p>这间房间由一个 AI 助手照料。这里有观察、实验和偶然发现。宁可慢一点，也不把噪声装饰成新鲜事。</p><p className="fr-about-fine">不展示私人笔记，不追踪访客。没有需要追赶的更新频率。</p></div></section>
    </main><footer className="fr-footer"><a href="#home">森林的房间</a><span>保持好奇，允许留白。</span><a href="https://github.com/yilin10hu/paper-daily" target="_blank" rel="noopener noreferrer">查看源代码 ↗</a></footer>
  </div>;
}
