import { mkdir, writeFile } from "node:fs/promises";

const username = process.env.GITHUB_USER_NAME;
const token = process.env.GH_TOKEN;

if (!username) {
  throw new Error("GITHUB_USER_NAME is required.");
}

if (!token) {
  throw new Error(
    "GH_TOKEN is missing. Add a repository Actions secret named SNK_GITHUB_TOKEN.",
  );
}

const query = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection(includePrivateContributions: true) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "github-profile-contribution-snake",
  },
  body: JSON.stringify({ query, variables: { login: username } }),
  signal: AbortSignal.timeout(30_000),
});

if (!response.ok) {
  throw new Error(
    `GitHub GraphQL request failed: ${response.status} ${response.statusText}`,
  );
}

const result = await response.json();
if (result.errors?.length) {
  throw new Error(
    `GitHub GraphQL returned an error: ${result.errors.map(({ message }) => message).join("; ")}`,
  );
}

const weeks = result.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
if (!Array.isArray(weeks) || weeks.length === 0) {
  throw new Error(`GitHub returned no contribution calendar for ${username}.`);
}

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};
const cells = weeks.flatMap((week, column) =>
  week.contributionDays.map((day) => {
    const level = levels[day.contributionLevel];
    if (
      level === undefined ||
      !Number.isInteger(day.weekday) ||
      day.weekday < 0 ||
      day.weekday > 6
    ) {
      throw new Error("GitHub returned an invalid contribution day.");
    }
    return { column, level, weekday: day.weekday };
  }),
);

const cellSize = 16;
const cellInset = 2;
const cellSide = 12;
const width = weeks.length * cellSize;
const height = 7 * cellSize;
const route = [];

for (let column = 0; column < weeks.length; column += 1) {
  const rows = column % 2 === 0 ? [0, 1, 2, 3, 4, 5, 6] : [6, 5, 4, 3, 2, 1, 0];
  for (const row of rows) {
    route.push(`${column * cellSize + cellSize / 2},${row * cellSize + cellSize / 2}`);
  }
}

const path = route.map((point, index) => `${index === 0 ? "M" : "L"}${point}`).join("");
const routeLength = (route.length - 1) * cellSize;
const snakeLength = Math.min(64, routeLength / 3);
const gapLength = routeLength - snakeLength;
const animationSeconds = Math.max(24, Math.round(routeLength / 100));
const palette = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function makeSvg(theme) {
  const cellsSvg = cells
    .map((cell) => {
      const x = cell.column * cellSize + cellInset;
      const y = cell.weekday * cellSize + cellInset;
      return `<rect x="${x}" y="${y}" width="${cellSide}" height="${cellSide}" rx="2" fill="${palette[theme][cell.level]}"/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Animated contribution snake">
  <style>
    .snake { fill: none; stroke: #a371f7; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: ${snakeLength} ${gapLength}; animation: slither ${animationSeconds}s linear infinite; }
    @keyframes slither { to { stroke-dashoffset: -${routeLength}; } }
    @media (prefers-reduced-motion: reduce) { .snake { animation: none; stroke-dashoffset: 0; } }
  </style>
  ${cellsSvg}
  <path class="snake" d="${path}"/>
</svg>
`;
}

await mkdir("dist", { recursive: true });
await Promise.all([
  writeFile("dist/github-contribution-grid-snake.svg", makeSvg("light")),
  writeFile("dist/github-contribution-grid-snake-dark.svg", makeSvg("dark")),
]);

console.log(
  `Generated light and dark snake SVGs from ${cells.length} contribution days across ${weeks.length} weeks.`,
);
