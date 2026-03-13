import { Injectable } from '@nestjs/common';
import { Novel, Episode, RankingNovel } from './novel.interface';

@Injectable()
export class NovelsService {
  private novels: Novel[] = [
    {
      id: 1,
      title: '계약연애의 정석',
      author: '하늘바라기',
      genre: '로맨스',
      tags: ['계약연애', '오해남녀', '직장', '달달한', '로맨스'],
      description: '회사 회식에서 실수로 키스한 상대가 신임 팀장이었다. 서로의 약점을 잡은 두 사람은 가짜 연인 계약을 맺게 되는데, 가짜 감정이 진짜가 되기까지는 그리 오래 걸리지 않았다.',
      coverImage: undefined,
      rating: 9.97,
      likes: 450,
      interests: 1812,
      comments: 6,
      totalEpisodes: 119,
      status: '자유연재',
      createdAt: '2025-10-15',
      updatedAt: '2026-03-10',
    },
    {
      id: 2,
      title: '달빛 아래 고백',
      author: '은하수빛',
      genre: '로맨스',
      tags: ['짝사랑', '캠퍼스', '달달한', '순정', '로맨스'],
      description: '대학 도서관에서 매일 마주치는 그 사람. 4년간의 짝사랑을 졸업 전에 고백하기로 결심했다. 하지만 그에게는 아무도 모르는 비밀이 있었다.',
      coverImage: undefined,
      rating: 9.85,
      likes: 380,
      interests: 1385,
      comments: 12,
      totalEpisodes: 95,
      status: '자유연재',
      createdAt: '2025-11-01',
      updatedAt: '2026-03-09',
    },
    {
      id: 3,
      title: '은빛 왕좌의 마법사',
      author: '별의조각',
      genre: '판타지',
      tags: ['마법', '왕좌', '궁중', '모험', '판타지'],
      description: '버림받은 왕자가 마법의 힘에 눈을 뜬다. 왕위를 빼앗은 자들에게 복수를 다짐하며, 대륙 최강의 마법사로 성장해 나가는 이야기.',
      coverImage: undefined,
      rating: 9.75,
      likes: 320,
      interests: 1200,
      comments: 8,
      totalEpisodes: 78,
      status: '자유연재',
      createdAt: '2025-09-20',
      updatedAt: '2026-03-08',
    },
    {
      id: 4,
      title: '커피 한 잔의 온도',
      author: '라떼한모금',
      genre: '로맨스',
      tags: ['카페', '일상', '힐링', '달달한', '로맨스'],
      description: '매일 같은 시간에 오는 손님, 매일 같은 주문. 바리스타와 단골의 조용한 일상 속에서 피어나는 따뜻한 감정. 커피처럼 천천히, 그리고 깊게.',
      coverImage: undefined,
      rating: 9.80,
      likes: 290,
      interests: 1100,
      comments: 15,
      totalEpisodes: 65,
      status: '자유연재',
      createdAt: '2025-12-01',
      updatedAt: '2026-03-07',
    },
    {
      id: 5,
      title: '회귀한 검술 천재',
      author: '북풍칼날',
      genre: '판타지',
      tags: ['회귀', '검술', '먼치킨', '성장', '판타지'],
      description: '대륙 최강의 검사가 죽음의 순간 과거로 돌아왔다. 이번 생에서는 동료들을 지키겠다는 다짐과 함께, 더 강한 검을 들어올린다.',
      coverImage: undefined,
      rating: 9.72,
      likes: 270,
      interests: 980,
      comments: 9,
      totalEpisodes: 88,
      status: '자유연재',
      createdAt: '2025-08-15',
      updatedAt: '2026-03-06',
    },
    {
      id: 6,
      title: '드래곤 하트의 후예',
      author: '용의비늘',
      genre: '판타지',
      tags: ['드래곤', '혈통', '마법', '모험', '판타지'],
      description: '평범한 마을 소녀의 심장에 용의 핵이 깃들어 있다. 제국이 그녀를 쫓고, 어둠의 세력이 그녀를 원한다. 자신의 운명을 개척하기 위한 모험이 시작된다.',
      coverImage: undefined,
      rating: 9.68,
      likes: 250,
      interests: 752,
      comments: 7,
      totalEpisodes: 72,
      status: '자유연재',
      createdAt: '2025-10-01',
      updatedAt: '2026-03-05',
    },
    {
      id: 7,
      title: '우산 속 두 사람',
      author: '빗방울소리',
      genre: '로맨스',
      tags: ['우연', '로맨스', '일상', '힐링', '동네'],
      description: '비 오는 날 버스 정류장에서 우산을 함께 쓴 것이 시작이었다. 같은 동네에 사는 두 사람의 우연이 필연이 되어가는 이야기.',
      coverImage: undefined,
      rating: 9.65,
      likes: 230,
      interests: 892,
      comments: 11,
      totalEpisodes: 56,
      status: '자유연재',
      createdAt: '2025-11-15',
      updatedAt: '2026-03-04',
    },
    {
      id: 8,
      title: '취권도사의 하산기',
      author: '막걸리한잔',
      genre: '무협',
      tags: ['무협', '취권', '하산', '먼치킨', '코미디'],
      description: '산에서 술만 마시던 도사가 사부의 유언으로 하산한다. 세상 물정 모르는 천하제일 주당의 강호 적응기. 술잔을 들면 무적, 술이 깨면 백수.',
      coverImage: undefined,
      rating: 9.60,
      likes: 310,
      interests: 1450,
      comments: 20,
      totalEpisodes: 102,
      status: '자유연재',
      createdAt: '2025-07-01',
      updatedAt: '2026-03-03',
    },
    {
      id: 9,
      title: '탑의 99번째 도전자',
      author: '무한계단',
      genre: '판타지',
      tags: ['탑', '도전', '성장', '던전', '판타지'],
      description: '98명이 실패한 탑의 최상층. 99번째 도전자로 선택된 평범한 고등학생. 각 층마다 기다리는 시련과 보상, 그리고 탑의 비밀.',
      coverImage: undefined,
      rating: 9.55,
      likes: 200,
      interests: 670,
      comments: 5,
      totalEpisodes: 45,
      status: '자유연재',
      createdAt: '2026-01-10',
      updatedAt: '2026-03-02',
    },
    {
      id: 10,
      title: '별을 삼킨 마녀',
      author: '자정의종',
      genre: '판타지',
      tags: ['마녀', '별', '저주', '로맨스', '판타지'],
      description: '별빛을 먹고 사는 저주받은 마녀. 그녀에게 남은 시간은 마지막 별이 사라지기 전까지. 저주를 풀 열쇠를 쥔 기사가 나타나지만, 그는 마녀를 죽이러 온 자였다.',
      coverImage: undefined,
      rating: 9.50,
      likes: 190,
      interests: 580,
      comments: 4,
      totalEpisodes: 38,
      status: '자유연재',
      createdAt: '2026-01-20',
      updatedAt: '2026-03-01',
    },
    {
      id: 11,
      title: '옥상 위의 비밀편지',
      author: '종이비행기',
      genre: '로맨스',
      tags: ['편지', '학원', '순정', '비밀', '로맨스'],
      description: '매일 아침 사물함에 놓인 정체 모를 편지. 보낸 사람을 찾기 위한 단서를 따라가다 보니, 예상치 못한 사람에게 다다른다.',
      coverImage: undefined,
      rating: 9.45,
      likes: 180,
      interests: 520,
      comments: 8,
      totalEpisodes: 42,
      status: '자유연재',
      createdAt: '2026-02-01',
      updatedAt: '2026-02-28',
    },
    {
      id: 12,
      title: '철혈맹주의 은퇴일지',
      author: '검은붓끝',
      genre: '무협',
      tags: ['무협', '은퇴', '먼치킨', '일상', '코미디'],
      description: '천하를 호령하던 철혈맹주가 은퇴를 선언했다. 시골에서 농사나 지으며 살겠다는데, 강호의 분쟁이 자꾸 그를 찾아온다. 제발 좀 쉬게 해줘.',
      coverImage: undefined,
      rating: 9.40,
      likes: 260,
      interests: 1100,
      comments: 14,
      totalEpisodes: 85,
      status: '자유연재',
      createdAt: '2025-09-01',
      updatedAt: '2026-02-27',
    },
    {
      id: 13,
      title: '던전 속 편의점',
      author: '심야알바',
      genre: '현대판타지',
      tags: ['현대판타지', '던전', '편의점', '코미디', '각성'],
      description: '던전 한복판에 편의점이 생겼다. 알바생으로 취직한 평범한 대학생은 헌터들에게 삼각김밥과 에너지 드링크를 팔며, 자신도 모르는 능력에 눈을 뜬다.',
      coverImage: undefined,
      rating: 9.35,
      likes: 340,
      interests: 1600,
      comments: 22,
      totalEpisodes: 110,
      status: '자유연재',
      createdAt: '2025-06-15',
      updatedAt: '2026-02-26',
    },
    {
      id: 14,
      title: '시간을 되감는 연인',
      author: '모래시계',
      genre: '로맨스',
      tags: ['타임루프', '로맨스', '눈물', '운명', '반복'],
      description: '사고로 연인을 잃은 날, 시간이 되감겼다. 그녀를 살리기 위해 같은 하루를 반복하지만, 반복할수록 예상치 못한 진실이 드러난다.',
      coverImage: undefined,
      rating: 9.30,
      likes: 170,
      interests: 480,
      comments: 6,
      totalEpisodes: 35,
      status: '자유연재',
      createdAt: '2026-02-10',
      updatedAt: '2026-02-25',
    },
    {
      id: 15,
      title: '마왕인데 용사 파티에 들어감',
      author: '반전매력',
      genre: '판타지',
      tags: ['판타지', '마왕', '용사', '코미디', '반전'],
      description: '마왕이 정체를 숨기고 용사 파티에 합류했다. 자기를 잡으러 가는 여정에 동행하게 된 기막힌 상황. 들키면 끝이다, 하지만 이 용사 파티... 너무 허술한데?',
      coverImage: undefined,
      rating: 9.25,
      likes: 220,
      interests: 900,
      comments: 18,
      totalEpisodes: 60,
      status: '자유연재',
      createdAt: '2025-12-15',
      updatedAt: '2026-02-24',
    },
  ];

