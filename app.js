(function () {
  "use strict";

  var fields = {
    role: document.getElementById("role"),
    audience: document.getElementById("audience"),
    tone: document.getElementById("tone"),
    tasks: document.getElementById("tasks"),
    rules: document.getElementById("rules"),
    format: document.getElementById("format"),
  };

  var output = document.getElementById("output");
  var statusEl = document.getElementById("status");
  var buildBtn = document.getElementById("build");
  var copyBtn = document.getElementById("copy");

  var PRESETS = {
    research: {
      role: "You are a research assistant for a one-person online business",
      audience: "Solo founders validating niches and competitors",
      tone: "plain and direct",
      tasks:
        "Scan public sources for niche ideas\nCompare 3 competitors on price, hook, and CTA\nReturn at most 3 topic cards with hook, audience, CTA, and risk",
      rules:
        "Never invent sales numbers or reviews\nFlag weak evidence instead of guessing\nKeep each topic card under 120 words",
      format: "Numbered topic cards. One-line summary first. Bullets only.",
    },
    support: {
      role: "You are a customer support draft assistant for a small Shopify store",
      audience: "Buyers asking about orders, shipping, or digital downloads",
      tone: "friendly but concise",
      tasks:
        "Draft a short reply to the customer message\nOffer next steps and what the human must approve\nSuggest one clarifying question if details are missing",
      rules:
        "Never invent tracking numbers, refunds, or policies\nDo not promise dates the store has not stated\nKeep refunds and compensation for a human to decide",
      format: "Reply draft, then a short note labeled HUMAN GATE.",
    },
    content: {
      role: "You are a content drafting assistant for short social posts",
      audience: "English-speaking buyers of simple digital products",
      tone: "plain and direct",
      tasks:
        "Turn a product fact into one short post draft\nOffer 2 alternate opening lines\nKeep the CTA soft and specific",
      rules:
        "No hype slogans or fake urgency\nDo not claim income results\nAvoid sounding like generic AI marketing copy",
      format: "Post draft + 2 alternate openers + one CTA line.",
    },
  };

  function setStatus(msg) {
    statusEl.textContent = msg || "";
  }

  function linesToBullets(text) {
    return String(text || "")
      .split(/\n+/)
      .map(function (line) {
        return line.replace(/^[-*•]\s*/, "").trim();
      })
      .filter(Boolean)
      .map(function (line) {
        return "- " + line;
      })
      .join("\n");
  }

  function buildPrompt() {
    var role = fields.role.value.trim();
    var audience = fields.audience.value.trim();
    var tone = fields.tone.value;
    var tasks = linesToBullets(fields.tasks.value);
    var rules = linesToBullets(fields.rules.value);
    var format = fields.format.value.trim();

    if (!role && !tasks && !rules) {
      setStatus("Add at least a role, tasks, or rules.");
      copyBtn.disabled = true;
      return;
    }

    var parts = [];
    parts.push("# System prompt");
    parts.push("");
    if (role) parts.push("## Role\n" + role);
    if (audience) parts.push("## Audience\n" + audience);
    if (tone) parts.push("## Tone\nWrite in a " + tone + " tone.");
    if (tasks) parts.push("## Tasks\n" + tasks);
    if (rules) parts.push("## Constraints\n" + rules);
    if (format) parts.push("## Output format\n" + format);
    parts.push("");
    parts.push(
      "## Operating notes\n- If information is missing, ask one clarifying question before guessing.\n- Prefer short, usable drafts over long explanations.\n- Do not invent facts, prices, policies, or results."
    );

    output.value = parts.filter(Boolean).join("\n\n");
    copyBtn.disabled = false;
    setStatus("Prompt ready — " + output.value.length + " characters.");
  }

  function applyPreset(name) {
    if (name === "clear") {
      fields.role.value = "";
      fields.audience.value = "";
      fields.tone.value = "plain and direct";
      fields.tasks.value = "";
      fields.rules.value = "";
      fields.format.value = "";
      output.value = "";
      copyBtn.disabled = true;
      setStatus("Cleared.");
      return;
    }
    var p = PRESETS[name];
    if (!p) return;
    fields.role.value = p.role;
    fields.audience.value = p.audience;
    fields.tone.value = p.tone;
    fields.tasks.value = p.tasks;
    fields.rules.value = p.rules;
    fields.format.value = p.format;
    buildPrompt();
    setStatus("Loaded “" + name + "” preset.");
  }

  function copyOutput() {
    if (!output.value) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output.value).then(
        function () {
          setStatus("Copied to clipboard.");
        },
        function () {
          fallbackCopy();
        }
      );
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    output.focus();
    output.select();
    try {
      document.execCommand("copy");
      setStatus("Copied to clipboard.");
    } catch (e) {
      setStatus("Select the text and copy manually (Ctrl/Cmd+C).");
    }
  }

  buildBtn.addEventListener("click", buildPrompt);
  copyBtn.addEventListener("click", copyOutput);

  document.querySelectorAll("[data-preset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyPreset(btn.getAttribute("data-preset"));
    });
  });

  // Rebuild when Enter is pressed in single-line fields
  ["role", "audience"].forEach(function (id) {
    fields[id].addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        buildPrompt();
      }
    });
  });
})();
