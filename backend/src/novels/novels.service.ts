import { Injectable } from '@nestjs/common';
import { Novel, Episode, RankingNovel } from './novel.interface';

@Injectable()
export class NovelsService {
  private novels: Novel[] = [
    {
      id: 1,
      title: '아이 아빠는 망나니 재벌 3세입니다',
      author: '제술영',
      genre: '로맨스',
      tags: ['나쁜남자', '냉정녀', '재벌남', '동거', '속도위반', '하룻밤', '달달한', '도도녀', '육아물', '직진남', '로맨스'],
      description: '망나니, 개차반, 유아독존, 방의 황태자, 안 좋은 별명과 소문은 다 달고 다니는 남자, 차민욱. 거기다 한가지 더, 재벌 3세. 모두가 날 망나니라고 불러도 상관없다. 난 내 마누라, 내 아이에게만 좋은 사람이면 된다. 야생마 차민욱을 길들일 수 있는 유일한 여자, 정수아. 하지만 수아는 민욱을 거부한다. "난혼자 이 아이를 키울 거야. 니 도움 따윈 필요 없다고." "절대 못남. 못 해. 내 아이기도 해." "좋아. 일 년 만 같이 살아보자. 모든 건 다 내가..."',
      coverImage: '/covers/novel1.jpg',
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
      title: '밤마다 남편이',
      author: '초아(Caoa)',
      genre: '로맨스',
      tags: ['재벌남', '비밀연애', '달달한', '19금', '결혼', '로맨스'],
      description: '낮에는 차가운 재벌 총수, 밤에는 다정한 남편. 겉으로는 계약 결혼이지만, 밤이 되면 달라지는 남자. 서윤아, 너만은 절대 놓치지 않겠다.',
      coverImage: '/covers/novel2.jpg',
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
      title: '용주님은 오황의 궁에...',
      author: '달빛한가루',
      genre: '판타지',
      tags: ['회귀', '궁중', '판타지', '로맨스', '황제', '용', '동양풍'],
      description: '천 년의 잠에서 깨어난 용주. 눈을 뜨니 그곳은 오황의 궁이었다. 전생의 기억을 품은 채, 이번 생에서는 반드시 살아남겠다고 다짐한다.',
      coverImage: '/covers/novel3.jpg',
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
      title: '착한 오빠, 나쁜 오빠',
      author: '봉자까',
      genre: '로맨스',
      tags: ['형제', '삼각관계', '로맨스', '재벌', '비밀', '달달한'],
      description: '쌍둥이 형제 사이에 낀 여자. 한 명은 한없이 다정하고, 한 명은 위험할 정도로 집착적이다. 둘 중 누가 진짜 착한 오빠이고, 누가 나쁜 오빠인가.',
      coverImage: '/covers/novel4.jpg',
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
      title: '폭군을 채우는 완벽한 방법',
      author: '버터래',
      genre: '판타지',
      tags: ['빙의', '폭군', '황제', '궁중로맨스', '판타지', '회귀'],
      description: '소설 속 폭군 황제에게 빙의했다. 원작에서 3개월 후 암살당하는 운명. 살아남기 위해 폭군의 마음을 채워야 한다. 그런데... 이 폭군, 왜 이렇게 순한 거야?',
      coverImage: '/covers/novel5.jpg',
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
      title: '이혼변호사 중전마마',
      author: '송 하얀',
      genre: '판타지',
      tags: ['회귀', '법정', '궁중', '이혼', '판타지', '여성향'],
      description: '대한민국 최고의 이혼 전문 변호사가 조선시대 중전으로 빙의했다. 왕과의 이혼(폐비)을 막기 위해 법정 아닌 궁정에서 싸움을 시작한다.',
      coverImage: '/covers/novel6.jpg',
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
      title: '옆집에 별이 떨어졌다',
      author: '문은서',
      genre: '로맨스',
      tags: ['로맨스', '일상', '힐링', '달달한', '연예인', '동거'],
      description: '한물간 작곡가의 옆집에 톱스타가 이사왔다. 매일 밤 기타 소리에 잠을 못 이루던 그녀가 어느 날 문을 두드린다. "저... 그 곡, 저한테 주실 수 있나요?"',
      coverImage: '/covers/novel7.jpg',
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
      title: '일용직 노동자, 무림맹주',
      author: '철근콘크리트',
      genre: '무협',
      tags: ['무협', '현대', '회귀', '먼치킨', '일용직', '노동자'],
      description: '건설현장 일용직 노동자 김철수. 어느 날 눈을 떠보니 무림맹주가 되어 있었다. 삽질로 단련된 내공은 무림 최강. 하지만 그가 원하는 건 단 하나, 정시 퇴근.',
      coverImage: '/covers/novel8.jpg',
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
      title: '완벽한 악녀의 청산법',
      author: '윤성아',
      genre: '판타지',
      tags: ['빙의', '악녀', '청산', '궁중', '로맨스', '판타지'],
      description: '소설 속 최악의 악녀로 빙의했다. 모든 캐릭터가 나를 증오하고, 엔딩은 참수형. 이 인생을 깨끗하게 청산하고 도망치겠다고 결심했는데, 왜 이 남자들이 놓아주질 않는 거지?',
      coverImage: '/covers/novel9.jpg',
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
      title: '푸른 눈의 귀비',
      author: '자금성',
      genre: '판타지',
      tags: ['동양풍', '궁중', '귀비', '판타지', '로맨스', '이국적'],
      description: '서양에서 온 푸른 눈의 여인이 황궁의 귀비가 되었다. 후궁들의 시기와 질투 속에서, 그녀는 자신만의 방법으로 황제의 마음을 얻어간다.',
      coverImage: '/covers/novel10.jpg',
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
      title: '군사랑을 시작했다',
      author: '하은',
      genre: '로맨스',
      tags: ['군인', '로맨스', '순정', '달달한', '제복남'],
      description: '군 복무 중인 남자친구를 기다리는 평범한 대학생의 이야기. 면회날만 손꼽아 기다리던 그녀에게 어느 날, 예상치 못한 전화가 걸려온다.',
      coverImage: '/covers/novel11.jpg',
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
      title: '격위는 높고 귀능이나...',
      author: '천하제일',
      genre: '무협',
      tags: ['무협', '먼치킨', '사이다', '귀능', '격위'],
      description: '무림에서 가장 높은 격위를 가졌으나, 귀찮은 능력만 잔뜩인 남자. 천하제일인이라 불리지만, 본인은 그저 낮잠이나 자고 싶을 뿐이다.',
      coverImage: '/covers/novel12.jpg',
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
      title: '아빠 일단 강해지셔야겠습...',
      author: '육아검사',
      genre: '현대판타지',
      tags: ['현대판타지', '아빠', '육아', '먼치킨', '각성'],
      description: '평범한 회사원 아빠가 던전 붕괴 사태에서 딸을 지키기 위해 각성한다. S급 헌터가 된 아빠의 육아와 전투를 오가는 일상.',
      coverImage: '/covers/novel13.jpg',
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
      title: '나의 잘못은',
      author: '이서윤',
      genre: '로맨스',
      tags: ['로맨스', '재회', '눈물', '후회남', '집착남'],
      description: '5년 전 떠나보낸 그녀가 돌아왔다. 아이를 데리고. 그때 나의 잘못은 그녀를 붙잡지 못한 것이었다. 이번에는 절대 놓치지 않겠다.',
      coverImage: '/covers/novel14.jpg',
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
      title: '100만 유소버, 황실 입성기',
      author: '크리에이터',
      genre: '판타지',
      tags: ['판타지', '빙의', '유튜버', '황실', '코미디', '현대지식'],
      description: '구독자 100만 유튜버가 판타지 세계 황실에 떨어졌다. 현대 지식과 유튜버 감각으로 황실을 뒤집어 놓는 좌충우돌 생존기.',
      coverImage: '/covers/novel15.jpg',
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
    const episodeContents: Record<number, string[]> = {
      1: [
        `수아는 임신 테스트기의 두 줄을 멍하니 바라보았다.\n\n"이게... 진짜야?"\n\n손이 떨렸다. 아니, 온몸이 떨렸다. 불과 한 달 전, 친구의 생일 파티에서 만난 남자. 이름도 제대로 기억나지 않는 그 남자의 아이를 임신했다니.\n\n수아는 화장실 바닥에 주저앉았다. 대학을 갓 졸업하고 작은 출판사에 취직한 지 겨우 3개월. 이제 막 사회생활을 시작했는데, 인생이 이렇게 꼬여버릴 줄이야.\n\n"일단... 냉정하게 생각하자."\n\n수아는 심호흡을 하고 일어섰다. 거울에 비친 자신의 얼굴은 창백했지만, 눈빛만은 단호했다. 혼자서도 키울 수 있다. 아니, 혼자서 키우겠다.\n\n그때 수아의 핸드폰이 울렸다. 모르는 번호였다.\n\n"여보세요?"\n\n"정수아 씨죠? 저는 차민욱 씨의 비서 김태현입니다."\n\n차민욱. 그 이름을 듣는 순간, 수아의 심장이 쿵 내려앉았다. 그날 밤의 남자. 기억나지 않을 리가 없었다.`,

        `"차민욱이 누군데요?"\n\n수아는 모르는 척했다. 아니, 정말로 그 남자가 누구인지 몰랐다. 그날 밤 파티에서 만난 건 기억나지만, 그가 재벌 3세라는 사실은 전혀 몰랐다.\n\n"차민욱 회장님의 손자이시자, M그룹의 상무이십니다. 정수아 씨와 한 달 전에 만나신 분입니다."\n\n수아는 전화기를 떨어뜨릴 뻔했다. M그룹? 대한민국 재벌 순위 5위 안에 드는 그 M그룹?\n\n"그분이 저한테 무슨 용건이..."\n\n"직접 만나서 말씀드리고 싶습니다. 내일 오후 2시, 청담동 M타워 로비에서 뵐 수 있을까요?"\n\n수아는 거절하려 했다. 하지만 뱃속의 아이가 떠올랐다. 이 아이의 아버지가 재벌이라면... 아니, 돈이 문제가 아니다. 이 아이의 아버지가 누구인지는 알아야 하지 않을까.\n\n"... 알겠습니다."\n\n전화를 끊고 수아는 창밖을 바라보았다. 서울의 야경이 반짝이고 있었다. 내일부터 그녀의 인생은 완전히 달라질 것이다.`,

        `M타워의 로비는 수아가 상상한 것보다 훨씬 화려했다. 대리석 바닥에 비친 자신의 모습이 초라해 보여서 괜히 옷매무새를 고쳤다.\n\n"정수아 씨?"\n\n단정한 정장을 입은 남자가 다가왔다. 김태현 비서였다.\n\n"따라오시죠."\n\n엘리베이터를 타고 올라간 곳은 최상층이었다. 통유리 너머로 서울 시내가 한눈에 내려다보였다. 그리고 그 앞에, 한 남자가 서 있었다.\n\n차민욱.\n\n그날 밤보다 훨씬 날카로운 인상이었다. 완벽하게 다려진 슈트, 차가운 눈빛. 하지만 수아를 보는 순간, 그의 눈빛이 미세하게 흔들렸다.\n\n"앉아."\n\n"반말은 좀..."\n\n"앉으세요."\n\n수아는 마지못해 소파에 앉았다. 차민욱이 맞은편에 앉더니 단도직입적으로 말했다.\n\n"임신한 거 알고 있어. 아니, 알고 있습니다."\n\n수아의 눈이 커졌다. "어떻게..."\n\n"산부인과 CCTV에 찍혔더군요. 내 아이가 맞죠?"`,

        `수아는 벌떡 일어섰다.\n\n"CCTV를 확인했다고요? 그게 말이 됩니까? 사생활 침해잖아요!"\n\n차민욱은 눈 하나 깜짝하지 않았다.\n\n"내 아이일 수도 있는데, 확인하는 게 당연하지 않습니까?"\n\n"당신 아이라는 보장이 어딨어요!"\n\n"그날 밤 이후로 다른 남자를 만난 적 있습니까?"\n\n수아는 할 말을 잃었다. 사실이었다. 그날 밤 이후로 누구도 만나지 않았다.\n\n차민욱이 천천히 일어나 수아에게 다가왔다. 그리고 예상치 못한 말을 했다.\n\n"결혼합시다."\n\n"...네?"\n\n"내 아이를 사생아로 만들 순 없으니까."\n\n수아는 황당했다. 이게 프로포즈라고? 세상에 이렇게 로맨틱하지 않은 프로포즈가 또 있을까.\n\n"싫어요. 전 혼자서도 충분히 키울 수 있어요."\n\n"월급이 얼만데요?"\n\n"...그건 왜요?"\n\n"230만 원으로 서울에서 아이를 키우겠다고요?"\n\n"제 월급을 어떻게..."\n\n차민욱의 입꼬리가 살짝 올라갔다. 이 남자, 이미 수아에 대해 모든 것을 조사한 것이다.`,

        `수아는 차민욱의 제안을 단칼에 거절하고 M타워를 나왔다. 하지만 그 다음 날부터 이상한 일들이 벌어지기 시작했다.\n\n출근하니 책상 위에 최고급 유기농 엽산 세트가 놓여 있었다.\n\n"이거 누가 보낸 거예요?"\n\n"아까 배달 왔는데, 정수아 씨 앞으로요."\n\n카드에는 단 한 줄만 적혀 있었다.\n\n'엽산은 임신 초기에 필수입니다. - C'\n\nC? 차민욱의 이니셜이었다.\n\n점심시간에는 회사 앞에 고급 도시락이 배달되었다. 퇴근길에는 검은 세단이 회사 앞에 대기하고 있었다.\n\n"사장님께서 모셔오라 하셨습니다."\n\n"필요 없어요!"\n\n수아는 택시를 탔다. 하지만 택시가 도착한 곳은 자신의 원룸이 아니라, 한강이 보이는 펜트하우스 앞이었다.\n\n"기사님, 여기 제가 말한 주소가 아닌데요?"\n\n"아, 차민욱 사장님께서 주소를 변경하셨습니다."\n\n수아는 이를 갈았다. 이 남자, 정말 보통이 아니다.\n\n펜트하우스 문이 열리고, 앞치마를 두른 차민욱이 나타났다.\n\n"들어와요. 저녁 만들었는데."\n\n수아는 자신의 눈을 의심했다. 재벌 3세가... 앞치마를 두르고... 요리를?`,
      ],
    };

    // Generate episodes for all novels
    for (const novel of this.novels) {
      const episodeCount = Math.min(novel.totalEpisodes, 8);
      for (let i = 1; i <= episodeCount; i++) {
        const content = novel.id === 1 && episodeContents[1][i - 1]
          ? episodeContents[1][i - 1]
          : this.generateGenericContent(novel, i);

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
      1: ['운명의 시작', '재벌의 등장', '그날의 진실', '거절할 수 없는 제안', '동거의 시작', '흔들리는 마음', '질투의 불씨', '고백'],
      2: ['계약 결혼', '첫날밤', '차가운 낮', '뜨거운 밤', '비밀이 새어나가다', '위험한 감정', '진심을 깨닫다', '영원의 약속'],
      3: ['천 년의 잠', '오황의 궁', '전생의 기억', '첫 번째 시련', '동맹을 맺다', '궁중 암투', '용의 각성', '결전의 날'],
      4: ['쌍둥이 형제', '첫 만남', '다정한 오빠', '위험한 오빠', '흔들리는 마음', '비밀의 방', '선택의 기로', '진실은 하나'],
      5: ['폭군에게 빙의하다', '3개월의 시한', '첫 번째 계획', '뜻밖의 순종', '마음이 채워지다', '위기의 순간', '진심의 무게', '새로운 운명'],
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

  findRanking(): RankingNovel[] {
    const changes: Array<'up' | 'down' | 'new' | 'same'> = ['up', 'down', 'new', 'same'];
    return this.novels
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