  private episodes: Episode[] = [];

  constructor() {
    this.generateMockEpisodes();
  }

  private generateMockEpisodes() {

    // Generate episodes for all novels
    for (const novel of this.novels) {
      const episodeCount = Math.min(novel.totalEpisodes, 8);
      for (let i = 1; i <= episodeCount; i++) {
        const content = this.generateGenericContent(novel, i);

        this.episodes.push({
          id: (novel.id - 1) * 200 + i,
          novelId: novel.id,
          episodeNumber: i,
          title: this.getEpisodeTitle(novel, i),
          content,
          rating: Math.round((9 + Math.random()) * 100) / 100,
          comments: Math.floor(Math.random() * 40) + 5,
          views: Math.floor(Math.random() * 10000) + 1000,
          createdAt: this.getEpisodeDate(novel.createdAt, i),
        });
      }
    }
  }

  private getEpisodeTitle(novel: Novel, ep: number): string {
    const titles: Record<number, string[]> = {
      1: ['잘못된 키스', '신임 팀장의 정체', '계약의 조건', '가짜 연인 1일차', '흔들리는 경계', '야근의 이유', '진심이 새어나오다', '계약 종료일'],
      2: ['도서관의 그 자리', '우연 아닌 우연', '졸업까지 30일', '그의 비밀', '고백 연습', '빗속의 진심', '마지막 시험', '졸업식 그날'],
      3: ['버림받은 왕자', '마력의 각성', '첫 번째 동맹', '그림자의 추격', '마탑의 시험', '왕좌의 조건', '배신과 결의', '은빛 왕좌'],
      4: ['그 카페의 단골', '라떼 한 잔', '이름 모를 설렘', '비 오는 오후', '닫힌 가게 앞에서', '마음의 온도', '고백 같은 주문', '내일도 올게요'],
      5: ['과거로의 귀환', '두 번째 기회', '잊힌 동료', '검의 길', '강해지는 이유', '운명의 재회', '최후의 결전', '새로운 시작'],
    };

    if (titles[novel.id] && titles[novel.id][ep - 1]) {
      return `${ep}화. ${titles[novel.id][ep - 1]}`;
    }

    const genericTitles = ['새로운 시작', '예상치 못한 전개', '숨겨진 진실', '위기와 기회', '마음의 변화', '결정의 순간', '반전의 연속', '클라이맥스'];
    return `${ep}화. ${genericTitles[(ep - 1) % genericTitles.length]}`;
  }

