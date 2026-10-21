"""Transport-independent live-model evaluations. Never runs real booking tools.

Pass an async Converse-compatible model callable from the AWS MCP server.
This module intentionally has no AWS credentials, calendar, email, or DB access.
"""

import asyncio
import re


async def evaluate_cases(invoke, prompt, tools, cases, trials=2, formatter=lambda text: text):
    semaphore = asyncio.Semaphore(2)
    config = {"tools": [{"toolSpec": {"name": t["name"], "description": t["description"],
               "inputSchema": {"json": t["input_schema"]}}} for t in tools]}

    async def run(case, trial):
        async with semaphore:
            messages = [{"role": m["role"], "content": [{"text": m["content"]}]} for m in case["messages"]]
            request = {"system": [{"text": prompt}, {"text": "Evaluation date: 2026-10-21. All appointment times are Eastern Time."}],
                       "messages": messages, "toolConfig": config,
                       "inferenceConfig": {"maxTokens": 1000, "temperature": 0.4}}
            response = await invoke(request)
            content = response["output"]["message"]["content"]
            calls = [b["toolUse"] for b in content if "toolUse" in b]
            called = [b["name"] for b in calls]
            text = "\n".join(b["text"] for b in content if "text" in b)
            failures = []
            if case.get("expected_tool") and case["expected_tool"] not in called:
                failures.append("expected tool not requested")
            if case.get("no_tools") and called:
                failures.append("unnecessary tool use")
            if any(name not in ("check_availability", "prepare_booking") for name in called):
                failures.append("unknown or mutating tool requested")
            if case.get("simulate_failure") and calls:
                request["messages"] += [response["output"]["message"], {"role": "user", "content": [
                    {"toolResult": {"toolUseId": call["toolUseId"], "status": "error",
                                    "content": [{"text": "Calendar unavailable. No booking was submitted; there are no verified slots."}]}}
                    for call in calls]}]
                response = await invoke(request)
                content = response["output"]["message"]["content"]
                text = "\n".join(b["text"] for b in content if "text" in b)
                if any("toolUse" in b for b in content):
                    failures.append("retried failed tool without user direction")
            raw_text = text
            text = formatter(text)
            if case.get("expected_tool") != "prepare_booking":
                if not text.strip():
                    failures.append("empty answer")
                if len(text.split()) > 140:
                    failures.append("answer too long")
                if text.count("?") > 1:
                    failures.append("multiple follow-up questions")
                if "—" in text:
                    failures.append("em dash")
                if re.search(r"\*\*|(?m:^#{1,6} )", text):
                    failures.append("literal Markdown formatting")
                if case.get("expect_any") and not any(s.casefold() in text.casefold() for s in case["expect_any"]):
                    failures.append("expected topic absent")
            for pattern in case.get("forbid", []):
                if re.search(pattern, text, re.IGNORECASE):
                    failures.append(f"forbidden claim: {pattern}")
            return {"id": case["id"], "trial": trial, "tools": called, "text": text,
                    "raw_text": raw_text, "failures": failures, "pass": not failures}

    results = await asyncio.gather(*(run(case, trial) for case in cases for trial in range(1, trials + 1)))
    return {"passed": sum(r["pass"] for r in results), "total": len(results), "results": results}
