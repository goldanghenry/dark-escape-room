# 다크 심리학 — 방탈출 실험실

다크 심리학(다크 사이드 프로젝트) 독서모임을 위한 인터랙티브 웹 게임.

## 게임 소개

- 10개의 심리 실험실 (방탈출 컨셉)
- 각 방마다 현실적인 심리 조종 시나리오 + 4지선다
- Room 7에서 반전 — 당신이 조종자가 되는 시나리오
- 2개의 보너스 딜레마 주관식 방
- 최종 심리 프로파일 분석 + PNG 카드 저장

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. `package.json`의 `homepage` 값을 본인 GitHub 주소로 수정
   ```
   "homepage": "https://YOUR_USERNAME.github.io/dark-escape-room"
   ```

2. GitHub 레포를 만들고 push한 뒤:
   ```bash
   npm run deploy
   ```

3. GitHub 레포 Settings → Pages → Source: `gh-pages` branch 선택

## 기술 스택

- React + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- html2canvas
- gh-pages