  private generateGenericContent(novel: Novel, ep: number): string {
    const contents: Record<string, string[]> = {
      '로맨스': [
        `그녀는 창밖을 바라보며 한숨을 쉬었다. 오늘도 그 사람을 만났다. 매번 만날 때마다 심장이 미칠 듯이 뛰는 것은 왜일까.\n\n"바보같이..."\n\n스스로를 타이르며 커피를 한 모금 마셨다. 쓴맛이 혀끝에 감겼다. 마치 지금의 감정처럼.\n\n핸드폰이 울렸다. 화면에 뜬 이름을 보는 순간, 방금 전의 다짐은 눈 녹듯 사라졌다.\n\n"여보세요?"\n\n"지금 어디야?"\n\n낮고 굵은 목소리가 귓가를 스쳤다. 심장이 또 뛰기 시작했다.\n\n"집인데... 왜?"\n\n"문 열어. 앞에 있어."\n\n놀라서 현관문을 열었다. 그가 서 있었다. 한 손에는 장미꽃다발을, 다른 손에는 치킨을 들고.\n\n"배고프지? 밥 안 먹었을 거 알아."\n\n이 남자는 왜 매번 이렇게 예상을 빗나가는 걸까. 로맨틱한 건지 아닌 건지. 하지만 그게 좋았다. 꾸미지 않은 진심이 느껴지니까.\n\n"들어와."\n\n그녀는 웃으며 문을 활짝 열었다.`,

        `"우리 사이가 뭐야?"\n\n불쑥 던진 질문에 그가 멈칫했다. 라면을 끓이던 손이 잠시 멈추었다가, 다시 움직이기 시작했다.\n\n"라면 먹을래, 아님 진지하게 얘기할래?"\n\n"진지하게 얘기하자."\n\n그가 가스불을 끄고 돌아섰다. 평소와 달리 진지한 표정이었다.\n\n"너한테 좋은 남자는 아닐 수도 있어. 내 세계는 복잡하고, 위험하기도 해."\n\n"그건 내가 판단할 문제야."\n\n"그래서 말인데..."\n\n그가 한 걸음 다가왔다. 가까워진 거리에 숨이 막혔다.\n\n"너, 나한테 올래?"\n\n단순하고 직설적인 고백. 하지만 그의 눈빛은 떨리고 있었다. 무뚝뚝한 이 남자가 이런 말을 하기까지 얼마나 고민했을까.\n\n그녀는 대답 대신 그의 품에 안겼다. 라면은 불어터졌지만, 그건 중요하지 않았다.`,
      ],
      '판타지': [
        `눈을 떴을 때, 그곳은 전혀 다른 세계였다.\n\n천장에는 금박으로 수놓인 용 문양이 있었고, 침대는 비단으로 덮여 있었다. 몸을 일으키려 하니, 온몸이 쑤셨다.\n\n"폐하, 의식이 돌아오셨습니다!"\n\n시녀로 보이는 여인이 급히 달려왔다. 폐하? 나를?\n\n거울 앞에 서니, 낯선 얼굴이 비쳤다. 날카로운 눈매, 붉은 입술, 이마에 새겨진 용 문양. 이것은... 소설 속 폭군 황제의 얼굴이 아닌가.\n\n'잠깐, 이 소설 알아. 이 폭군은 3개월 후에 반란군에게 죽는 캐릭터잖아.'\n\n식은땀이 흘렀다. 3개월. 딱 3개월의 시간이 주어진 셈이다.\n\n"시녀, 오늘이 며칠이지?"\n\n"태양력 317년, 봄의 첫째 달 열흘째입니다, 폐하."\n\n원작에서 반란이 일어나는 건 여름의 첫째 달. 정확히 90일이 남았다.\n\n'살아남아야 한다. 어떻게든.'\n\n황제의 기억이 조금씩 밀려들어왔다. 이 세계의 규칙, 권력 구조, 그리고 적들의 이름이 머릿속을 채워갔다.`,

        `검기가 허공을 갈랐다. 한 줄기 빛이 어둠을 관통하며, 마물의 심장을 정확히 꿰뚫었다.\n\n"크아아아악!"\n\n마물이 비명을 지르며 쓰러졌다. 검은 연기가 피어오르며 마석 하나가 바닥에 떨어졌다.\n\n"후... 이것으로 7번째."\n\n검을 거두며 숨을 골랐다. 던전의 깊은 곳에서 불어오는 바람이 차가웠다. 하지만 멈출 수 없었다. 이 던전의 끝에 있다는 전설의 보물, '시간의 구슬'을 반드시 손에 넣어야 했다.\n\n"경고합니다. 이 아래로 내려간 자 중 살아 돌아온 이는 없습니다."\n\n던전 입구에서 노인이 했던 말이 떠올랐다. 하지만 돌아갈 수 없다. 동생의 저주를 풀기 위해서는 시간의 구슬이 유일한 방법이었다.\n\n계단을 내려가니, 거대한 문이 나타났다. 문 위에는 고대 문자가 새겨져 있었다.\n\n'이 문을 여는 자, 모든 것을 잃거나 모든 것을 얻으리라.'\n\n손을 들어 문에 대었다. 차가운 돌이 서서히 따뜻해지더니, 눈부신 빛이 쏟아져 나왔다.`,
      ],
      '무협': [
        `새벽안개가 산을 감쌌다. 김철수는 하품을 하며 건설현장으로 향했다. 오늘도 삽질의 연속이겠지.\n\n그런데 현장에 도착하니 분위기가 이상했다. 땅이 갈라지며 빛이 새어나오고 있었다.\n\n"뭐, 뭐야 저게!"\n\n현장 소장이 비명을 질렀다. 갈라진 땅 사이로 이상한 기운이 뿜어져 나왔다. 그 기운을 맞은 순간, 김철수의 의식이 아득해졌다.\n\n눈을 떠보니, 그곳은 건설현장이 아니었다. 웅장한 전각 앞, 수백 명의 무인들이 무릎을 꿇고 있었다.\n\n"맹주님, 어명이 도착했습니다!"\n\n"맹주? 나?"\n\n손을 내려다보니, 건설현장에서 단련된 투박한 손이 아니라 검을 쥐기에 완벽한 손이었다. 하지만 이상하게도, 삽질로 다져진 내공은 그대로였다.\n\n'시멘트 포대 나르던 힘이 내공이 된 건가...?'\n\n무림맹주 김철수의 새로운 인생이 시작되었다. 물론, 정시 퇴근은 포기할 수 없지만.`,
      ],
      '현대판타지': [
        `"아빠, 유치원 데려다 줘!"\n\n다섯 살 딸 서연이가 아빠의 바지를 잡아당겼다. 평범한 회사원 이준혁은 출근 준비를 하면서 딸의 머리를 묶어주고 있었다.\n\n"서연아, 가만히 있어. 머리 삐뚤어진다."\n\n"아빠 손이 너무 크단 말이야~"\n\n평화로운 아침이었다. 적어도 그 사이렌이 울리기 전까지는.\n\n[긴급 경보] 서울 강남구 일대 던전 붕괴 발생. 주민 여러분은 즉시 대피하시기 바랍니다.\n\n핸드폰에서 긴급 재난 문자가 울렸다. 동시에 창밖에서 폭발음이 들렸다.\n\n"서연아!"\n\n이준혁은 본능적으로 딸을 안아 올렸다. 창밖으로 보이는 것은 믿기 어려운 광경이었다. 하늘이 갈라지며 검은 문이 나타나고, 그 안에서 괴물들이 쏟아져 나오고 있었다.\n\n심장이 뜨거워졌다. 딸을 안은 팔에서 빛이 나기 시작했다.\n\n[각성 조건 충족: 보호 본능]\n[축하합니다. S급 헌터로 각성하셨습니다.]\n\n눈앞에 떠오른 파란 창. 이준혁의 인생이 완전히 바뀌는 순간이었다.`,
      ],
    };

    const genreContents = contents[novel.genre] || contents['로맨스'];
    return genreContents[(ep - 1) % genreContents.length];
  }

