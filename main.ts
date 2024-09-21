
const tokens: string[] = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTAzZDk1NGI2OTAxNzgwMDk5ZWE5IiwiaWF0IjoxNzI2ODc0NTg2LCJleHAiOjE3MjY5NjA5ODYsInR5cGUiOiJhY2Nlc3MifQ.7ScySwuYovsGLAeBQeMs3qtua-1SphFrGWYEjI-cC6g",
  //09045087864
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0NWMxMjM0Y2ZkYTZlZDc5Yjk5IiwiaWF0IjoxNzI2ODc0NzE3LCJleHAiOjE3MjY5NjExMTcsInR5cGUiOiJhY2Nlc3MifQ.qAFS2VbAmEbxMG9AiNUNnMuOT0dMT10_df81f0VAgvQ",
  //09365087864
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0ZTEyYTgxMGEwYjQ1OGJjMjI1IiwiaWF0IjoxNzI2ODc0ODQ5LCJleHAiOjE3MjY5NjEyNDksInR5cGUiOiJhY2Nlc3MifQ.rrJdfY1zjMfY0VTF5zjp9XJye-d2fFGcZJHhaaYSJRU",
  //09191493905
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzE4YTM5YTlkNTdkOTNmMDAzODU4IiwiaWF0IjoxNzI2ODI2MzMxLCJleHAiOjE3MjY5MTI3MzEsInR5cGUiOiJhY2Nlc3MifQ.tJTEbZmVDksqgYnOa_JKl5sSBr0aRj8HkwBmg6X09O0" ,
  //09357792770
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzE2M2E5YTlkNTdkOTNmZmJhZDcxIiwiaWF0IjoxNzI2ODI0MTEyLCJleHAiOjE3MjY5MTA1MTIsInR5cGUiOiJhY2Nlc3MifQ.EFT6obc9WINbDfxYDwcRLZfn-B5Jlg5NDJO_IDZ9P40",
  //09036567864
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlYzEwNTc2M2Y3Mzg1MGY4M2ZkN2Y1IiwiaWF0IjoxNzI2ODI2OTM4LCJleHAiOjE3MjY5MTMzMzgsInR5cGUiOiJhY2Nlc3MifQ.MoV11oV77jJtglZCqM6Mfnft01nj6RL8nAqMvx7mNiE",
  //09197473984
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTAzZDk1NGI2OTAxNzgwMDk5ZWE5IiwiaWF0IjoxNzI2ODc0NTg2LCJleHAiOjE3MjY5NjA5ODYsInR5cGUiOiJhY2Nlc3MifQ.7ScySwuYovsGLAeBQeMs3qtua-1SphFrGWYEjI-cC6g",
  //09045087864
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0NWMxMjM0Y2ZkYTZlZDc5Yjk5IiwiaWF0IjoxNzI2ODc0NzE3LCJleHAiOjE3MjY5NjExMTcsInR5cGUiOiJhY2Nlc3MifQ.qAFS2VbAmEbxMG9AiNUNnMuOT0dMT10_df81f0VAgvQ",
  //09365087864
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA0ZTEyYTgxMGEwYjQ1OGJjMjI1IiwiaWF0IjoxNzI2ODc0ODQ5LCJleHAiOjE3MjY5NjEyNDksInR5cGUiOiJhY2Nlc3MifQ.rrJdfY1zjMfY0VTF5zjp9XJye-d2fFGcZJHhaaYSJRU",
  //09191493905
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZlZTA2NWEyYTgxMGEwYjQ1OGQ0NWU0IiwiaWF0IjoxNzI2ODc1MjI3LCJleHAiOjE3MjY5NjE2MjcsInR5cGUiOiJhY2Nlc3MifQ.gURfL4UOFBrkblB7rf9WsCV5stgaQVLSy0YyHaqMyGs",
  //09303884022
];

interface Mission {
  _id: string;
  reward: number;
  status: boolean;
}

async function fetchMissionsForTokens(): Promise<void> {
  let total = 0;
  for (const token of tokens) {
      console.log(`Processing token: ${token}`);

      try {
          const response = await fetch("https://api-mission.goatsbot.xyz/missions/user/", {
              method: "GET",
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });

          const data: { [key: string]: Mission[] } = await response.json();
          const inactiveMissions: string[] = [];
          let totalCoins = 0;

          for (const [key, missions] of Object.entries(data)) {
              const filteredMissions = missions.filter((mission: Mission) => !mission.status);

              filteredMissions.forEach((mission: Mission) => {
                  inactiveMissions.push(mission._id);
                  totalCoins += mission.reward;
              });
          }
          total += totalCoins;
          console.log(`Inactive Mission IDs`, inactiveMissions);
          console.log(`Total Coins`, totalCoins);
          console.log(`Total`, total);

          for (const missionId of inactiveMissions) {
              const actionResponse = await fetch(`https://dev-api.goatsbot.xyz/missions/action/${missionId}`, {
                  method: "POST",
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              });

              if (actionResponse.ok) {
                  console.log(`Action executed for mission ID: ${missionId}`);
              } else {
                  console.error(`Failed to execute action for mission ID: ${missionId}`);
              }
          }

      } catch (error) {
          console.error(`Error for token ${token}:`, error);
      }
  }
}

// فراخوانی تابع
fetchMissionsForTokens();
