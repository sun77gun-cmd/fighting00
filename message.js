// 오늘의 응원 한마디 API (Vercel Serverless Function)
// 응원 문장은 이 파일에만 있습니다. 화면(index.html)은 이 응답만 표시합니다.

const MESSAGES = [
  "오늘도 여기까지 온 것만으로 충분히 잘하고 있어요.",
  "작은 한 걸음이 모여 큰 길이 됩니다. 오늘의 한 걸음을 응원해요.",
  "완벽하지 않아도 괜찮아요. 꾸준함이 가장 큰 힘이에요.",
  "지금의 노력은 반드시 어딘가에 닿을 거예요.",
  "잠깐 쉬어 가도 괜찮아요. 쉬는 것도 나아가는 방법이에요.",
  "당신의 오늘은 누군가에게 힘이 되고 있어요.",
  "어제보다 조금 나아졌다면 그걸로 멋진 하루예요.",
  "힘든 순간도 지나가요. 당신은 생각보다 훨씬 강해요.",
  "스스로에게 다정한 하루가 되길 바라요.",
  "오늘 웃을 일이 하나쯤은 꼭 찾아올 거예요.",
  "시작한 것 자체가 이미 용기 있는 일이에요.",
  "당신의 속도로 가도 충분히 괜찮아요.",
  "실수는 배우고 있다는 증거예요. 오늘도 성장 중이에요.",
  "당신이 해낸 작은 일들을 오늘은 꼭 칭찬해 주세요.",
  "좋은 일은 준비된 사람에게 찾아와요. 오늘도 화이팅!"
];

const DEFAULT_NAME = "여러분";
const MAX_NAME_LENGTH = 20;

function cleanName(raw) {
  if (typeof raw !== "string") return DEFAULT_NAME;
  const name = raw.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_NAME_LENGTH);
  return name || DEFAULT_NAME;
}

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST 요청만 받을 수 있어요." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const name = cleanName(body && body.name);
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return res.status(200).json({ name, message });
}