  private getEpisodeDate(startDate: string, episodeNum: number): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (episodeNum - 1) * 3);
    return date.toISOString().split('T')[0];
  }

  findAll(genre?: string): Novel[] {
    if (genre) {
      return this.novels.filter(n => n.genre === genre);
    }
    return this.novels;
  }

  findOne(id: number): Novel | undefined {
    return this.novels.find(n => n.id === id);
  }

  findRanking(genre?: string): RankingNovel[] {
    const changes: Array<'up' | 'down' | 'new' | 'same'> = ['up', 'down', 'new', 'same'];
    let novels = [...this.novels];
    if (genre) {
      novels = novels.filter(n => n.genre === genre);
    }
    return novels
      .sort((a, b) => b.rating - a.rating)
      .map((novel, index) => ({
        ...novel,
        rank: index + 1,
        rankChange: index < 3 ? 'up' : changes[index % changes.length],
      }));
  }

  findEpisodes(novelId: number): Episode[] {
    return this.episodes
      .filter(e => e.novelId === novelId)
      .sort((a, b) => b.episodeNumber - a.episodeNumber);
  }

  findEpisode(novelId: number, episodeId: number): Episode | undefined {
    return this.episodes.find(e => e.novelId === novelId && e.id === episodeId);
  }

  generateEpisode(novelId: number): Episode {
    const novel = this.findOne(novelId);
    if (!novel) {
      throw new Error('Novel not found');
    }

    const existingEpisodes = this.findEpisodes(novelId);
    const nextEpNum = existingEpisodes.length > 0
      ? Math.max(...existingEpisodes.map(e => e.episodeNumber)) + 1
      : 1;

    const newEpisode: Episode = {
      id: Date.now(),
      novelId,
      episodeNumber: nextEpNum,
      title: `${nextEpNum}화. AI가 생성한 새로운 이야기`,
      content: `[AI 생성 에피소드]\n\n${this.generateAIContent(novel)}`,
      rating: 0,
      comments: 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isNew: true,
    };

    this.episodes.push(newEpisode);
    novel.totalEpisodes = nextEpNum;

    return newEpisode;
  }

  private generateAIContent(novel: Novel): string {
    const templates: Record<string, string> = {
      '로맨스': `바람이 불어왔다. 그녀의 머리카락이 흩날리며 그의 시야를 가렸다.\n\n"오늘은... 할 말이 있어."\n\n그녀가 조심스럽게 입을 열었다. 평소와는 다른 진지한 표정에 그의 심장이 빠르게 뛰기 시작했다.\n\n"뭔데? 갑자기 분위기가 왜 이래."\n\n"그냥... 고맙다고. 항상 내 옆에 있어줘서."\n\n예상치 못한 말에 그는 당황했다. 이 여자가 이런 말을 다 하다니.\n\n"야, 너 어디 아프냐?"\n\n"아프긴! 진심인데."\n\n그녀가 볼을 부풀렸다. 그 모습이 너무 귀여워서 그는 웃음을 참을 수 없었다.\n\n"나도... 고마워. 네가 있어서."\n\n두 사람의 시선이 마주쳤다. 석양빛이 그들을 비추고 있었다. 이 순간만큼은 세상의 모든 소란이 멀어져 갔다.\n\n하지만 그들은 몰랐다. 이 평화로운 시간이 곧 끝나게 될 것이라는 걸. 저 멀리, 검은 세단 하나가 그들을 지켜보고 있었다.`,

      '판타지': `마탑의 꼭대기에서 바라본 세계는 광활했다. 끝없이 펼쳐진 대륙 위로 마력의 흐름이 보였다.\n\n"드디어 이 경지에 올랐군."\n\n수련을 시작한 지 어언 5년. 마침내 7서클의 경지에 도달한 것이다. 하지만 기쁨도 잠시, 대륙의 북쪽에서 불길한 기운이 느껴졌다.\n\n"이건... 마왕의 기운?"\n\n봉인이 풀리고 있었다. 천 년 전 대현자가 목숨을 바쳐 봉인한 마왕이 깨어나려 하고 있었다.\n\n시간이 없었다. 동료들을 모아야 한다.\n\n"통신 마법."\n\n손가락을 튕기자, 마력이 사방으로 퍼져나갔다. 대륙 곳곳에 흩어진 동료들에게 메시지가 전달되었다.\n\n'모여라. 마왕이 깨어난다.'\n\n최후의 전쟁이 시작되려 하고 있었다.`,

      '무협': `권강이 허공을 가르며 바위를 두 동강 냈다. 철수는 자신의 손을 바라보며 혀를 찼다.\n\n"이건 뭐... 시멘트 포대보다 쉽잖아."\n\n무림맹주의 내공은 상상 이상이었다. 건설현장에서 10년간 다진 기초 체력 위에 내공이 더해지니, 그야말로 천하무적이었다.\n\n"맹주님! 마교에서 전서가 왔습니다!"\n\n"아, 또? 오늘 5시에 퇴근해야 하는데..."\n\n부하가 고개를 갸웃했다. 퇴근이라는 개념을 이해하지 못하는 눈치였다.\n\n전서를 펼쳐보니, 마교주의 도전장이었다. 내일 정오, 화산에서 결전을 벌이자는 내용.\n\n"내일 정오면... 점심시간이잖아. 밥은 먹고 싸워야지."\n\n철수는 달력을 확인했다. 내일은 건설현장 월급날이기도 했다. 아, 물론 여기선 월급이 없지만.`,

      '현대판타지': `던전이 열린 지 일주일이 지났다. 서울은 전쟁터가 되었고, 헌터들이 최전방에서 싸우고 있었다.\n\n이준혁은 딸을 안전한 대피소에 맡기고 전장으로 향했다. S급 헌터의 힘은 압도적이었다.\n\n"스킬: 수호의 방패."\n\n거대한 빛의 방패가 민간인들을 감쌌다. 동시에 반대쪽 손에서는 검기가 뿜어져 나와 마물을 베어냈다.\n\n"아빠가 지켜줄게. 이 세상 모든 것을."\n\n딸과의 약속을 떠올리며 검을 휘둘렀다. 한 번의 공격으로 마물 세 마리가 소멸했다.\n\n하지만 던전의 깊은 곳에서 더 강력한 기운이 느껴졌다. 보스급 마물이 나올 모양이었다.\n\n"정시 퇴근은 글렀군."\n\n쓴웃음을 지으며 던전 깊숙이 발을 내딛었다. 서연이가 기다리고 있다. 반드시 살아 돌아가야 한다.`,
    };

    return templates[novel.genre] || templates['로맨스'];
  }
}
