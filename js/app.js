const data = window.DASHBOARD_DATA;

const pages = [
  { id: "overview", label: "Overview" },
  { id: "channels", label: "Channels" },
  { id: "engagement", label: "Engagement" },
  { id: "portals", label: "Portals" },
  { id: "funnel", label: "Funnel" },
  { id: "recommendations", label: "Recs" },
];

let channelCharts = [];

function formatNumber(n) {
  return n.toLocaleString("da-DK");
}

function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = pages
    .map(
      (p, i) =>
        `<button class="nav-btn${i === 0 ? " active" : ""}" data-page="${p.id}">${p.label}</button>`
    )
    .join("");

  nav.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });
}

function getPageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "overview";
}

function showPage(id) {
  document.querySelectorAll(".page").forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((el) => el.classList.remove("active"));

  document.getElementById(`page-${id}`)?.classList.add("active");
  document.querySelector(`[data-page="${id}"]`)?.classList.add("active");

  const params = new URLSearchParams(window.location.search);
  if (params.get("page") !== id) {
    params.set("page", id);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    history.replaceState(null, "", newUrl);
  }

  if (id === "channels" && channelCharts.length) {
    channelCharts.forEach((chart) => chart.update());
  }
}

function createBarChart(canvasId, label, values, colors) {
  const ctx = document.getElementById(canvasId);
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.channels.rows.map((r) => r.name),
      datasets: [
        {
          label,
          data: values,
          backgroundColor: colors.map((c) => c + "99"),
          borderColor: colors,
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: { color: "#abb8c3", font: { family: "Roboto", size: 11 } },
          grid: { color: "#333" },
        },
        y: {
          ticks: { color: "#abb8c3", font: { family: "Roboto", size: 11 } },
          grid: { color: "#333" },
        },
      },
    },
  });
}

function renderOverview() {
  const el = document.getElementById("page-overview");
  const { overview } = data;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${overview.title}</h1>
      <p class="page-subtitle">${overview.subtitle}</p>
    </header>
    <div class="kpi-grid">
      ${overview.kpis
        .map(
          (k) => `
        <div class="kpi-card">
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-value">${k.value}</div>
        </div>`
        )
        .join("")}
    </div>
    <div class="callout">
      <strong>Status</strong>
      ${overview.summary}
    </div>
    <div class="callout" style="margin-top:16px;border-left-color:var(--chart-orange)">
      <strong>Konklusion</strong>
      ${overview.conclusion}
    </div>
  `;
}

function renderChannels() {
  const el = document.getElementById("page-channels");
  const { channels } = data;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${channels.title}</h1>
      <p class="page-subtitle">${channels.subtitle}</p>
    </header>
    <div class="chart-grid">
      <div class="card">
        <div class="section-label">Eksponeringer</div>
        <div class="chart-wrap"><canvas id="channelChartExposures"></canvas></div>
      </div>
      <div class="card">
        <div class="section-label">Klik</div>
        <div class="chart-wrap"><canvas id="channelChartClicks"></canvas></div>
      </div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead>
          <tr><th>Kanal</th><th>Eksponeringer</th><th>Klik</th></tr>
        </thead>
        <tbody>
          ${channels.rows
            .map(
              (r) => `
            <tr>
              <td><span class="channel-dot" style="background:${r.color}"></span>${r.name}</td>
              <td>${formatNumber(r.exposures)}</td>
              <td>${formatNumber(r.clicks)}</td>
            </tr>`
            )
            .join("")}
          <tr class="total-row">
            <td>Samlet</td>
            <td>${formatNumber(channels.total.exposures)}</td>
            <td>${formatNumber(channels.total.clicks)}</td>
          </tr>
        </tbody>
      </table>
      <div class="channel-notes">
        ${channels.rows
          .map((r) => `<div class="channel-note"><strong>${r.name}:</strong> ${r.note}</div>`)
          .join("")}
      </div>
    </div>
    <div class="callout" style="margin-top:20px">
      <strong>Vurdering</strong>
      ${channels.assessment}
    </div>
  `;

  channelCharts.forEach((chart) => chart.destroy());
  channelCharts = [
    createBarChart(
      "channelChartExposures",
      "Eksponeringer",
      channels.rows.map((r) => r.exposures),
      channels.rows.map((r) => r.color)
    ),
    createBarChart(
      "channelChartClicks",
      "Klik",
      channels.rows.map((r) => r.clicks),
      channels.rows.map((r) => r.color)
    ),
  ];
}

