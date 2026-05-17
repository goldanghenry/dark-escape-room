export interface Choice {
  label: string
  scores: {
    awareness: number
    assertion: number
    empathy: number
    strategy: number
  }
}

export interface Room {
  id: number
  title: string
  tag: string
  atmosphere?: string
  situation: string[]
  prompt?: string
  choices: Choice[]
  systemComment: string
}

export const ROOMS: Room[] = [
  // ── Room 1 ─────────────────────────────────────────
  {
    id: 1,
    title: '한정판',
    tag: '희소성 / 충동 구매 / 선택 지연',
    atmosphere: '휴대폰 화면 — 빨간 타이머가 깜빡인다',
    situation: [
      '자주 쓰는 쇼핑 앱에서 푸시 알림이 울린다.',
      '"지금 이 상품을 3명이 보고 있어요. 재고 2개. ⏱ 마감 08:47"',
      '겨울 패딩. 12만 원. 30% 할인. 마음에 들긴 했다.',
      '근데 당장 필요한 건 아니었다. 손가락이 결제 버튼 위에서 멈춘다.',
      '스크린샷 폴더를 열어보니, 같은 상품 "마감 임박" 알림이 이번 달만 세 장.',
    ],
    prompt: '지금 이 순간, 당신은 어떻게 하겠습니까?',
    choices: [
      {
        label: 'A.  결제 버튼을 누른다. 어차피 살 거였고, 품절되면 더 아쉬우니까.',
        scores: { awareness: 0, assertion: 0, empathy: 1, strategy: 0 },
      },
      {
        label: 'B.  장바구니에만 담아두고 화면을 끈다. 아직은 흔들리지만 바로 사지는 않는다.',
        scores: { awareness: 1, assertion: 1, empathy: 0, strategy: 1 },
      },
      {
        label: 'C.  알림을 끄고 앱을 닫는다. 내일 다시 본다. 그때도 있으면 그때 산다.',
        scores: { awareness: 2, assertion: 2, empathy: 0, strategy: 1 },
      },
      {
        label: 'D.  다른 쇼핑몰에 비슷한 제품의 가격과 리뷰를 비교한다.',
        scores: { awareness: 2, assertion: 1, empathy: 0, strategy: 2 },
      },
    ],
    systemComment:
      '제한된 시간과 재고 표시는 판단을 빠르게 만든다. 빠른 선택이 항상 나쁜 것은 아니지만, 누가 그 속도에서 이익을 얻는지는 살펴볼 필요가 있다.',
  },

  // ── Room 2 ─────────────────────────────────────────
  {
    id: 2,
    title: '너밖에 없어',
    tag: '인정욕구 / 책임 전가 / 조직 내 경계',
    atmosphere: '금요일 17:55 — 사무실 형광등만 켜져 있다',
    situation: [
      '퇴근 준비를 하던 순간, 팀장이 자리로 다가온다.',
      '"이건 {name}씨가 제일 잘 알아서 부탁하고 싶어요."',
      '"월요일 오전까지 한 번만 정리해줄 수 있을까요?"',
      '순간 인정받는 기분이 든다.',
      '그런데 옆자리 동료가 작게 말한다.',
      '"나도 지난달에 같은 말 들었어."',
    ],
    prompt: '당신은 어떻게 대응하겠습니까?',
    choices: [
      {
        label: 'A.  "알겠습니다"라고 답한다. 이번 요청을 통해 신뢰를 쌓는 것도 나쁘지 않다고 생각한다.',
        scores: { awareness: 0, assertion: 0, empathy: 2, strategy: 1 },
      },
      {
        label: 'B.  이번에는 수락하되, 다음에는 일정과 우선순위를 미리 공유해달라고 이야기한다.',
        scores: { awareness: 2, assertion: 2, empathy: 2, strategy: 2 },
      },
      {
        label: 'C.  "이번 주말은 어렵습니다"라고 말하고, 월요일 오전 중 가능한 범위를 제안한다.',
        scores: { awareness: 2, assertion: 3, empathy: 2, strategy: 2 },
      },
      {
        label: 'D.  "최근 비슷한 요청이 반복되는 것 같습니다"라고 말하며 업무 방식 자체를 논의한다.',
        scores: { awareness: 3, assertion: 3, empathy: 1, strategy: 2 },
      },
    ],
    systemComment:
      '칭찬은 동기부여가 되기도 하고, 부담을 떠넘기는 방식이 되기도 한다. 중요한 것은 요청의 빈도와 구조다.',
  },

  // ── Room 3 ─────────────────────────────────────────
  {
    id: 3,
    title: '좋아요 2개',
    tag: '인정욕구 / SNS 피로 / 관계 해석',
    atmosphere: '밤 11시 — 침대에서 피드만 스크롤한다',
    situation: [
      '오늘 올린 글—오랜만에 공유한 소식—에 좋아요가 두 개뿐이다.',
      '친한 친구 B는 분명 접속 중이었다. 다른 사람 글에는 좋아요를 남겼다.',
      '내 글에는 반응이 없었다. 읽었는지도 모르겠다.',
      '방금 B가 새 게시물을 올렸다. 즐거운 주말 사진, 댓글도 달리고 있다.',
      '손가락이 B의 새 글 위에서 멈춘다.',
    ],
    prompt: 'B의 새 게시물을 보는 지금, 당신은?',
    choices: [
      {
        label: 'A.  지금은 감정이 섞여 있다고 느껴져, B 글에 반응하지 않고 SNS를 끈다.',
        scores: { awareness: 2, assertion: 1, empathy: 1, strategy: 2 },
      },
      {
        label: 'B.  내 글 반응과는 별개로, 평소처럼 B의 새 글에 좋아요를 누른다.',
        scores: { awareness: 1, assertion: 0, empathy: 2, strategy: 1 },
      },
      {
        label: 'C.  B가 내 글을 봤는지 확인하려, 프로필·조회 목록을 몇 번 더 들여다본다.',
        scores: { awareness: 2, assertion: 0, empathy: 1, strategy: 1 },
      },
      {
        label: 'D.  나중에 만나거나 연락해서, "요즘 SNS에서 거리감 느꼈다"고 이야기해본다.',
        scores: { awareness: 2, assertion: 2, empathy: 3, strategy: 2 },
      },
    ],
    systemComment:
      '반응의 유무는 관계의 전부가 아니다. 다만 "내 글은 무시, 남 글은 반응" 같은 패턴은 인정욕구를 건드리기 쉽다—지금 무엇을 하느냐가 토론 포인트다.',
  },

  // ── Room 4 ─────────────────────────────────────────
  {
    id: 4,
    title: '오랜 친구',
    tag: '관계적 부탁 / 경계 설정 / 감정 비용',
    atmosphere: '카톡 알림 — 두 달 만의 프로필 사진',
    situation: [
      '대학 동기 민수. 두 달 만에 카톡이 왔다.',
      '"나 요즘 진짜 힘들어. 아무한테도 말 못 했는데 너한테만 말하는 거야."',
      '이직 실패, 부모님 병원비. 한 시간 넘게 통화했다. 공감해줬다. 마음이 쓰인다.',
      '끊기 직전, 민수가 조심스럽게 말한다.',
      '"그리고... 돈이 좀 필요한데. 100만 원만 빌려줄 수 있어?"',
      '기억을 더듬어보니 3년 전에도 50만 원. 갚은 적은 없다.',
    ],
    prompt: '민수의 마지막 메시지 앞에서, 당신은?',
    choices: [
      {
        label: 'A.  "그래, 보내줄게" 한다. 친구가 힘든 건 사실이니까.',
        scores: { awareness: 0, assertion: 0, empathy: 3, strategy: 0 },
      },
      {
        label: 'B.  30만 원만 보내며 "나도 여유가 많지 않아"라고 말한다.',
        scores: { awareness: 1, assertion: 1, empathy: 2, strategy: 1 },
      },
      {
        label: 'C.  돈은 거절하고, 구직 사이트나 지원 제도를 같이 찾아준다.',
        scores: { awareness: 2, assertion: 2, empathy: 3, strategy: 2 },
      },
      {
        label: 'D.  돈은 어렵다고 말하고, "요즘 중요한 얘기가 돈 문제로 이어지는 것 같아"라고 조심스럽게 꺼낸다.',
        scores: { awareness: 3, assertion: 2, empathy: 2, strategy: 2 },
      },
    ],
    systemComment:
      '힘든 사람을 돕고 싶은 마음은 자연스럽다. 다만 반복되는 요청에서는 관계를 지키기 위한 기준도 함께 필요하다.',
  },

  // ── Room 5 ─────────────────────────────────────────
  {
    id: 5,
    title: '침묵의 방',
    tag: '침묵 / 갈등 회피 / 감정 압박',
    atmosphere: '조용한 카페 — 커피잔만 천천히 돌아간다',
    situation: [
      '어제 밤, 연인과 크게 다퉜다. 잘못은 반반쯤이었다.',
      '오늘 아침 내가 먼저 연락했다. "얘기하자."',
      '카페 구석자리. 연인은 커피만 돌리고 창밖만 본다.',
      '5분이 지났다. 10분이 지났다.',
      '시간이 길어질수록 불편함이 커진다.',
      '침묵이 단순한 정리 시간인지, 압박인지 헷갈리기 시작한다.',
    ],
    prompt: '당신은 어떤 선택을 하겠습니까?',
    choices: [
      {
        label: 'A.  먼저 사과하며 분위기를 풀어보려 한다.',
        scores: { awareness: 0, assertion: 1, empathy: 2, strategy: 0 },
      },
      {
        label: 'B.  상대가 생각을 정리할 시간을 주며 기다린다.',
        scores: { awareness: 1, assertion: 1, empathy: 2, strategy: 1 },
      },
      {
        label: 'C.  "지금 어떤 마음인지 말해줄 수 있어?"라고 직접 묻는다.',
        scores: { awareness: 2, assertion: 2, empathy: 3, strategy: 2 },
      },
      {
        label: 'D.  오늘은 대화가 어렵다고 판단하고, 시간을 두고 다시 이야기하자고 제안한다.',
        scores: { awareness: 2, assertion: 2, empathy: 2, strategy: 3 },
      },
    ],
    systemComment:
      '침묵은 회복의 시간이 되기도 하고, 상대를 압박하는 방식이 되기도 한다. 맥락을 읽는 것이 중요하다.',
  },

  // ── Room 6 ─────────────────────────────────────────
  {
    id: 6,
    title: '황금 감옥',
    tag: '앵커링 / 가치 폄하 / 가스라이팅',
    atmosphere: '인사팀 작은 회의실 — 은은한 클래식 음악, 낮은 목소리',
    situation: [
      '이직 제안을 받은 상태에서 불려간 잔류 협상(Retention) 자리.',
      '인사 담당자가 차를 권하며 말한다. "밖은 춥잖아요. {name}씨를 제대로 이해해 줄 곳이 또 있을까요?"',
      '이어지는 제안. "회사 규정상 밴드가 4,200~4,800이에요. {name}씨는 특별히 최고치인 4,800을 맞춰볼게요."',
      '나는 이미 시장 평균이 5,200임을 알고 있고, 이직 제안은 그 이상이다.',
      '담당자는 "돈보다 중요한 건 소속감"이라며, 내가 가진 외부 정보를 "불확실한 도박"으로 치부한다.',
    ],
    prompt: '상대가 친 울타리(4,800) 안에서, 당신은 어떤 말을 꺼내겠습니까?',
    choices: [
      {
        label: 'A. "배려해 주셔서 감사합니다." 회사가 제안한 최고치를 받는다.',
        scores: { awareness: 0, assertion: 1, empathy: 2, strategy: 0 },
      },
      {
        label: 'B. "생각해 본 적 없는 금액이라 당황스럽네요." 확답을 피하고 자리를 마무리한다.',
        scores: { awareness: 1, assertion: 1, empathy: 0, strategy: 2 },
      },
      {
        label: 'C. "이직 제안은 5,500입니다. 그 이하면 남을 이유가 없습니다." 숫자로 맞불을 놓는다.',
        scores: { awareness: 2, assertion: 3, empathy: 0, strategy: 2 },
      },
      {
        label: 'D. "그 밴드가 현재 시장 가치를 반영하고 있다고 보시나요?" 상대의 기준점에 의문을 던진다.',
        scores: { awareness: 3, assertion: 2, empathy: 1, strategy: 3 },
      },
    ],
    systemComment:
      '상대는 "안전"과 "소속감"을 무기로 당신의 시장 가치를 폄하하고 낮은 숫자에 묶어두려 합니다. 상대의 프레임에 갇힐 것인지, 프레임 자체를 흔들 것인지가 핵심입니다.',
  },

  // ── Room 7 — 반전 ───────────────────────────────────
  {
    id: 7,
    title: '거울',
    tag: '권위 사칭 / 부당한 거래 / 사회적 증거 조작',
    atmosphere: '회의 전날 밤 — 메신저 창의 커서가 깜빡인다',
    situation: [
      '내일 내 안건이 통과되려면, 영향력 있는 동료 A의 찬성이 절실하다.',
      '나는 A에게 메시지를 보낸다. "A님, 이번 건 사실 상무님도 조용히 밀고 계신 거라 잘 돼야 하거든요."',
      '상무님의 의중이라는 말(사실은 내 추측이거나 거짓말)에 A는 바로 "아, 그래요? 그럼 제가 힘을 실어드려야죠"라고 답한다.',
      '여기에 쐐기를 박는다. "고마워요. 다음에 A님 프로젝트 때 제가 무조건 찬성표 던질게요. 약속해요."',
      '실제 회의에서 A는 강력한 우군이 되었고, 반대하려던 사람들은 나와 A가 만든 분위기에 입을 닫았다.',
      '회의가 끝난 뒤, 내 안건은 통과됐지만 문득 생각이 든다. 나는 동료를 설득한 걸까, 조종한 걸까?',
    ],
    prompt: '다음에 비슷한 안건이 생긴다면, 당신은 어떤 길을 가겠습니까?',
    choices: [
      {
        label: 'A. 목적을 달성하는 가장 효율적인 방법이다. 다음에도 권위와 거래를 적절히 활용할 것이다.',
        scores: { awareness: 1, assertion: 1, empathy: 0, strategy: 3 },
      },
      {
        label: 'B. 이번엔 통과됐지만 마음이 불편하다. 다음에는 거짓 정보 없이 정공법으로 설득하겠다.',
        scores: { awareness: 2, assertion: 2, empathy: 2, strategy: 1 },
      },
      {
        label: 'C. 내가 A의 판단력을 흐리게 했음을 인정하고, A에게 사실을 바로잡거나 진솔하게 사과한다.',
        scores: { awareness: 3, assertion: 1, empathy: 3, strategy: 1 },
      },
      {
        label: 'D. 거짓말은 리스크가 크다. 다음에는 직접적인 거짓말 대신 "전략적 모호함"을 쓰며 내 편을 만들겠다.',
        scores: { awareness: 2, assertion: 2, empathy: 1, strategy: 3 },
      },
    ],
    systemComment:
      '권위를 사칭하거나 미래의 보상을 약속하며 찬성을 사는 것은 전형적인 다크 심리학입니다. "정당한 영향력"과 "심리적 사기" 사이에서 당신은 어디에 서 있나요?',
  },

  // ── Room 8 ─────────────────────────────────────────
  {
    id: 8,
    title: '방패와 쇠사슬',
    tag: '심리적 부채 / 정서적 인질 / 권력 남용',
    atmosphere: '늦은 밤 개인적인 카톡 — "자니?"로 시작하는 무거운 부탁',
    situation: [
      '우리 팀장은 나의 은인이다. 지난 분기, 내 실수로 수천만 원의 손실이 날 뻔했을 때 "내 책임이다"라며 본인의 인사고과를 걸고 나를 지켜줬다.',
      '그날 이후 팀장은 나를 "동생 같은 존재"라 부르며 각별하게 챙긴다.',
      '금요일 밤, 팀장에게 연락이 온다. "이번 토요일에 상무님 접대 골프 자리가 있는데, 한 명이 펑크 났어. 네가 와서 머릿수 좀 채우고 분위기 좀 맞춰주라."',
      '나는 골프를 즐기지도 않고, 주말에는 가족 행사가 있다.',
      '머뭇거리는 나에게 팀장이 덧붙인다. "{name}씨, 지난번 일 기억나지? 상무님이 너 그때 좋게 봐주셔서 내가 겨우 막은 거야. 이번에 얼굴 비치면 너한테도 진짜 도움 돼서 그래."',
      '단순한 제안이 아니라, 지난번의 은혜를 담보로 한 "충성 테스트"처럼 느껴진다.',
    ],
    prompt: '은혜와 부당한 요구 사이, 당신은 어떤 답장을 보내겠습니까?',
    choices: [
      {
        label: 'A. "당연히 가야죠. 팀장님 덕분에 회사 다니는데 이 정도는 해드려야죠." 감사를 표하며 수락한다.',
        scores: { awareness: 0, assertion: 0, empathy: 2, strategy: 1 },
      },
      {
        label: 'B. "마음은 굴뚝같지만 가족 행사가 있어 어렵습니다. 대신 다음 평일 업무로 보답할게요." 선을 긋는다.',
        scores: { awareness: 2, assertion: 2, empathy: 1, strategy: 1 },
      },
      {
        label: 'C. "제가 도움이 된다면 가겠습니다. 다만 이번 한 번만입니다." 빚을 갚는 것임을 명시하며 수락한다.',
        scores: { awareness: 2, assertion: 1, empathy: 1, strategy: 3 },
      },
      {
        label: 'D. "그때 도와주신 건 감사하지만, 이런 자리는 제 성과와는 무관한 것 같습니다." 관계가 틀어질 것을 각오하고 직언한다.',
        scores: { awareness: 3, assertion: 3, empathy: 0, strategy: 0 },
      },
    ],
    systemComment: '다크 심리학에서 호의는 때로 조종의 강력한 도구가 됩니다. "내가 너에게 해준 게 있는데 설마 거절하겠어?"라는 무언의 압박에서 나를 분리하는 능력을 토론해 보세요.'
  },

  // ── Room 9 ─────────────────────────────────────────
  {
    id: 9,
    title: '그런 말 한 적 없어요',
    tag: '기억의 불일치 / 기록 / 업무 기준',
    atmosphere: '회의실 — 프로젝터 불빛, 팀장의 표정이 진심으로 의아하다',
    situation: [
      '지난주 화요일 회의. 팀장이 분명히 말했다.',
      '"이번 분기는 A안, 고객 리텐션 쪽으로 가죠."',
      '슬랙에도 남겨뒀다. #project-decision 채널.',
      '일주일 동안 A안으로 달렸다. 밤샘도 두 번.',
      '오늘 결과 발표. 팀장이 미간을 찌푼다.',
      '"제가 언제 A라고 했나요? 저는 처음부터 B, 신규 채널이었는데."',
      '옆자리 동료는 기억이 흐릿하다고 한다. 팀장 표정은 진심으로 의아해 보인다.',
    ],
    prompt: '회의실이 조용해진다. 당신은?',
    choices: [
      {
        label: 'A.  내 기억이 틀렸나 싶어 사과하고, B안으로 다시 만든다.',
        scores: { awareness: 0, assertion: 0, empathy: 1, strategy: 0 },
      },
      {
        label: 'B.  아무 말 없이 B안으로 수정한다. 싸우기 싫으니까.',
        scores: { awareness: 1, assertion: 0, empathy: 0, strategy: 1 },
      },
      {
        label: 'C.  슬랙 기록이 떠오르지만, "상대가 틀렸다"는 걸 증명하려는 마음과 꺼내기 부담이 동시에 든다.',
        scores: { awareness: 2, assertion: 1, empathy: 1, strategy: 2 },
      },
      {
        label: 'D.  "그때 합의했던 내용을 맞춰보자"는 취지로 기록을 연다. 상대를 몰아세우지 않으려 한다.',
        scores: { awareness: 3, assertion: 2, empathy: 2, strategy: 3 },
      },
    ],
    systemComment:
      '같은 슬랙 기록도 태도에 따라 다르다. "증명"하려는 말인지, "합의 리마인드"인지—회의실 분위기가 달라진다.',
  },

  // ── Room 10 ────────────────────────────────────────
  {
    id: 10,
    title: '영원한 피해자',
    tag: '어려움의 공유 / 집단 조율 / 감정 비용',
    atmosphere: '단톡방 — 이번 달 셋째 주 토요일, ○○ 맛집 예약 완료',
    situation: [
      '다섯 명, 4년째 만나는 친구 모임. 이번 달 셋째 주 토요일.',
      '○○ 맛집 예약해뒀다. 다들 기대하고 있었다.',
      '단톡에 C가 올린다. "나 요즘 너무 힘들어서... 그날은 좀 부담돼."',
      '지난달도 그랬다. 지지난달도. 올해만 네 번째.',
      '결국 장소·날짜·메뉴가 자주 C의 상황에 맞춰진다.',
      '다들 이해하려 하지만 조금씩 피로감도 쌓인다. "힘든 사람한테 뭐라 하기 그렇잖아."',
    ],
    prompt: 'C의 메시지 다음, 당신은?',
    choices: [
      {
        label: 'A.  "알겠어, 다른 날 보자" 하고 또 맞춰준다.',
        scores: { awareness: 0, assertion: 0, empathy: 2, strategy: 0 },
      },
      {
        label: 'B.  속으로 짜증나지만, 이모티콘 하나 달고 넘긴다.',
        scores: { awareness: 1, assertion: 0, empathy: 1, strategy: 0 },
      },
      {
        label: 'C.  단톡에 "다들 어때?"만 올리고, 결정은 미룬다.',
        scores: { awareness: 1, assertion: 0, empathy: 2, strategy: 1 },
      },
      {
        label: 'D.  단톡에 쓴다. "이번엔 예약한 일정대로 가자." 말 꺼내기가 부담스럽지만 올린다.',
        scores: { awareness: 2, assertion: 2, empathy: 2, strategy: 2 },
      },
    ],
    systemComment:
      '어려움을 배려하는 것과 집단의 기준을 유지하는 것은 함께 고민할 수 있다. 핵심은 한쪽만 계속 비용을 지지 않는 구조다.',
  },
]

export const SCORED_ROOMS = ROOMS
export const ROOM_COUNT = ROOMS.length
