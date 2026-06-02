const translations = {
  fr: {
    meta: { title: "Julien Marquet — Web CV" },
    profile: {
      name: "Julien Marquet",
      tagline:
        "Développeur fullstack TypeScript avec une appétence particulière pour le backend, l’architecture et les systèmes.",
      location: "Lyon, France",
      focus: "Backend · Architecture · Cloud",
    },
    sections: {
      contact: "Contact",
      focus: "Focus",
      coreStack: "Core Stack",
      language: "Langue",
      selectedProject: "Projet sélectionné",
      experience: "Expérience",
    },
    hero: {
      role: "Développeur Fullstack / Backend TypeScript",
      title: "Construire des applications web robustes, lisibles et maintenables.",
      description:
        "Profil orienté backend et conception logicielle, avec une expérience fullstack TypeScript, des sujets cloud/devops et une sensibilité architecture.",
    },
    highlights: {
      typescript: {
        title: "TypeScript",
        text: "Stack principale web & backend.",
      },
      backend: {
        title: "Backend",
        text: "API, données, architecture.",
      },
      infra: {
        title: "Infra",
        text: "Cloud, CI/CD, observabilité.",
      },
    },
    project: {
      name: "Pulse Analytics",
      description:
        "Plateforme d'analytics événementielle : ingestion d’événements, traitement asynchrone, agrégations, dashboard et observabilité.",
      stack: "TypeScript · NestJS · PostgreSQL · BullMQ · React",
    },
    skills: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "React",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Architecture logicielle",
    ],
    experiences: [
      {
        role: "Architecte logiciel",
        company: "Entreprise SaaS assurance",
        period: "2022 — 2023",
        description:
          "Architecture applicative, optimisation cloud AWS, monitoring, sécurité applicative et accompagnement technique des équipes.",
        tags: ["AWS", "Terraform", "Monitoring", "Sécurité"],
      },
      {
        role: "Développeur fullstack",
        company: "Projets web & SaaS",
        period: "2017 — 2022",
        description:
          "Développement d'applications métier en TypeScript, React, Node.js/NestJS, CI/CD, tests et amélioration de l'architecture applicative.",
        tags: ["React", "Node.js", "CI/CD", "Tests"],
      },
      {
        role: "Développeur web",
        company: "Actitouch",
        period: "2016 — 2017",
        description:
          "Développement frontend et backend sur une plateforme e-commerce avec AngularJS, Node.js, PHP et Prestashop.",
        tags: ["AngularJS", "Node.js", "PHP", "E-commerce"],
      },
    ],
  },

  en: {
    meta: { title: "Julien Marquet — Web Resume" },
    profile: {
      name: "Julien Marquet",
      tagline:
        "Fullstack TypeScript developer with a strong interest in backend engineering, architecture and systems.",
      location: "Lyon, France",
      focus: "Backend · Architecture · Cloud",
    },
    sections: {
      contact: "Contact",
      focus: "Focus",
      coreStack: "Core Stack",
      language: "Language",
      selectedProject: "Selected project",
      experience: "Experience",
    },
    hero: {
      role: "Fullstack / Backend TypeScript Developer",
      title: "Building robust, readable and maintainable web applications.",
      description:
        "Backend-oriented software developer with fullstack TypeScript experience, cloud/devops exposure and a strong architecture mindset.",
    },
    highlights: {
      typescript: {
        title: "TypeScript",
        text: "Main web & backend stack.",
      },
      backend: {
        title: "Backend",
        text: "APIs, data, architecture.",
      },
      infra: {
        title: "Infra",
        text: "Cloud, CI/CD, observability.",
      },
    },
    project: {
      name: "Pulse Analytics",
      description:
        "Event analytics platform: event ingestion, asynchronous processing, aggregations, dashboard and observability.",
      stack: "TypeScript · NestJS · PostgreSQL · BullMQ · React",
    },
    skills: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "React",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Software Architecture",
    ],
    experiences: [
      {
        role: "Software Architect",
        company: "Insurance SaaS company",
        period: "2022 — 2023",
        description:
          "Application architecture, AWS cloud optimization, monitoring, application security and technical support for development teams.",
        tags: ["AWS", "Terraform", "Monitoring", "Security"],
      },
      {
        role: "Fullstack Developer",
        company: "Web & SaaS projects",
        period: "2017 — 2022",
        description:
          "Business web applications built with TypeScript, React, Node.js/NestJS, CI/CD, testing and application architecture improvements.",
        tags: ["React", "Node.js", "CI/CD", "Testing"],
      },
      {
        role: "Web Developer",
        company: "Actitouch",
        period: "2016 — 2017",
        description:
          "Frontend and backend development on an e-commerce platform using AngularJS, Node.js, PHP and Prestashop.",
        tags: ["AngularJS", "Node.js", "PHP", "E-commerce"],
      },
    ],
  },
};

function getNestedValue(source, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), source);
}

function renderStaticTranslations(lang) {
  const dict = translations[lang];

  document.documentElement.lang = lang;
  document.title = dict.meta.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = getNestedValue(dict, key);
    if (typeof value === "string") node.textContent = value;
  });
}

function renderSkills(lang) {
  const list = document.querySelector("#skills-list");
  list.innerHTML = "";

  translations[lang].skills.forEach((skill) => {
    const item = document.createElement("span");
    item.className = "chip";
    item.textContent = skill;
    list.appendChild(item);
  });
}

function renderExperience(lang) {
  const list = document.querySelector("#experience-list");
  list.innerHTML = "";

  translations[lang].experiences.forEach((experience) => {
    const article = document.createElement("article");
    article.className = "timeline-item";

    article.innerHTML = `
      <div class="timeline-header">
        <h4>${experience.role}</h4>
        <span class="period">${experience.period}</span>
      </div>
      <p class="company">${experience.company}</p>
      <p class="description">${experience.description}</p>
      <div class="tag-list">
        ${experience.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    list.appendChild(article);
  });
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  localStorage.setItem("webcv-language", lang);

  renderStaticTranslations(lang);
  renderSkills(lang);
  renderExperience(lang);

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    const isActive = button.dataset.langButton === lang;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = localStorage.getItem("webcv-language") || "fr";

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.langButton));
  });

  setLanguage(defaultLang);
});