function renderEngagement() {
  const el = document.getElementById("page-engagement");
  const { engagement } = data;
  const pct = engagement.percentage;
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (pct / 100) * circumference;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${engagement.title}</h1>
      <p class="page-subtitle">${engagement.subtitle}</p>
    </header>
    <div class="card">
      <div class="engagement-visual">
        <div class="engagement-ring">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle class="engagement-ring-bg" cx="100" cy="100" r="88"/>
            <circle class="engagement-ring-fill" cx="100" cy="100" r="88"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${offset}"/>
          </svg>
          <div class="engagement-pct">${pct}%</div>
        </div>
        <div class="engagement-text">
          <p>${engagement.description}</p>
          <div class="callout" style="margin:0">
            <strong>Indsigt</strong>
            ${engagement.insight}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPortals() {
  const el = document.getElementById("page-portals");
  const { portals } = data;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${portals.title}</h1>
      <p class="page-subtitle">${portals.subtitle}</p>
    </header>
    <div class="portal-grid">
      ${portals.items
        .map((portal) => {
          const headers = Object.keys(portal.periods[0]).filter((k) => k !== "label");
          return `
          <div class="card">
            <h3 class="portal-name">${portal.name}</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Periode</th>
                  ${headers.map((h) => `<th>${h}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${portal.periods
                  .map(
                    (row) => `
                  <tr>
                    <td>${row.label}</td>
                    ${headers.map((h) => `<td>${typeof row[h] === "number" ? formatNumber(row[h]) : row[h]}</td>`).join("")}
                  </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
            <p class="portal-note">${portal.note}</p>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function renderFunnel() {
  const el = document.getElementById("page-funnel");
  const { funnel } = data;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${funnel.title}</h1>
      <p class="page-subtitle">${funnel.subtitle}</p>
    </header>
    <div class="funnel">
      ${funnel.stages
        .map(
          (s, i) => `
        <div class="funnel-step" style="--step-width:${100 - i * 8}%">
          <span class="funnel-step-num">${i + 1}</span>
          <div class="funnel-step-content">
            <span class="funnel-label">${s.label}</span>
            <span class="funnel-value">${s.value}</span>
          </div>
        </div>
        ${i < funnel.stages.length - 1 ? '<div class="funnel-arrow" aria-hidden="true">↓</div>' : ""}`
        )
        .join("")}
    </div>
    <div class="callout">
      <strong>Udfordringen</strong>
      ${funnel.challenge}
    </div>
  `;
}

function renderRecommendations() {
  const el = document.getElementById("page-recommendations");
  const { recommendations } = data;

  el.innerHTML = `
    <header class="page-header">
      <div class="page-client">${data.client} · ${data.period}</div>
      <h1 class="page-title">${recommendations.title}</h1>
      <p class="page-subtitle">${recommendations.subtitle}</p>
    </header>
    <div class="card">
      <ol class="rec-list">
        ${recommendations.items.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </div>
    <div class="card">
      <div class="section-label">Arbejdsmodel</div>
      <div class="work-model">
        ${recommendations.workModel
          .map((step, i) => {
            const arrow = i < recommendations.workModel.length - 1 ? '<span class="work-arrow">→</span>' : "";
            return `<span class="work-step">${step}</span>${arrow}`;
          })
          .join("")}
      </div>
    </div>
    <div class="callout" style="margin-top:20px;border-left-color:var(--chart-green)">
      <strong>Næste fase</strong>
      ${recommendations.closing}
    </div>
  `;
}

function init() {
  renderNav();
  renderOverview();
  renderChannels();
  renderEngagement();
  renderPortals();
  renderFunnel();
  renderRecommendations();
  const initialPage = getPageFromUrl();
  showPage(pages.some((p) => p.id === initialPage) ? initialPage : "overview");
}

document.addEventListener("DOMContentLoaded", init);
