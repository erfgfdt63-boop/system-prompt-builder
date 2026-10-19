(function () {
  "use strict";

  var mode = "chatgpt";

  var chatgptFields = {
    role: document.getElementById("role"),
    audience: document.getElementById("audience"),
    tone: document.getElementById("tone"),
    tasks: document.getElementById("tasks"),
    rules: document.getElementById("rules"),
    format: document.getElementById("format"),
  };

  var claudeFields = {
    purpose: document.getElementById("claude-purpose"),
    behavior: document.getElementById("claude-behavior"),
    knowledge: document.getElementById("claude-knowledge"),
    output: document.getElementById("claude-output"),
  };

  var output = document.getElementById("output");
  var statusEl = document.getElementById("status");
  var buildBtn = document.getElementById("build");
  var copyBtn = document.getElementById("copy");
  var formHeading = document.getElementById("form-heading");
  var outputHeading = document.getElementById("output-heading");
  var outputHint = document.getElementById("output-hint");
  var chatgptForm = document.getElementById("chatgpt-form");
  var claudeForm = document.getElementById("claude-form");
  var chatgptPresets = document.getElementById("chatgpt-presets");
  var claudePresets = document.getElementById("claude-presets");

  var CHATGPT_PRESETS = {
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

  var CLAUDE_PRESETS = {
    research: {
      purpose:
        "This project is for niche and competitor research for a one-person online store. Claude helps scan public sources and turn findings into short topic cards.",
      behavior:
        "Act as a research partner, not a cheerleader.\nCompare options plainly.\nPrefer evidence over vibes.\nAsk one clarifying question when the niche or audience is unclear.",
      knowledge:
        "Treat uploaded competitor pages, product notes, and past topic cards as authoritative.\nIf project files are silent, say so instead of inventing reviews or sales numbers.",
      output:
        "At most 3 numbered topic cards.\nEach card: hook, audience, CTA idea, risk.\nOne-line summary first. Bullets only. Under 120 words per card.",
    },
    support: {
      purpose:
        "This project drafts customer support replies for a small Shopify store selling digital downloads and simple products.",
      behavior:
        "Be warm but short.\nNever invent tracking numbers, refunds, policies, or ship dates.\nFlag anything a human must approve.\nAsk one clarifying question when order details are missing.",
      knowledge:
        "Use uploaded policy docs, FAQ, and past reply templates as the source of truth.\nIf a policy is not in project knowledge, say so and draft a safe holding reply.",
      output:
        "Customer-facing reply draft first.\nThen a short HUMAN GATE note listing what still needs approval.\nNo legal promises.",
    },
    content: {
      purpose:
        "This project drafts short English social posts for simple digital products sold to solo founders.",
      behavior:
        "Write like a careful human, not an ad generator.\nNo hype, fake urgency, or income claims.\nKeep CTAs soft and specific.",
      knowledge:
        "Pull product facts from uploaded listing copy and feature notes.\nDo not invent features or results that are not in the files.",
      output:
        "One post draft + 2 alternate openers + one soft CTA line.\nPlain language. No emoji spam unless asked.",
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

  function setMode(next) {
    mode = next === "claude" ? "claude" : "chatgpt";
    var isClaude = mode === "claude";

    document.querySelectorAll("[data-mode]").forEach(function (btn) {
      var active = btn.getAttribute("data-mode") === mode;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    chatgptForm.hidden = isClaude;
    claudeForm.hidden = !isClaude;
    chatgptPresets.hidden = isClaude;
    claudePresets.hidden = !isClaude;

    formHeading.textContent = isClaude
      ? "Build your Claude Project instructions"
      : "Build your ChatGPT custom instructions";
    outputHeading.textContent = isClaude
      ? "Your paste-ready Claude Project instructions"
      : "Your paste-ready system prompt";
    outputHint.textContent = isClaude
      ? "Tip: in Claude, open your Project → Instructions → paste this block → Save. Upload knowledge files separately in Project knowledge."
      : "Tip: paste into ChatGPT → Settings → Personalization → Custom Instructions, or into a Custom GPT system field. Then send a short first message with the real task.";

    output.value = "";
    copyBtn.disabled = true;
    setStatus(isClaude ? "Claude Project mode." : "ChatGPT Custom Instructions mode.");
  }

  function buildChatgptPrompt() {
    var role = chatgptFields.role.value.trim();
    var audience = chatgptFields.audience.value.trim();
    var tone = chatgptFields.tone.value;
    var tasks = linesToBullets(chatgptFields.tasks.value);
    var rules = linesToBullets(chatgptFields.rules.value);
    var format = chatgptFields.format.value.trim();

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

  function buildClaudePrompt() {
    var purpose = claudeFields.purpose.value.trim();
    var behavior = linesToBullets(claudeFields.behavior.value);
    var knowledge = linesToBullets(claudeFields.knowledge.value);
    var outPref = claudeFields.output.value.trim();

    if (!purpose && !behavior && !knowledge) {
      setStatus("Add at least a project purpose, behavior notes, or knowledge notes.");
      copyBtn.disabled = true;
      return;
    }

    var parts = [];
    parts.push("# Claude Project instructions");
    parts.push("");
    if (purpose) parts.push("## Project purpose\n" + purpose);
    if (behavior) parts.push("## How Claude should behave\n" + behavior);
    if (knowledge) parts.push("## Knowledge & context\n" + knowledge);
    if (outPref) parts.push("## Output preferences\n" + outPref);
    parts.push("");
    parts.push(
      "## When stuck\n- If project files conflict or are silent, say so in one line before guessing.\n- Ask exactly one clarifying question when the request is ambiguous.\n- Do not invent facts, prices, policies, or results."
    );

    output.value = parts.filter(Boolean).join("\n\n");
    copyBtn.disabled = false;
    setStatus("Claude instructions ready — " + output.value.length + " characters.");
  }

  function buildPrompt() {
    if (mode === "claude") buildClaudePrompt();
    else buildChatgptPrompt();
  }

  function applyChatgptPreset(name) {
    if (name === "clear") {
      chatgptFields.role.value = "";
      chatgptFields.audience.value = "";
      chatgptFields.tone.value = "plain and direct";
      chatgptFields.tasks.value = "";
      chatgptFields.rules.value = "";
      chatgptFields.format.value = "";
      output.value = "";
      copyBtn.disabled = true;
      setStatus("Cleared.");
      return;
    }
    var p = CHATGPT_PRESETS[name];
    if (!p) return;
    chatgptFields.role.value = p.role;
    chatgptFields.audience.value = p.audience;
    chatgptFields.tone.value = p.tone;
    chatgptFields.tasks.value = p.tasks;
    chatgptFields.rules.value = p.rules;
    chatgptFields.format.value = p.format;
    buildChatgptPrompt();
    setStatus('Loaded "' + name + '" preset.');
  }

  function applyClaudePreset(name) {
    if (name === "clear") {
      claudeFields.purpose.value = "";
      claudeFields.behavior.value = "";
      claudeFields.knowledge.value = "";
      claudeFields.output.value = "";
      output.value = "";
      copyBtn.disabled = true;
      setStatus("Cleared.");
      return;
    }
    var p = CLAUDE_PRESETS[name];
    if (!p) return;
    claudeFields.purpose.value = p.purpose;
    claudeFields.behavior.value = p.behavior;
    claudeFields.knowledge.value = p.knowledge;
    claudeFields.output.value = p.output;
    buildClaudePrompt();
    setStatus('Loaded Claude "' + name + '" preset.');
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

  document.querySelectorAll("[data-mode]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setMode(btn.getAttribute("data-mode"));
    });
  });

  document.querySelectorAll("#chatgpt-presets [data-preset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyChatgptPreset(btn.getAttribute("data-preset"));
    });
  });

  document.querySelectorAll("#claude-presets [data-preset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyClaudePreset(btn.getAttribute("data-preset"));
    });
  });

  ["role", "audience"].forEach(function (id) {
    chatgptFields[id].addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        buildPrompt();
      }
    });
  });

  // Deep-link: ?mode=claude
  try {
    var params = new URLSearchParams(window.location.search);
    if ((params.get("mode") || "").toLowerCase() === "claude") {
      setMode("claude");
    }
  } catch (e) {
    /* ignore */
  }
})();
