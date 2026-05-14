export async function GET() {
  return Response.json({
    mode: "local",
    message: "Ask NDX100 当前使用本地预设回答，暂未接入真实 AI API。",
  });
}
