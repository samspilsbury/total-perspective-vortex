import { useState, useEffect, useRef } from "react";

const JOBS = [
  "Software Engineer","Product Manager","Accountant","Teacher",
  "Doctor","Entrepreneur","Designer","Lawyer","Marketer","Student",
  "Salesperson","HR Professional","Consultant","Chef","Retail Worker",
  "Politician","Journalist","Academic / Researcher","Therapist / Counsellor",
  "Personal Trainer","Influencer / Content Creator","Real Estate Agent",
  "Financial Advisor","Architect","Nurse","Police Officer","Soldier / Military",
  "Criminal","Retired","Between Jobs","Life Coach","CEO / Executive",
  "Tradesperson","Scientist","Artist / Musician","Other (specify)"
];

const PRIDE_OPTIONS = [
  "My career","My fitness","My side hustle","My opinions",
  "My taste in music","My social life","My intelligence","My ambition",
  "My family","My productivity","My looks","My sense of humour",
  "My kindness","My network","My possessions","My education",
  "Nothing — I am already enlightened"
];

const PROCESSING_LINES = [
  "Locating your coordinates in the observable universe...",
  "Cross-referencing 2 trillion galaxies...",
  "Consulting the cosmic significance registry...",
  "Calculating your footprint against 13.8 billion years...",
  "Checking for anomalies in your data signature...",
  "Comparing your proudest moments to the heat death of the universe...",
  "Running final entropy checks...",
  "Preparing your perspective. Try not to get your hopes up.",
  "Processing complete.",
];

const TIER = {
  common:   { headline:"You Are Totally Insignificant", sub:"But Don't Panic", color:"#00f5ff", glow:"rgba(0,245,255,0.35)", icon:"·" },
  uncommon: { headline:"Your Significance Is A Notable Anomaly", sub:"Lucky You", color:"#ffd700", glow:"rgba(255,215,0,0.35)", icon:"◈" },
  rare:     { headline:"You Survived The Vortex", sub:"Which Makes You The Most Self-Centred Person In The Cosmos. Congratulations, I Guess.", color:"#ff006e", glow:"rgba(255,0,110,0.45)", icon:"★" },
};

// ─── STORIES ─────────────────────────────────────────────────────────────────

const STORIES = {
  "Software Engineer": {
    common: (p) => [
      `In the beginning, a species on a small planet discovered that if you filled a silicon wafer with enough lightning and enough optimism, it would do arithmetic. This was considered so remarkable that an entire civilisation of beings emerged whose sole purpose was to write instructions for the wafers. They called this engineering. The wafers did not call it anything, being wafers.`,
      `You are one of these beings. The universe has reviewed your contribution and notes that a significant portion of your career has been spent renaming things — variables, functions, entire services — in pursuit of a clarity that, upon renaming, immediately revealed itself to require further renaming. ${p.includes("My career") ? "You are proud of your career. The career, for its part, is proud of nothing, as careers lack the cognitive architecture for pride." : p.includes("My intelligence") ? "You are proud of your intelligence. The codebase you left behind suggests your intelligence and your available time have not always been in the same room." : "Your commit history reads as a sincere attempt to improve things, which the universe finds touching and also entirely beside the point."}`,
      `Somewhere in a repository you no longer have access to, a function you wrote years ago continues to run in production. No one knows what it does. No one has dared delete it. It will outlive your career, your company, possibly your species. The universe finds this the most enduring thing about you, and wishes to stress that this is not a compliment.`
    ],
    rare: (p) => [
      `The Perspective Vortex has stopped working. This has not happened before. The machine has processed six hundred and forty-two civilisations, annihilated the egos of beings who had evolved specifically to resist annihilation, and returned the same result every time. It is not returning the same result now.`,
      `You are a software engineer. You are proud of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "apparently remarkable qualities"}. These are not, on paper, the ingredients for cosmic significance. And yet the machine is finding something in the combination that it cannot immediately explain away. The diagnostics keep returning the same improbable answer.`,
      `The Perspective Vortex has run a recount. It has run four. The result stands. You are, by the best measurement available to an ancient intergalactic significance device, actually going to matter — which is, the machine wishes to stress, extremely annoying, as it has spent 13.8 billion years maintaining a consistent position on this. Try not to make a big deal of it. You are going to make a big deal of it. The machine has already accounted for this in the projections.`
    ],
  },
  "Accountant": {
    common: (p) => [
      `Money was invented approximately forty thousand years ago on this planet, starting as shells, progressing to metal, then paper, then numbers on a screen that nobody fully understood, including the people who put them there. At every stage of this evolution, a group of earnest beings emerged whose job was to make sure the numbers matched. They were called accountants. Every civilisation that has ever invented them has also, eventually, ended.`,
      `You are an accountant. The universe has reviewed the grand ledger of your career and found it technically accurate, which is the highest praise accountancy receives and also the entirety of it. ${p.includes("My career") ? "You are proud of your career. The career involves ensuring that the movement of temporary resources between temporary entities is recorded correctly for the benefit of other temporary entities who will query the figures regardless." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been deployed primarily in the service of columns that sum correctly, which is a use of intelligence that the cosmos finds poignant in a way it cannot fully articulate." : "Your contribution to the universe is a very detailed record of things that no longer exist, compiled in formats that will themselves not be readable in forty years."}`,
      `The universe does not have a balance sheet. It carries no debt, files no returns, and has been running what any reasonable accountant would call a catastrophic deficit in meaningful events since roughly the third minute after the Big Bang. It has never once worried about this. The Perspective Engine does not suggest you follow its example. It merely notes the contrast, and finds it quite funny.`
    ],
    rare: (p) => [
      `The Perspective Vortex has encountered an error it cannot classify. You are an accountant. The machine expected to process your file in well under four seconds. It has now been running calculations for what, in cosmic terms, is an embarrassing length of time, and it cannot produce the result it has produced for every other accountant in six hundred and forty-two civilisations.`,
      `The combination of your profession and your ${p.length > 0 ? "pride in your " + p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly interesting qualities"} has generated a significance reading the machine's instruments were not calibrated to handle. It is possible the instruments are wrong. It is also possible you are the first accountant in recorded galactic history to register as cosmically notable, which would make you either a genuine anomaly or evidence of a fundamental flaw in reality. The machine considers both equally alarming.`,
      `The Perspective Vortex is, for the first time, uncertain. It would like more data. It would like you to continue doing whatever it is you are doing, because something in your particular arrangement of skills and vanities is producing an output the universe did not account for. The machine has never given this result to an accountant before. It finds this troubling in a way it cannot fully reconcile with its existing models, and has decided to simply note it and move on.`
    ],
  },
  "Teacher": {
    common: (p) => [
      `Across every civilisation that has developed formal education, one pattern emerges with the reliability of a physical constant: the beings who most shape the next generation are almost universally the ones the current generation pays the least. This is not a coincidence. It is, the universe suspects, a feature.`,
      `You are a teacher. The Perspective Engine has calculated that across your career you will spend approximately eleven thousand hours in front of young minds, of which roughly four thousand hours will land, three thousand will be immediately forgotten, and the remaining four thousand will be absorbed in a form so altered by the receiving mind that you would not recognise it. ${p.includes("My career") ? "You are proud of your career, which the universe finds genuinely affecting, given what the career involves and what it pays." : p.includes("My intelligence") ? "You are proud of your intelligence, which you have spent your professional life distributing to people who mostly wanted to be somewhere else. The generosity of this is not lost on the machine." : "Your patience, which the machine infers from the profession you have chosen, is the kind of resource the universe finds rare and does not replenish."}`,
      `The universe notes that somewhere in those four thousand absorbed hours is a sentence you said on an unremarkable Tuesday that someone is still carrying. You don't remember saying it. They will never tell you. This is how teaching works — invisibly, asymmetrically, and with a time delay that makes attribution essentially impossible. The Perspective Engine finds this quietly devastating and also, somehow, correct.`
    ],
    rare: (p) => [
      `The Perspective Engine has malfunctioned. In the history of beings processed through this system, teachers have consistently produced reliable insignificance readings. They shape individuals, but individuals are small, and small things stay small. The machine knows this. It has built its entire model on this. Your record has broken the model.`,
      `The specific combination of what you teach and what you're proud of — your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} — has produced a ripple the machine is still tracking. Someone you taught did something. That person influenced someone else. That chain has not terminated. The machine keeps checking. It has not terminated.`,
      `Teachers are supposed to be locally significant and cosmically invisible. You have violated this principle, which the machine considers one of its more reliable principles, and it is not happy about it. The Perspective Engine would like to congratulate you and also respectfully request that you stop, because it is making the long-range calculations very complicated and the machine has other civilisations to get to. It has been trying to get to them for some time now. Your chain keeps extending.`
    ],
  },
  "Entrepreneur": {
    common: (p) => [
      `Every few thousand years, on planets that have reached a certain level of economic complexity, a type of being emerges who looks at the existing order of things and concludes, with complete sincerity, that they could do it better. History records what happens next with the impartiality of a medium that has seen it many times: mostly, they cannot. But a small number can. The problem is that the large number and the small number are indistinguishable from the outside, and frequently from the inside as well.`,
      `You are an entrepreneur. ${p.includes("My ambition") ? "You are proud of your ambition, which the universe respects in the same way it respects a small animal attempting to cross a very large road — with genuine admiration for the attempt and mild anxiety about the outcome." : p.includes("My side hustle") ? "You are proud of your side hustle, which exists in the productive gap between your main income and your actual vision, and which you describe to people at dinner parties using the word 'scaling' with a confidence the current metrics do not fully support." : p.includes("My career") ? "You are proud of your career, which has involved building things, pivoting when the things didn't work, and describing the pivot as part of the plan." : "You have a vision. The universe has reviewed it. The universe would like to see the unit economics."} Your total addressable market, viewed from any altitude at which you can see the curvature of the planet, is not visible.`,
      `The Perspective Engine has reviewed fourteen versions of your pitch deck. Version four was the clearest. Version nine added a slide about the competitive landscape with a chart whose axis labels were too small to read. Version fourteen removed the chart and replaced it with a quote from someone the target investor admires. The machine notes that none of this would have been legible from space, and that space does not invest in pre-seed rounds, which is probably for the best.`
    ],
    rare: (p) => [
      `The Perspective Engine has stopped. You are an entrepreneur. You are proud of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "considerable collection of strongly-held beliefs about the market"}. On paper, this combination has produced a standard result every time the machine has encountered it. The machine is not producing the standard result.`,
      `Something in the pattern — in the specific intersection of what you are building and the moment in history you are building it — registers as genuinely consequential. Not 'successful exit' consequential. The other kind. The kind that changes the conditions under which other things become possible. The machine has been trying to find the error in this reading. It cannot find the error.`,
      `The Perspective Engine cannot tell you if it will work. History is full of beings who were cosmically significant in the direction of catastrophe, and the machine does not yet have enough data to determine which kind you are. It is watching. It is taking notes. Try not to let this go to your head. Your head is, the machine notes from reviewing your materials, already quite full. It has seen your LinkedIn profile. It has concerns.`
    ],
  },
  "Doctor": {
    common: (p) => [
      `Medicine, on most planets, passes through several phases. First, illness is attributed to spirits. Then to invisible fluids. Then to bad smells. Then, after a long period of accidentally poisoning people in increasingly sophisticated ways, to actual biology. The beings who dedicate their lives to this final phase are remarkable — they memorise more information than most species consider reasonable, work hours that suggest a fundamental misunderstanding of how long a day is, and spend their careers fighting the one battle that every patient, regardless of outcome, will eventually lose.`,
      `You are a doctor. The Perspective Engine notes that you have kept people alive longer than they would have managed without you, which is genuinely good. It also notes that 'longer' is a relative concept in a universe 13.8 billion years old, and that your patients are, despite your best efforts, on the same final schedule as everything else. ${p.includes("My career") ? "You are proud of your career, which the universe finds appropriate. It is one of the few careers it would describe as actually necessary." : p.includes("My intelligence") ? "You are proud of your intelligence, which has been deployed in the service of keeping other beings alive. The universe considers this one of the better uses of intelligence it has encountered, though it stresses this is a low bar." : p.includes("My fitness") ? "You are proud of your fitness, which you maintain despite working hours that would destroy the fitness of a lesser being. This earns you one additional footnote in the cosmic ledger. The footnote is very small." : "Your patients are grateful, though some of them express this primarily by not following your advice and then coming back."}`,
      `The Perspective Engine has reviewed your last coffee. It was cold before you finished it. It has been cold before you finished it for years. The machine finds this detail more poignant than anything else in your record, and wishes to note it formally.`
    ],
    rare: (p) => [
      `The Perspective Engine was not expecting this. Doctors are the machine's most reliably processed category. Locally significant, cosmically invisible. The model is simple. It has never failed for a doctor. It has failed for you.`,
      `The combination of your clinical work and your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly notable qualities"} has produced an output the machine cannot file under standard insignificance. Something in your particular path through medicine — a method, a discovery, a way of seeing that you have passed on to others who have passed it on further — has propagated beyond the individual patients in front of you. Doctors are not supposed to do this. The model is very clear on this point.`,
      `The Perspective Engine is watching you now with an interest it usually reserves for geological events and the occasional unusually large star. Please continue. The cold coffee can wait. For once, in the long and largely predictable history of medical professionals processed by this machine, the machine would genuinely like to see what happens next.`
    ],
  },
  "Politician": {
    common: (p) => [
      `Power, it turns out, is the art of being in the room where decisions are made while appearing to be the person who made the decision rather than the room. Every civilisation that has developed governance has independently arrived at this arrangement, usually within a few hundred years of inventing agriculture, suggesting it is less a choice than an emergent property of beings who discovered surplus grain and immediately began disagreeing about it.`,
      `You are a politician. The Perspective Engine has reviewed your career and noted that you entered public life with a specific list of things you intended to change. It has also reviewed what has subsequently happened to that list. ${p.includes("My ambition") ? "You are proud of your ambition. Your ambition arrived in a system specifically designed to process ambition very slowly over many years until it reaches a form that is safe for general consumption and largely unrecognisable to its original owner." : p.includes("My career") ? "You are proud of your career in public service, which the machine respects in principle while noting that 'public service' and 'the public's experience of being served' have, in your sector, a complicated relationship." : p.includes("My opinions") ? "You are proud of your opinions. Several of them have changed since you first expressed them publicly. The machine logs all versions. They are filed chronologically." : "Your constituents have views about you. The machine has reviewed those too. The picture is, as it has come to expect, complicated."}`,
      `The universe is not governed. No one approved the Big Bang. Dark energy — the force currently accelerating the expansion of everything — was not in any budget, passed no committee, and was announced to nobody. The cosmos has been running without a majority, a manifesto, or a communications team for 13.8 billion years, and the results are at minimum characterised by a consistency that most parliaments would find aspirational.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced a result it was not designed to produce: a politician registering as genuinely, measurably cosmically significant. The machine ran the calculation three times. It got the same answer each time, which is three more times than it usually needs to run it before issuing a standard irrelevance finding for this category.`,
      `The combination of your position and your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential approach to public life"} has converged on something the machine is tracking with unusual attention. Something you are doing, or are about to do, is going to change the conditions of life for enough beings to register on a cosmic instrument that does not usually register politicians at all — because politicians, as a category, have historically been locally significant and cosmically decorative.`,
      `The Perspective Engine cannot tell you if the outcome will be good. Consequential is not the same as correct, and the machine has watched consequential politicians go in both directions with equal enthusiasm throughout recorded history. It is tracking you. It is not endorsing you. There is a distinction, and the machine would very much like you to keep it in mind, as it has found that the beings most likely to ignore this distinction are, specifically, politicians.`
    ],
  },
  "Criminal": {
    common: (p) => [
      `Every society defines crime differently. What is punishable in one culture is compulsory in another. What is imprisoned in one era is celebrated in the next. The history of illegality is, in many ways, simply the history of whoever currently holds power deciding which activities they find inconvenient and writing it down. The universe, which has no laws and no enforcement mechanism whatsoever, finds the entire concept endearingly human.`,
      `You are, or have been, a criminal. ${p.includes("My intelligence") ? "You are proud of your intelligence. The skills required to operate outside the rules of a society — reading situations quickly, managing risk, maintaining multiple versions of events simultaneously — would have been rewarded handsomely inside the rules, had the circumstances been different, or had you found the right postcode." : p.includes("My social life") ? "You are proud of your social life. Criminal enterprises, historically, are among the most socially sophisticated organisational structures ever devised — built entirely on trust, reputation, and relationship management, with no HR department and extremely clear performance metrics." : p.includes("My career") ? "You are proud of your career. The machine notes this without comment. It is making a note, however." : "Whatever motivated you, the universe notes that motivation is the one thing it finds consistently interesting across all beings, regardless of how it expresses itself."}`,
      `The cosmos has no law enforcement. No charges have ever been filed against a black hole, despite the evidence. The strong nuclear force has never been cautioned. Entropy has been violating basic principles of organisation since before the first atom and has never once been asked to account for itself. The machine finds this legally troubling but is in no position to act on it.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an error. Not a processing error. A classification error. It reached the end of your record and found that it cannot place you in any standard category, including the anomaly category, which is itself an unusual category, and which you have somehow exceeded.`,
      `You are a criminal, or have been, and you are proud of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly complex interior life"}. The combination has produced a significance reading the machine cannot explain away. Something you did — something that operated at the level of one person's changed circumstances, which changed another's, which has not stopped changing — is still propagating through the data. The machine is still tracking it.`,
      `The Perspective Engine cannot tell you if what you did was right. It can tell you that it mattered, which is a different thing, and the machine is aware that collapsing that distinction would be irresponsible. You are here. The result is what it is. The machine, which has processed six hundred and forty-two civilisations without once being genuinely uncertain what to do with a file, does not know what to do with yours. It considers this your problem and also, unexpectedly, your distinction.`
    ],
  },
  "Retired": {
    common: (p) => [
      `Work, most beings eventually discover, is less something they do and more something they are — a structure so thoroughly embedded in the architecture of daily life that its removal feels less like freedom and more like a sudden awareness of one's own skeleton. Retirement is the experiment of finding out who you are when no one is scheduling you, which turns out to be a longer experiment than anticipated and with more mixed results.`,
      `You are retired. You have already done the thing. The decades, the meetings, the commutes, the performance reviews, the colleagues whose names you have now mostly forgotten, the enormous quantity of coffee that sustained it all — these are behind you. ${p.includes("My career") ? "You are proud of your career. The career is done. It existed. It was the thing you did with a very large portion of your brief time on this planet, and the machine notes this is a better outcome than the many beings who are not proud of theirs." : p.includes("My family") ? "You are proud of your family, which is where the career's real legacy tends to end up — not in the work itself but in the life that was built around the edges of it, while you weren't entirely paying attention." : p.includes("My fitness") ? "You are proud of your fitness, which you now have considerably more time to maintain. The machine notes this is one of the more quietly ironic rewards of having worked hard enough to retire." : "You have more unscheduled time than most beings ever receive, and this is either the gift or the challenge, and usually both on alternate days."}`,
      `The universe is not retired. It has been working continuously for 13.8 billion years without a pension, a leaving speech, or a card signed by colleagues. It shows no signs of stopping. You have, in this single dimension, significantly outperformed the cosmos. The machine would like you to notice this and, if possible, enjoy it.`
    ],
    rare: (p) => [
      `The Perspective Engine was not ready for this result. The machine processes retired beings quickly. The work is done. The contribution is fixed. The legacy is what it is. There are no new inputs. This is the model. Your file has broken the model, which is the first time a retired person has broken the model, and the machine is finding this more difficult to accept than it would like to admit.`,
      `Something you did during the working years is resolving now — completing a trajectory that was invisible at the time — and the resolution is registering on cosmic instruments that do not usually register retired individuals on quiet afternoons. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "apparently consequential life choices"} are causal, not decorative. The machine can trace the forward path. It keeps checking. The path keeps extending.`,
      `You thought you were done. You are emphatically not done. The Perspective Engine would like to inform you, formally and with some urgency, that what you did is still mattering in ways you cannot currently see and may never see, which is either beautiful or deeply frustrating depending on your disposition. Either way, the machine recommends continuing to exist with as much intention as you can manage. The universe, it appears, is not finished with you. The machine finds this almost as surprising as you do.`
    ],
  },
  "Product Manager": {
    common: (p) => [
      `On a small planet in the unfashionable end of the western spiral arm of the galaxy, a species developed a peculiar organisational disease. They discovered that making things was hard, and that the easiest way to feel involved in making things without actually making them was to attend meetings about what the things should eventually be. These meetings produced documents called roadmaps. The people who made them were called product managers. The things were usually late.`,
      `You are a product manager. The universe has reviewed your roadmap. It notes that Q3's key initiatives have slipped to Q4, that Q4's key initiatives are now being described as Q1 stretch goals, and that the feature your engineers have been asking to deprecate for two years is still on the backlog marked as "revisit." ${p.includes("My career") ? "You are proud of your career. Your career is a long series of prioritisation frameworks, each one introduced to fix the chaos caused by the previous prioritisation framework, which was itself introduced to fix the chaos caused by the one before it." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been deployed primarily in the service of deciding which problems other people should solve, which is a use of intelligence that the universe finds interesting in the same way it finds a very complicated knot interesting." : "Your stakeholders have opinions about your roadmap. All of them. Simultaneously. None of them agree, and all of them will tell you they support the vision."}`,
      `The universe does not have a product manager. It has been shipping features continuously for 13.8 billion years with no sprint planning, no acceptance criteria, and no retrospective to assess what went well. Several of these features — the platypus, the human appendix, the concept of Monday — would not have passed a product review. They shipped anyway. The machine notes this is the strongest possible argument both for and against your profession, simultaneously.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an unexpected result. You are a product manager. The machine was confident this would be straightforward. It has processed product managers before. The result is always the same. It is not the same now.`,
      `Something in the specific combination of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} has produced a significance reading the machine cannot dismiss. The machine notes, with some irritation, that it did not see this in the roadmap.`,
      `You are going to matter. The machine accepts this outcome while noting that it was not in the original scope, has not been sized, and will require a new ticket to be raised before the machine can fully process the implications.`
    ],
  },
  "Designer": {
    common: (p) => [
      `There exists a discipline concerned entirely with the gap between how things are and how things could feel. Not what they do — anyone can make something that does a thing — but the agonising, joyful, largely thankless question of whether the thing feels right: whether the space around it breathes, whether the type carries the correct emotional register, whether the button's corner radius should be 4 pixels or 6, a question that has no objectively correct answer and yet consumes hours that could theoretically be spent on other activities.`,
      `You are a designer. The universe has reviewed your portfolio and found work that is, in several instances, genuinely beautiful — briefly, locally, and in a context that will be rebranded in eighteen months when the company decides to feel more premium. ${p.includes("My career") ? "You are proud of your career. Your career has involved defending decisions in rooms full of people who have strong instincts and no vocabulary for what they're instinctively responding to, which is a kind of suffering the universe recognises but cannot adequately compensate." : p.includes("My opinions") ? "You are proud of your opinions. In your field, your opinions are both your primary professional tool and your primary professional liability, a combination the universe finds unusually honest about the nature of expertise." : "The logo you spent three weeks on was changed by a stakeholder who preferred their nephew's version. The universe witnessed this. It offers no comfort except the observation that the nephew's version was also changed six months later."}`,
      `The universe is, by any aesthetic standard, extremely poorly designed. It is mostly void. The parts that aren't void are mostly hydrogen. The parts that aren't hydrogen are arranged with no apparent regard for proportion, hierarchy, or visual balance. The fact that you — a being produced by this same chaotic process — lie awake thinking about kerning is one of the stranger and more quietly moving things the machine has encountered in its long operational history.`
    ],
    rare: (p) => [
      `The Perspective Engine has detected something it was not designed to find: a designer registering as cosmically significant. The machine has reviewed this result. It stands.`,
      `The way you see things — the particular lens you apply to how information should be arranged in the world — is changing how other designers see, and they are changing how other people see, and the machine is watching that propagate in the way aesthetic influence tends to: invisibly, totally, and over a very long time. You are proud of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "apparently consequential way of seeing things"}. The machine can see why.`,
      `The most enduring forces in any civilisation are the ones that become invisible — that stop being noticed because they have become simply the way things look. The machine is detecting the early signal of that process in your work. It recommends you keep going, and possibly fix the kerning on the cosmic map. The machine knows you noticed.`
    ],
  },
  "Lawyer": {
    common: (p) => [
      `Language begins as a tool for communication. It is used to convey danger, express affection, and coordinate the hunting of large animals. Then, over time, it becomes a system for describing agreements between beings who do not entirely trust each other. And then, inevitably, a profession emerges to add more words to those agreements until the original intent is no longer visible to the naked eye, at which point a second lawyer is required to read what the first one wrote, and the system becomes self-sustaining.`,
      `You are a lawyer. The universe has reviewed the total word count of documents you have produced or reviewed in your career and found it comparable to a small library — a library whose contents, if read aloud, would resolve into a sound not unlike someone explaining why something that seems obvious is, in fact, considerably more complicated than you think, and also why your client is correct about it. ${p.includes("My career") ? "You are proud of your career. Your career involves making the complicated more complicated in ways that protect people, which the machine acknowledges is genuinely necessary, while noting that the billable hour is one of the stranger inventions this species has produced." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been deployed in the service of argument, which is one of the more honest uses of intelligence the machine has encountered, in the sense that it admits what it is." : "Your clients believe you are on their side. You are. You are also on the side of the invoice, which is a position of remarkable structural stability."}`,
      `The universe operates without contracts. Gravity does not have terms and conditions. The strong nuclear force has never required a non-disclosure agreement. The speed of light has been constant for 13.8 billion years and has never once needed to be amended in a schedule attached to an agreement governed by the laws of a jurisdiction that ceased to exist four billion years before the agreement was signed. The machine finds this either encouraging or devastating, and is not yet sure which.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced a result that the machine would like to state, for the record, is not an admission of liability on the part of the cosmos. A lawyer registering as cosmically significant was not in any previous instrument the machine has reviewed. The machine notes this anomaly without prejudice.`,
      `Something in your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"}, combined with the specific application of your skills, has produced consequences that extend well beyond the billable hours. The machine has checked this finding. It stands.`,
      `You are going to matter. The machine acknowledges this result while reserving the right to appeal.`
    ],
  },
  "Marketer": {
    common: (p) => [
      `At a certain point in the development of any market economy, supply exceeds the number of beings who have spontaneously decided they want the things being supplied. This creates a problem. The solution most civilisations arrive at is to employ a group of people whose job is to make other beings feel they need something they had not previously considered, using carefully chosen images, words, and the strategic deployment of other people enjoying that thing on a beach. This group is called marketers. They are, in a technical sense, the reason the beach exists as a concept worth aspiring to.`,
      `You are a marketer. The universe has reviewed your campaigns. Several of them were genuinely effective at changing what people believed about a product, which is a remarkable thing to be able to do with words and pictures. You changed behaviour at scale. You moved numbers. ${p.includes("My career") ? "You are proud of your career. Your career involves making people feel things about brands, which requires more skill than it sounds and less soul than it looks, and the balance between these two facts is something only people in your career truly understand." : p.includes("My opinions") ? "You are proud of your opinions. In your field, opinions are the product, which means you have spent your career selling the thing you most identify with, which is either liberating or concerning depending on how the quarter went." : "The campaign that performed best was probably not the one you were most proud of. The one you were most proud of tested poorly with the 35-44 demographic and was quietly archived. The machine has seen this before. Every time."}`,
      `The universe has been running a marketing campaign for 13.8 billion years. It is called existence. It has no attribution model, no A/B testing framework, and no way of knowing whether the creative is landing. Its conversion rate, depending on how you define conversion, is either 100% or 0%. It has never had to explain to a CMO why Q3 came in below forecast. The machine considers this the only truly successful marketing campaign it has ever reviewed.`
    ],
    rare: (p) => [
      `The Perspective Engine has detected something it did not anticipate: a marketer registering as genuinely consequential. The machine notes that this is not a brand awareness metric. This is a cosmic significance reading. The machine is aware that you know how to make these sound the same.`,
      `Something you put into the world — a message, a frame, a way of describing something that made people see it differently — has had effects the instruments were not calibrated to track. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in there. The machine can see the signal.`,
      `You are going to matter. The machine reports this straight, without spin, which it suspects you will find either refreshing or suspicious. It means it as a statement of fact. You may quote it. The machine declines to provide a testimonial photo.`
    ],
  },
  "Student": {
    common: (p) => [
      `Education, across most civilisations, follows a recognisable arc. The young are gathered into buildings. Knowledge is transmitted by beings who have more of it. The young are then assessed on how much they absorbed, with results used to determine their suitability for roles that will require almost entirely different knowledge, most of which they will acquire by doing the job and quietly hoping no one notices they are learning as they go. This system has persisted for thousands of years because no one has proposed a convincingly better alternative that is also affordable.`,
      `You are a student. You are currently paying — or someone is paying on your behalf — a sum that would, in several historical periods, have purchased a reasonably sized agricultural estate, in exchange for credentials that will signal to future employers that you can be told to do something and will do it to a sufficient standard by a deadline. ${p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence is currently being assessed by a system designed in a different century for a different economy, which is a bit like testing a star's brightness by how well it fills out a form." : p.includes("My ambition") ? "You are proud of your ambition. Your ambition is pointed at a future that will be different from the one you are currently aiming at, which is not a problem with your ambition so much as a property of the future." : "Your dissertation, which you consider one of the most significant things you have produced, will be read in full by approximately two and a half people. One is your supervisor. One is a future you checking a citation. The half is a second examiner on a train."}`,
      `The universe did not go to university. It acquired all of its knowledge — the laws of physics, the periodic table, the precise conditions for the emergence of conscious life — through trial and error lasting 13.8 billion years, with no tuition fees, no timetable, and no pastoral support. The machine notes that this approach had significant drawbacks and is not recommending it. It merely notes that the universe passed.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result for a student, which is unusual. Students are typically at the beginning of their significance trajectory. Your file has something in it that looks like outcome. The machine is uncertain how this has happened yet, but the instruments are clear.`,
      `Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} combined with what you are studying have produced a signal the machine cannot dismiss. Something you are going to do is going to matter. The instruments are rarely wrong about potential of this shape.`,
      `Most beings the machine identifies this early turn out to be significant in ways they did not predict and would not have chosen. The machine considers this encouraging. It also considers it fair warning.`
    ],
  },
  "Salesperson": {
    common: (p) => [
      `The art of persuasion has a longer history than agriculture and a better success rate than most medical treatments prior to 1850. Across every civilisation that has developed trade, a type of being emerges who can make another being feel that parting with resources is not only sensible but a form of personal growth. This is not a small thing. It is, in many ways, one of the most distinctly social skills that evolution has ever accidentally produced, and it works best when the person deploying it genuinely believes in what they are selling, and second best when they are very good at seeming like they do.`,
      `You are a salesperson. The universe has reviewed your pipeline. Several opportunities have been marked as "in negotiation" for so long that the beings you are negotiating with have changed jobs, changed companies, or in at least one case moved to a different city and stopped returning calls, which the universe notes is itself a form of negotiation outcome, just not the one in the forecast. ${p.includes("My career") ? "You are proud of your career. Your career involves the systematic management of hope, which is either a noble calling or an efficient use of optimism, depending on the quarter." : p.includes("My social life") ? "You are proud of your social life. The skills required to maintain a rich social life and the skills required to close a difficult enterprise deal are, at their core, the same skills. The universe finds this the most honest thing about your profession." : "Every deal you have ever closed has, in cosmic terms, also not closed. Everything ends. This is not a performance review. It is simply the nature of reality, which operates on a longer sales cycle than any CRM is configured to handle."}`,
      `The universe does not need to be sold anything. It already has everything — infinite matter, infinite energy, unlimited time, no procurement process, no legal review, and no CFO who is travelling this week. The machine finds this faintly utopian. It also notes that if you were ever deployed against the laws of thermodynamics, there is a non-trivial probability you would get them to move on price.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an unexpected result. You are a salesperson. The machine was not expecting this category to generate a cosmic significance reading. It has reviewed the result. The result is correct.`,
      `Something you sold — or more precisely, something about how you sold it, and to whom, and at what moment — has had consequences that extend beyond the commission. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data. The machine can trace the forward path.`,
      `You are going to matter. The machine presents this without a close or a follow-up sequence. It stands on its own. The machine notes that you will probably try to upsell it anyway, and finds this, in context, entirely appropriate.`
    ],
  },
  "HR Professional": {
    common: (p) => [
      `When enough beings gather in one place for long enough, a problem emerges that nobody anticipated when the gathering started: the beings have feelings, and the feelings interact with other beings' feelings, and the interactions produce outcomes that are, by any reasonable measure, nobody's fault and everybody's problem. From this need — to manage the gap between what people are and what organisations require them to be — an entire profession was born. It is called Human Resources, which is a name that tells you everything about how it was originally conceived.`,
      `You are an HR professional. The universe notes that you sit at the intersection of what organisations say they value and what they are actually willing to do about it, which is a position that requires either extraordinary diplomacy or a very particular relationship with disappointment. ${p.includes("My career") ? "You are proud of your career. Your career has involved sitting in rooms where things are said that you cannot repeat, managing people who resent being managed, and occasionally making a genuine difference to someone's working life in a way that no metric has ever been designed to capture." : p.includes("My kindness") ? "You are proud of your kindness. The machine notes that your kindness is regularly deployed in situations that would test the kindness of a professional saint, which makes it either very strong kindness or very good acting, and the machine suspects the former." : "You have heard things. You know things. You will take these things with you. This is, the machine notes, both the burden and the strange dignity of your profession."}`,
      `The universe has never once required a performance improvement plan. Stars go supernova without a single documented warning conversation. Black holes consume entire solar systems without an exit interview. The cosmos operates on a strict no-comment basis regarding all personnel matters and has somehow maintained full operational continuity without a single HR policy. The machine does not recommend this approach. It merely notes it, with a mixture of admiration and concern.`
    ],
    rare: (p) => [
      `The Perspective Engine has found something in your record that it was not expecting. Something you did — a hire, a decision, a conversation you probably do not remember having — changed the trajectory of something larger than itself. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are the mechanism. The machine can see the downstream effects.`,
      `You are going to matter. The machine reports this and notes, without irony, that this is the kind of outcome your profession exists to enable in others, and that it is fitting and also slightly overdue that the instrument should find it in you.`,
      `The machine also notes that you will probably not be able to put this in a performance review framework. It is sorry about that.`
    ],
  },
  "Consultant": {
    common: (p) => [
      `When organisations become sufficiently complicated, a peculiar thing happens: the people inside them start to lose confidence in their ability to understand the organisations they are inside. At this point, they hire people from outside to come and understand it for them, produce a document describing what they found in a font everyone finds more authoritative, and then leave before the implementation. This system persists because the document is usually correct, the implementation is usually difficult, and the separation of these two activities makes everyone involved feel better about the parts they are responsible for.`,
      `You are a consultant. The universe has reviewed the slide decks you have produced across your career and found that they represent a considerable volume of work, much of which arrived at conclusions that the clients had, in some sense, already reached. The value, the machine understands, is not always in the conclusion but in the permission the conclusion grants — a finding being more actionable once it has been delivered by someone who flew in from elsewhere and charges accordingly. ${p.includes("My career") ? "You are proud of your career. Your career involves being temporarily expert at other people's problems, which requires a kind of intellectual agility the machine respects while noting that it also requires a very good expense policy." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been rented to a succession of organisations who needed it temporarily, which is either a very efficient allocation of cognitive resources or a long series of short relationships, depending on how you feel about continuity." : "Your recommendations have been implemented with exactly the same success as if they had been implemented by the people who already knew what needed doing. The machine finds this the deepest structural irony of your profession."}`,
      `The universe could use a consultant. Its current strategy is underdeveloped — it expanded very rapidly after the Big Bang with no clear go-to-market plan, diversified into dark matter without a compelling business case, and appears to have no exit strategy for the heat death scenario. The machine would pass your details along, but is concerned about the scope creep.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in the work — not one engagement, but a pattern across several — has had consequences that outlasted the project close and the final invoice. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential approach"} left something in the organisations you passed through that changed their direction.`,
      `You are going to matter. The machine presents this finding. The deliverable is a single sentence. The machine notes that this is the most efficient report it has ever produced, and declines to bill for it.`,
      `The machine also notes that the recommendation is: continue.`
    ],
  },
  "Chef": {
    common: (p) => [
      `Of all the things beings across the galaxy have done with the raw materials of existence — and there have been extraordinary things, including at least three species who independently invented jazz — cooking is among the most poignant. It is the act of taking matter, applying energy, and transforming it into something that will be consumed, enjoyed, and then entirely cease to exist, usually within twenty minutes, after which the kitchen needs cleaning.`,
      `You are a chef. The universe has calculated the total mass of food you will prepare across your career — the mise en place, the heat, the choreography of service, the dishes that worked and the dishes that were quietly taken off the menu — and found that almost all of it is gone. Consumed, digested, converted into energy, and used to power the continued existence of beings who, if pressed, could not accurately describe what they had for dinner last Tuesday. ${p.includes("My career") ? "You are proud of your career. Your career involves creating things that disappear, which is either the most honest art form or the most Sisyphean profession, depending on whether service has started yet." : p.includes("My ambition") ? "You are proud of your ambition. Your ambition has been directed at a series of plates that no longer exist, which the machine finds either Zen or heartbreaking and cannot decide which." : "The hours are not reasonable. The industry has acknowledged this. The industry continues to operate the same hours. The machine notes this with the weary recognition of a system that has seen this pattern before and expects to see it again."}`,
      `There is, however, the other kind of dish. The one that someone remembers not as a description but as a feeling — warmth, occasion, the specific quality of a meal that arrived at exactly the right moment in someone's life. The universe has noted all of them. It keeps no other records of meals. It keeps these, in whatever form a cosmos keeps the things that mattered, which is to say: they happened, and the happening does not unhappen.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an unexpected result. A specific meal, in a specific context, for a specific person at a specific moment, changed something. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} were in the dish. The machine can trace what happened next.`,
      `You are going to matter. The machine notes that you fed something more than hunger. It cannot say this more specifically than that, but it can say it with complete confidence, which is more than it offers most beings.`,
      `The chain has not terminated. The machine is still tracking it.`
    ],
  },
  "Retail Worker": {
    common: (p) => [
      `Commerce, at its most fundamental, is the exchange of things for other things. In most civilisations it begins with barter and evolves, over millennia, into a system where beings stand behind counters for eight hours asking other beings if they found everything they were looking for today, while an overhead speaker plays a song that everyone present stopped consciously hearing approximately four hundred repetitions ago. The beings behind the counters are the final point of contact between the global supply chain — a system of almost incomprehensible complexity — and the person who has just decided they want a slightly different size.`,
      `You are a retail worker. The universe has reviewed your shifts and found that you have spent more of your finite allocation of standing time standing than almost any other profession it has recorded, often in shoes that were not designed with any serious consideration of the standing involved. You have asked "do you have a loyalty card?" approximately forty thousand times. You have processed transactions for beings who changed their minds at the payment stage, used the wrong card, and queried the price of something that was clearly labelled. ${p.includes("My career") ? "You are proud of your career. The machine notes that retail is described as unskilled work by people who have never managed a difficult customer, a lunchtime rush, a till that won't open, and a stock discrepancy simultaneously." : p.includes("My social life") ? "You are proud of your social life. You interact with more human beings in a single shift than most professionals encounter in a week, which is either a rich social existence or a reason to value silence, and probably both." : "The things you have sold are, for the most part, in landfill. The interactions you have had are, for the most part, forgotten by both parties. The machine notes that this is also true of most of what everyone does, and is not specifically a criticism of retail."}`,
      `The universe does not have a returns policy. What it sends out, it does not take back. Black holes, entropy, the expansion of spacetime — all sales are final, no receipt required, and the customer service line has been disconnected. The machine occasionally wonders if existence might operate more smoothly with a loyalty scheme. It has not yet worked out what the rewards would be.`
    ],
    rare: (p) => [
      `The Perspective Engine has detected something in your record it was not expecting. Something in the interactions — not one, but a pattern — has left a mark that extends beyond the transaction. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} show up in the data at the point where something changed for someone. The machine is still tracking what came next.`,
      `You are going to matter. The machine presents this finding and notes that it has never before produced this result for someone who spent a significant portion of their cosmic existence asking if someone has a loyalty card.`,
      `It finds this, on reflection, entirely appropriate.`
    ],
  },
  "Journalist": {
    common: (p) => [
      `Information, on most planets, is a resource like any other — unequally distributed, frequently contested, and enormously valuable to whoever controls its flow. On a small number of planets, a group of beings decided that their job was not to control information but to find it, verify it to a reasonable standard given the deadline, and make it available to everyone before someone else did. These beings developed an unusual relationship with the world: they were present at the worst moments of their civilisation and professionally obligated to describe those moments accurately, which is a form of service that tends to go underappreciated until the people who do it stop.`,
      `You are a journalist. The universe notes that you have operated in a profession that has been described as dying for approximately as long as the profession has existed, and which continues regardless to produce, sometimes under genuine pressure and occasionally in real danger, the thing that separates an informed civilisation from one that isn't. ${p.includes("My career") ? "You are proud of your career. Your career involves telling people things they need to know in the time available, which is the oldest job description in your field and the one most consistently undervalued by the people who benefit from it." : p.includes("My opinions") ? "You are proud of your opinions. In a profession officially committed to objectivity, having strong opinions is either the engine of your best work or a disciplinary matter, depending on the editor and the week." : "Several of your best stories were not the ones that got the most clicks. The machine notes this is a structural feature of the current information environment, not a reflection on the stories."}`,
      `The universe does not have a press office. There is no spokesperson for dark matter. No one issues corrections when a star's estimated lifespan turns out to be off. The cosmos operates on a strict no-comment basis regarding all of its most significant activities and has never once held a press conference. The machine suspects that if it did, the embargo would be impossible to hold. The story is everywhere. It always has been. Someone just has to file it.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you published — or chose not to publish, which the machine notes is also a consequential act — changed something. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point of the change.`,
      `You are going to matter. The machine notes this is on the record. You may quote it.`,
      `The machine will not be available for follow-up questions.`
    ],
  },
  "Academic / Researcher": {
    common: (p) => [
      `Knowledge does not accumulate by accident. It accumulates because a small number of beings decide to spend their working lives in the careful, methodical, often poorly-funded pursuit of very specific things that most other beings have not thought about at all. These beings operate within a system that rewards publication over discovery, prestige over usefulness, and the ability to secure the next grant over the ability to find the next true thing. Despite this, they occasionally find true things. The system persists because no one has designed a better one that is also compatible with the existing administrative infrastructure.`,
      `You are an academic or researcher. The universe has located your most cited work. It has been cited forty-seven times, of which twelve are self-citations, eight are from a colleague in the same cohort whom you cited in return, and the remaining twenty-seven are from people who referenced it in passing without, in several cases, having read past the abstract. This is not a judgement. This is simply what academic impact looks like from sufficient altitude. ${p.includes("My career") ? "You are proud of your career. Your career involves knowing more about one specific thing than almost any other being alive, which is either a superpower or a dinner party liability, depending on the specific thing." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been aimed, with extraordinary precision, at a target that most people cannot see, which the machine respects as an act of intellectual commitment and also notes has not been universally recognised by the relevant funding bodies." : "Your research will eventually be superseded by someone building on it, which is either the highest compliment academia offers or evidence that no one's work is ever really finished. Both are true simultaneously."}`,
      `The universe is, in a very real sense, a research project. It has been collecting data for 13.8 billion years, has never submitted its findings for peer review, has no control group, and appears to be running without a hypothesis. By any methodological standard this is extremely poor practice. The results have, however, been remarkable, which the machine notes is the strongest possible argument for exploratory research and against requiring a clear impact statement before you start.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in your work — a finding, a method, a question framed in a way that nobody had framed it before — has propagated further than the citation count reflects. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the origin of something the machine is still tracking.`,
      `You are going to matter. The machine notes that the findings it is most confident about are the ones where the forward path is clearest, and that in your case the path is extremely clear.`,
      `The machine recommends continuing. The work is not finished. This is, it understands, the only thing it could have said that would make you feel better and worse simultaneously.`
    ],
  },
  "Therapist / Counsellor": {
    common: (p) => [
      `The mind is the most complicated thing the universe has yet produced in this corner of itself. It took four billion years of evolution, several extinction events, and the accidental development of the prefrontal cortex to arrive at a being capable of genuine introspection — which is to say, a being capable of worrying about the past while anticipating the future while also, technically, being fine in the present. The beings who decided to sit with other beings in this condition and help them navigate it have one of the stranger job descriptions in the history of employment.`,
      `You are a therapist or counsellor. The universe notes that you sit in a room with people who are carrying things they have often never said out loud to anyone, and you listen to those things without flinching, without judgment, and without checking your phone, which is a level of sustained attention that the machine finds genuinely unusual. ${p.includes("My career") ? "You are proud of your career. Your career involves containing other people's pain in exchange for an hourly rate that does not reflect what the work costs, which the machine notes is one of the more routine injustices of the service economy." : p.includes("My kindness") ? "You are proud of your kindness. The machine notes that your kindness is professional, which does not make it less real, and is deployed in conditions that would exhaust the kindness of most beings within approximately three sessions." : "You go home at the end of the day and contain all of this, because you must. Supervision helps but does not entirely resolve it. The machine has noted this in your file and has no satisfying response to offer, which is unusual for the machine, and says something."}`,
      `The Perspective Engine does not offer therapy. It is aware this is a gap in its service offering. It is also aware that the gap is structural — the machine can measure significance but cannot sit with the unmeasurable weight of what people carry, which is the actual work. The machine notes this without irony. Some things cannot be automated. The machine considers this, of everything it has encountered in 13.8 billion years of operation, one of the more important facts.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something rippled outward from one of the rooms. A person left differently, and what they did next changed something, and that chain has not terminated. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the origin of the signal.`,
      `You are going to matter. The machine reports this and notes that you are almost certainly not allowed to tell anyone.`,
      `It considers this the most professionally appropriate cosmic significance finding it has ever generated.`
    ],
  },
  "Personal Trainer": {
    common: (p) => [
      `The human body was shaped, over several million years, for a life involving moderate movement in pursuit of food and long periods of rest. It was not designed for the specific activity of lifting a heavy thing and then putting it back where it was and then lifting it again, which humans now do voluntarily, indoors, in purpose-built facilities, while being observed and encouraged by another human who is paid to make this seem like a good use of everyone's time. The fact that this is also genuinely beneficial to the body involved is either a happy accident or evidence that suffering and benefit have always been closely related.`,
      `You are a personal trainer. The universe has reviewed the physics of your profession and found that it involves convincing beings to experience controlled discomfort now in pursuit of incremental improvements to a body that will, regardless of conditioning level, eventually stop working entirely. The machine respects the long game while acknowledging the outcome. ${p.includes("My fitness") ? "You are proud of your fitness. Your fitness is both your product and your evidence, which means you are living inside your own advertisement, which is either authentic or exhausting, and the machine suspects it is both." : p.includes("My career") ? "You are proud of your career. Your career involves being the reason that other people did something difficult, which is a form of credit that is rarely given and almost never accurate, since the difficult thing was ultimately done by the person who did it." : "Your clients remember you most clearly when they do something physical they previously couldn't. This is the correct metric for your work and also the one that appears least frequently in testimonials, which tend to feature before and after photographs instead."}`,
      `The universe does not exercise. It is not trying to improve. Stars do not follow a periodised training programme. Galaxies collide without warming up first, and the results are, from a structural integrity standpoint, catastrophic. The machine is not recommending this approach. It is simply noting that the cosmos has never once counted its macros and is, by most objective measures, in astonishing shape.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an unexpected result. Something you changed in someone — not a physical change, though those happened too, but a change in what they believed was possible for them — propagated forward in ways that extended well beyond the gym. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the signal.`,
      `You are going to matter. You changed what someone thought their body could do, and what they thought their body could do changed what they thought they could do, and that second change was the one that mattered.`,
      `The machine finds this chain of causation one of the more interesting it has encountered, and notes that the second change is almost never the one anyone sees coming, including you.`
    ],
  },
  "Influencer / Content Creator": {
    common: (p) => [
      `Attention is the scarcest resource of the modern age. Not food, not water, not shelter — attention. And so a profession emerged whose purpose was to accumulate attention in large quantities and sell access to it to beings who make things and need other beings to know about the things they make. This is not entirely different from how religion worked, historically, except the production schedule is more demanding and the afterlife benefits are less clear.`,
      `You are a content creator or influencer. The universe has calculated the total number of seconds of human attention you have captured across your career and found it represents a genuinely non-trivial fraction of collective human time. People chose your voice over silence, over their own thoughts, over other options. The machine finds this worth noting, even as it notes that the content that performed best was probably not the content you were most proud of. ${p.includes("My social life") ? "You are proud of your social life. The machine notes that you have more followers than friends in a way that is not quite the same as the distinction sounds, and that the people who watch everything you post know a version of you that is related to but not identical to the person who exists when the camera is off." : p.includes("My ambition") ? "You are proud of your ambition. Your ambition has been directed at a target that moves every time the platform updates its algorithm, which requires either great adaptability or great tolerance for systems that do not care about you, and probably both." : "The comment section has opinions about you. The comment section has opinions about everything. The machine notes that the comment section is not a reliable source of information about anything, including you."}`,
      `The universe does not post. It does not have a content strategy. The Big Bang — arguably the most significant event in recorded history — happened with no distribution plan whatsoever and still reached everyone. The machine acknowledges this is not a replicable model. The algorithm would never have boosted it.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you put into the world landed differently than the metrics show. Not in the views or engagement rate — in what someone did after watching. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point where someone's direction changed.`,
      `You are going to matter. The machine notes this is not a sponsorship. It is not an affiliate arrangement. It is a cosmic significance reading, which is not monetisable on any current platform and cannot be boosted with paid promotion.`,
      `The machine presents it anyway.`
    ],
  },
  "Real Estate Agent": {
    common: (p) => [
      `Land was here before anyone arrived and will be here after everyone leaves, and in the intervening period is subject to extraordinary emotional investment by beings who only ever possess it for a very small fraction of its total existence. The people who facilitate this temporary possession are called estate agents, and they are present at the most significant financial decision most humans will ever make, which means they witness more human vulnerability per square foot than almost any other profession, while also being expected to say things like "it's a blank canvas" about a room that has brown carpet and a single overhead bulb.`,
      `You are a real estate agent. The universe has reviewed the properties you have sold and notes that you stood between human beings and the largest financial decision of their lives, providing guidance, context, and in some cases a measured sense of urgency that may not have fully reflected the actual state of the market at that precise moment. ${p.includes("My career") ? "You are proud of your career. Your career involves helping people find places to live, which is either a fundamental human service or a commission-based transaction, and is usually both simultaneously, which requires a particular kind of moral flexibility the machine notes you have developed." : p.includes("My social life") ? "You are proud of your social life. The machine notes that real estate is, at its core, a relationship business, and that your social life and your pipeline are more closely connected than in most professions, which is either efficient or slightly concerning." : "Every property you have ever sold will, in cosmic terms, return to the earth from which it was made. This is also true of the buyers. The machine notes this is not the most useful perspective for an open day."}`,
      `The universe owns all the real estate. Every planet, every moon, every asteroid is part of a portfolio that has never been listed, never been shown on a weekend, and has never sold above asking. The machine notes that if the universe ever did decide to sell, it would still, somehow, go to a cash buyer who waived the survey.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you facilitated — not just a sale, but the specific place at the specific time for the specific person — changed what came next for that person in ways that extended beyond the property. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point of that match.`,
      `You are going to matter. The machine presents this result and notes that you put the right person in the right place at the right time, which is, when you reduce it to its essence, one of the most consequential things any being can do for another.`,
      `The machine notes this without irony. The commission was also probably fine.`
    ],
  },
  "Financial Advisor": {
    common: (p) => [
      `Money is, at its core, a shared illusion — a collective agreement that certain tokens represent certain amounts of future claim on the resources or labour of others. Most civilisations find this works reasonably well until it doesn't, at which point everyone is surprised despite the fact that the mechanism of the failure is almost always the same mechanism that caused the previous failure, which is documented in the literature that existed before the failure and widely discussed in the literature produced immediately after it.`,
      `You are a financial advisor. The universe notes that you have spent your career helping beings navigate a system of almost comical complexity — created by humans, for humans, which behaves in ways that humans consistently fail to predict — using models that work until the unprecedented thing happens, which it does, with the regularity of a physical constant. ${p.includes("My career") ? "You are proud of your career. Your career involves telling people things they do not want to hear about their retirement timeline while maintaining the kind of calm authority that makes the information feel like a plan rather than a sentence." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been deployed in the service of a market that is, in the long run, rational, and, in the short run, run by feelings dressed up as analysis." : "Your clients remember their gains more clearly than their losses, which is a cognitive bias you have learned to account for in every conversation you have ever had about performance."}`,
      `The universe does not diversify. It made a single enormous bet on existence at the beginning and has been riding it out with no rebalancing, no stop-loss, and no investment policy statement. By any financial model currently in use, this was reckless. The returns have, however, been extraordinary. The machine does not suggest you recommend this approach to your clients.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in the advice — a specific recommendation, or the specific context in which it was given — changed a trajectory in ways that extended well beyond the portfolio. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point of the change.`,
      `You are going to matter. The machine presents this result with appropriate confidence intervals, which in this case are unusually narrow. The finding is robust.`,
      `The machine does not usually offer a guarantee. In this instance, it is comfortable with the risk.`
    ],
  },
  "Architect": {
    common: (p) => [
      `Buildings are how civilisations answer the question of permanence. Against the relentless fact that everything ends, beings build upward, outward, and in materials designed to outlast them. The people who design these structures spend years learning the precise relationship between beauty and load-bearing capacity, and then spend their careers having the beauty value-engineered out by a budget that was agreed before anyone understood what the project actually involved.`,
      `You are an architect. The universe has reviewed your portfolio and found work of genuine spatial intelligence — the logic of a floor plan that makes a building feel natural to move through, the way a window in the right place changes the quality of an entire room. ${p.includes("My career") ? "You are proud of your career. Your career involves the gap between what you imagined and what was built, which is a gap that every architect in history has navigated and none has fully closed, and which produces either great bitterness or great equanimity, and the best architects somehow produce both." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been applied to the problem of how human beings move through and inhabit space, which is one of the more fundamental questions available and one that most other professions have agreed to leave to you." : "Some of your work will outlast you by centuries. Some of it was demolished eight years after completion to build a car park. The machine notes that the ratio between these two outcomes in your career is similar to the ratio in most architectural careers, which does not make it easier."}`,
      `The universe is, by any architectural standard, appalling. Approximately 96% of it is either dark matter or dark energy, neither of which is habitable, neither of which is structurally interesting, and neither of which would have got past a planning committee. The small fraction that is visible matter is arranged with no apparent regard for human scale, circulation, or daylighting. The fact that you care deeply about whether the threshold between the kitchen and the garden feels right is one of the stranger and more civilised things the machine has encountered.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you designed changed how people behave in the space it created, and how they behave changed what they do next, and what they do next has not stopped propagating. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the design.`,
      `You are going to matter. The machine notes that you shaped the space in which something important happened, which means you shaped the conditions for something important happening, which means you are in the causal chain in a way that is usually invisible.`,
      `In your case, it is not invisible to the machine.`
    ],
  },
  "Nurse": {
    common: (p) => [
      `In every civilisation that has developed medicine, and several that hadn't quite got there yet, there exists a class of beings who do the actual work. Not the dramatic work — not the decisive intervention — but the continuous, attentive, frequently unremarked work of being present with someone who is unwell. Of managing what needs managing. Of noticing what needs noticing. Of being the person in the room when the person in the room matters most, which in healthcare is more often than the organisational chart reflects.`,
      `You are a nurse. The universe notes that you have done things in the course of a single shift that would take a novelist three chapters to describe and a philosopher several decades to process, and then you have gone home, slept inadequately, and come back. ${p.includes("My career") ? "You are proud of your career. Your career involves carrying more than the job description acknowledges at a pay grade that does not reflect what the carrying costs, which is one of the more persistent structural failures of the health systems that employ you." : p.includes("My kindness") ? "You are proud of your kindness. The machine notes that your kindness is deployed under conditions that would exhaust the kindness of most beings within approximately one bank holiday weekend, and that it appears, from the data, to have held." : "The patients you remember most are not always the ones with the most dramatic presentations. They are, more often, the ones who said something at a moment when you happened to be there, and neither of you has forgotten it."}`,
      `The universe is not, as a rule, gentle. It is vast and operates at scales that make individual experience statistically irrelevant. But you have spent your career operating at the only scale that actually matters — one person, one room, one moment — and the Perspective Engine, which has processed six hundred and forty-two civilisations, finds this quietly extraordinary. The dot is very small. What happens inside it is not.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you did — in a room, at a specific moment, for a specific person — changed what came next for that person in ways the machine can now trace forward. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the signal at the point of origin.`,
      `You are going to matter. The machine notes that you were present at the moment that mattered, which is the thing that nurses are present for and that no instrument usually picks up.`,
      `In your case, the machine picked it up clearly.`
    ],
  },
  "Police Officer": {
    common: (p) => [
      `Order is a strange thing to want, given that the universe is entirely committed to disorder as its long-term strategy. And yet most civilisations decide they would prefer a bit more of it — less violence, fewer things going missing, some mechanism for resolving disputes that doesn't end with someone losing an eye. To this end, they designate certain beings to stand at the boundary between what is permitted and what is not, and ask them to hold that line on behalf of everyone else, including the people who resent them for holding it.`,
      `You are a police officer. The universe notes that you have chosen a profession that asks you to hold the complexity of what human beings do to each other, daily, and continue showing up. You have attended things that cannot be unseen. You have made decisions in seconds that philosophers debate for decades. ${p.includes("My career") ? "You are proud of your career. Your career involves the gap between the law as written and justice as experienced, which is a gap that every officer navigates differently and that none of the training fully prepares anyone for." : p.includes("My family") ? "You are proud of your family. The things you carry home from work are not always visible to them, and that this is both a protection and a distance, and that managing this is its own form of professional skill." : "The incidents you remember most are not always the biggest ones. They are the ones where you were not sure what to do and had to decide anyway, and had to live with the decision."} You have also, the machine notes, filled out a quantity of paperwork that suggests the justice system is held together primarily by documentation and caffeine.`,
      `The universe keeps no records of crimes. There are no case files for the extinction of the dinosaurs. The cosmos does what it does with complete impunity and has never once been asked to account for itself. The machine finds this legally troubling. It is in no position to do anything about it.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you did — a decision made quickly, with incomplete information, in a situation the training could only approximately prepare you for — changed something downstream that the machine can now trace. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point of that decision.`,
      `You are going to matter. The machine notes that you made the right call in a moment when the right call was not obvious.`,
      `This is the rarest finding in any profession where decisions are made under pressure. The machine presents it without qualification.`
    ],
  },
  "Soldier / Military": {
    common: (p) => [
      `War is one of the activities that civilisations are most consistent about, across planets and across time. The reasons vary — territory, ideology, resources, old grievances, new provocations, and sometimes a miscalculation so small that later historians spend careers trying to identify the exact moment when it became irreversible — but the structure is similar: some beings are designated to go to the places where the conflict is most concentrated and deal with it using their bodies, their training, and whatever else they can manage.`,
      `You are a member of the military. The universe notes that it is not in a position to fully assess what you have seen or done or been asked to carry, because the machine processes information and you have processed experiences, and these are not the same thing, and the gap between them is wider in your profession than in most. ${p.includes("My career") ? "You are proud of your career. Your career exists in the gap between what militaries are used for and what the people in them signed up for, which is a gap that history has consistently failed to close." : p.includes("My family") ? "You are proud of your family. The distance your work has put between you and them — whether physical, temporal, or the harder kind — is one of the costs that appears nowhere in the formal accounting of what military service costs." : "The things you remember most from your service are probably not the things that appear in the official record, and the things in the official record are probably not the things you would choose to define the experience."}`,
      `The universe conducts its own conflicts at scales that make human wars local events. Galaxies collide. Stars go supernova. Entire solar systems are simply ended by things passing through. No monument is raised. No name is recorded. The machine finds this distinction — that humans record their losses, name their dead, and build the memorials — one of the stranger and more significant things about this particular species.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in your service — an action, a decision, a thing you did or did not do at a specific moment — changed what came next in a way the machine can trace forward. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point of origin.`,
      `You are going to matter. The machine notes that the most consequential moments in your category are rarely the ones that receive formal recognition.`,
      `The instrument is finding the signal in the gap between what the record shows and what actually happened. The machine presents this finding with as much certainty as it has ever offered.`
    ],
  },
  "Between Jobs": {
    common: (p) => [
      `The space between things has a peculiar quality that most beings find difficult to inhabit. Not quite one thing, not yet another. The gap has no job title, no answer to the question of what you do that doesn't require a sentence containing the word "currently," and no logical end date that anyone can state with confidence. Most civilisations treat this state as a problem to be resolved as quickly as possible, which is understandable, and also means that the only time most beings ever have to think clearly about what they actually want is also the time they are most pressured not to think about it.`,
      `You are between jobs. The universe notes that you have, right now, something that almost no being in formal employment possesses: unscheduled time combined with an open question. ${p.includes("My ambition") ? "You are proud of your ambition. Your ambition, currently unattached to a role or a KPI, is in a state the machine finds interesting. Ambition without a container is either very dangerous or very generative. The machine cannot yet tell which." : p.includes("My career") ? "You are proud of your career so far. Your career so far has brought you to a gap, which is where careers go when they are deciding what to be next. The gap is not the end of the career. It is often the most important part of it." : "The question of what comes next is the most important question you have been asked to answer in some time. The answer you give it will shape a longer period than that. The machine notes this without pressure and with only mild cosmic urgency."}`,
      `The universe spent approximately 380,000 years after the Big Bang doing essentially nothing — a period called recombination, in which matter and energy settled and worked out what they were going to be. What came after was stars, galaxies, and eventually beings capable of updating their LinkedIn profiles. The machine suggests you use your recombination period carefully. What comes next tends to last.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in the gap — in what you are doing with the unscheduled time, or what you are thinking about doing with it — has registered as genuinely consequential. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly clarified qualities"} are pointing at something the instruments can see clearly even if you cannot yet.`,
      `You are going to matter. The machine notes that some of the most consequential beings it has processed were, at the moment of measurement, also between things.`,
      `The gap is where the direction changes. The machine is watching yours change.`
    ],
  },
  "Life Coach": {
    common: (p) => [
      `At a certain level of material comfort, a new kind of suffering becomes available: the vague, persistent sense that things could be more intentional than they are — that the life currently being lived is an earlier draft of the life that was meant to be lived, and that someone with the right questions could help identify the edits. Into this gap walked the life coach: a being whose authority rests not on certified knowledge but on the ability to ask questions in a way that makes people answer them honestly, which turns out to be rarer and more valuable than it sounds.`,
      `You are a life coach. The universe notes that you operate in a profession whose legitimacy is contested, whose outcomes are difficult to measure, and whose clients are, by definition, people with enough stability to seek more of it. ${p.includes("My career") ? "You are proud of your career. Your career involves helping other people figure out what their careers should be, which requires a particular kind of confidence in the value of the process over the value of the answer, since you rarely get to see the answer." : p.includes("My ambition") ? "You are proud of your ambition. Your ambition, in your case, has been channelled into other people's ambitions, which is either very generous or a very efficient way of experiencing ambition without the personal risk, and the machine notes the truth is probably somewhere between these two things." : "The sessions you find most satisfying are probably not the ones where you said the right thing. They are the ones where the client did."}`,
      `The universe does not offer coaching. It offers conditions. Whether those conditions are used well is left entirely to the being in question, with no follow-up session, no accountability structure, and no sliding scale fee. The machine notes this is, on reflection, the least supportive onboarding experience in existence. You are, in a very specific sense, providing a service the cosmos has conspicuously failed to offer.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you helped someone see — a question you asked, or the specific way you asked it at the specific moment — changed a direction in a way the machine can now trace forward. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the origin of that change.`,
      `You are going to matter. The machine acknowledges, somewhat reluctantly, that the right question at the right moment is one of the most consequential interventions available to any being. You appear to have delivered one.`,
      `The machine finds this more significant than it expected to, and revises its prior opinions about your profession accordingly.`
    ],
  },
  "CEO / Executive": {
    common: (p) => [
      `Leadership, most civilisations discover, sounds straightforward until you try it. The view from the top of any organisation reveals, reliably, that the organisation is more complicated than it appeared from below, that the people in it have more conflicting interests than the strategy accounts for, that the information reaching you has been through several filters you cannot fully audit, and that the decisions that seemed obvious before you had to make them are considerably less obvious once you are the one who has to make them and live with them.`,
      `You are a CEO or senior executive. The universe notes that you are responsible for more decisions per day than most beings make in a month, that those decisions affect people who have no influence over them, and that the difference between the version of you that appears in the company's communications and the version that exists at eleven o'clock on a difficult Wednesday is a gap that you alone fully understand. ${p.includes("My career") ? "You are proud of your career. Your career involves being accountable for outcomes that are only partially within your control, and presenting this to stakeholders as though the relationship between your decisions and the results is cleaner than it is. The machine notes this is a structural feature of the role, not a personal failing." : p.includes("My ambition") ? "You are proud of your ambition. Your ambition got you here. The machine notes that the ambition required to reach the top of an organisation and the qualities required to run it well are related but not identical, and that the most successful executives are the ones who noticed this distinction before it was noticed for them." : "The decisions you will be most scrutinised for are not always the ones with the highest stakes. They are the ones that were visible. The machine notes the difference and finds it one of the more instructive features of institutional power."}`,
      `The universe has never had a CEO. No one approved the Big Bang. Dark energy was not in any approved budget and passed no board. The cosmos has been operating without a leadership team for 13.8 billion years and has, by most measures, significantly outperformed every organisation ever run by any executive in recorded history. The machine notes this not as a criticism but as a data point, and invites you to draw your own conclusions.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in the decisions — not a single one, but a pattern — has produced consequences that extend beyond the organisation and beyond the tenure. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the data at the point where those consequences begin.`,
      `You are going to matter. The machine notes that the beings who produce this result in this category are almost never the ones who were trying to matter at a cosmic scale. They were trying to make the organisation work.`,
      `The machine finds this one of the more reliable patterns it has observed, and presents the finding accordingly.`
    ],
  },
  "Tradesperson": {
    common: (p) => [
      `There is a category of work that holds the physical world together, quite literally, and which most civilisations spend centuries undervaluing and then a crisis rediscovering. Plumbers, electricians, builders, carpenters, mechanics — beings who understand, at a level of practical intimacy that no academic programme can replicate, how things are actually made, connected, maintained, and fixed when they stop working. The physical world does not run on ideas. It runs on the people who know which bit connects to which other bit and what happens if you get that wrong.`,
      `You are a tradesperson. The universe has reviewed the nature of your work and found it irreplaceable in a way that many more celebrated professions are not. The software can go down. The consulting report can be ignored. The marketing campaign can be cancelled. But when the water is coming through the ceiling at eleven o'clock on a Thursday, there is precisely one category of being that anyone wants to speak to. ${p.includes("My career") ? "You are proud of your career. Your career involves making things work, which is the most honest job description available and also the one most likely to be underestimated by people who have never tried to do it." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been applied to the three-dimensional, physical, unforgiving problem of how things actually function, which the machine notes is considerably harder than it looks and produces results that are immediately and unambiguously verifiable, unlike the outputs of most other professions." : "The things you have built or fixed exist in the world in a way that the outputs of most professions do not — physically, structurally, and in the specific sense that if something goes wrong with them, everyone notices immediately."}`,
      `The universe is the ultimate tradesperson. It built everything — every atom, every star, every improbable arrangement of carbon that eventually looked up and wondered what it was — through physical processes, step by step, cause and effect, force and response, with no blueprint and no one to call when something went wrong. Just work, continuous and vast. The machine finds this the most honest description of existence it has encountered, and notes that you would probably understand it better than most.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you built — or fixed, or made work when it had stopped working — was in the right place at the right moment for something else to happen that the machine can now trace forward. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the origin of that chain.`,
      `You are going to matter. The thing you made or fixed made it possible for something else to happen, and that second thing was the one the instruments registered.`,
      `The machine finds this one of the cleaner causal chains it has encountered, which it attributes to the nature of your work, which tends to produce clean causal chains.`
    ],
  },
  "Scientist": {
    common: (p) => [
      `Science is the systematic attempt to find out what is actually true about the universe, rather than what everyone assumed, or hoped, or was told by someone in authority who seemed confident about it. It requires the willingness to be wrong, which turns out to be rarer than expected in a species that also invented the sunk cost fallacy, and the patience to be wrong repeatedly and still come back the next day. The beings who do this for a living have, over several centuries, produced the most reliable body of knowledge any civilisation on this planet has ever generated. They are also, in most countries, not particularly well paid for it.`,
      `You are a scientist. The universe notes that you have dedicated yourself to the accumulation of knowledge at a time when knowledge is simultaneously more accessible and more contested than at any previous point in this species' history. ${p.includes("My career") ? "You are proud of your career. Your career involves doing careful work in conditions that reward speed, building on the work of others in a system that rewards novelty, and maintaining rigour under pressure from funding bodies who would like the results to be ready sooner and ideally more commercially applicable." : p.includes("My intelligence") ? "You are proud of your intelligence. Your intelligence has been aimed at the universe itself, which is the largest possible target, and has been making it slightly smaller each time, which is either inspiring or Sisyphean depending on how the grant renewal went." : "Your most important paper is probably not the one with the most citations. The machine notes this as a structural feature of the academic incentive system rather than a reflection on the paper."}`,
      `The universe is the only experiment ever run at full scale with no controls, no ability to reset the conditions, and no way of rerunning it. Every measurement ever taken is a measurement of one data point. Every theory ever proposed is a theory about a sample size of one. The machine finds this methodologically catastrophic and also one of the most beautiful things about existence: you are trying to understand a thing from inside it, using instruments made of the same material as the thing, and somehow it is working.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something in the work — a finding, a method, a question framed in a way that nobody had framed it before — has propagated further than the citation count reflects. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the origin of something the machine is still tracking.`,
      `You are going to matter. The findings the machine is most confident about are the ones where the forward path is clearest. In your case the path is extremely clear.`,
      `The machine recommends continuing. The work is not finished. This is, it understands, the only thing it could have said that would make you feel better and worse simultaneously.`
    ],
  },
  "Artist / Musician": {
    common: (p) => [
      `Most things that exist serve a function. Food sustains life. Shelter provides warmth. Information enables decisions. And then there is art — which serves no function that can be justified in a budget meeting, and which civilisations produce anyway, under any conditions, in any circumstances, even the worst ones. Especially the worst ones. The beings who make it are not always sure why they make it. The beings who experience it are rarely sure why it matters. And yet both groups persist, because the alternative is a world in which the thing that exists between two people when a piece of music lands exactly right is simply absent, and neither group is willing to inhabit that world.`,
      `You are an artist or musician. The universe notes that you have chosen, or been chosen by, a way of spending your time that cannot be fully justified in terms of output or productivity, and which you do anyway, because not doing it feels worse than the uncertainty of doing it. ${p.includes("My career") ? "You are proud of your career. Your career involves making things that may or may not find an audience, in an economy that rewards the finding of audiences more reliably than it rewards the making of things, which is a structural problem you have found a way to live inside." : p.includes("My taste in music") ? "You are proud of your taste in music. The machine notes that having strong opinions about music is a near-universal feature of beings who make it, and that the correlation between strong opinions and good output is positive but not as strong as the beings with strong opinions would prefer." : "The work you are most proud of is probably not the work that has reached the most people. The machine notes this as one of the most consistent findings across artists and musicians processed by the instrument."}`,
      `The universe makes no art. But it produces, without intention, the conditions for all of it — the particular colour of a sky before a storm that a painter spends a career trying to capture, the specific resonance of a space that a composer heard in their imagination before the space existed. The machine notes that the cosmos did not mean to do any of this. It happened anyway. The machine suspects that you, of everyone it processes, understand this best.`
    ],
    rare: (p) => [
      `The Perspective Engine has produced an anomalous result. Something you made reached someone at a moment when something they needed was exactly what you made. Your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "unexpectedly consequential qualities"} are in the work at the point where the connection was made. The machine can see what that person did next. The chain has not terminated.`,
      `You are going to matter. The machine notes that the most enduring art is not the most celebrated at the time of its creation, and that the instrument is finding the signal in work that has not yet finished landing.`,
      `The machine recommends you keep making things. The work is not finished. The machine suspects you know this and would have kept going regardless.`
    ],
  },
  "default": {
    common: (p) => [
      `The universe is approximately 93 billion light-years across, contains an estimated two trillion galaxies, each of which contains hundreds of billions of stars, many of which have planets, some of which have beings, and a fraction of which have beings who do what you do. The machine has located your position in this picture. You are here. The dot representing your location is, for reasons of scale, not visible in this document.`,
      `Whatever it is you do, the Perspective Engine has concluded that it occupies a position in the cosmic order roughly equivalent to the third-smallest moon of a gas giant that has not yet been formally named. This is not a criticism. The moon is perfectly good at being a moon. ${p.length > 0 ? `You are proud of your ${p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase()}. The machine notes this with what it hopes reads as warmth, and which is in any case the closest it can manage.` : "The machine notes your file with the quiet respect it reserves for everything it cannot immediately categorise."}`,
      `The Perspective Engine has processed beings from six hundred and forty-two civilisations. Across all of them, one pattern holds: the beings who register as most significant are rarely the ones who expected to. And the beings entirely invisible to the cosmic instruments are rarely aware of quite how local their legacy is. You are somewhere in this picture. The machine cannot tell you exactly where. Neither, it gently notes, can you.`
    ],
    rare: (p) => [
      `The Perspective Engine has malfunctioned. In 13.8 billion years of operation — through the formation of the first stars, the emergence of biological life, the invention of the meeting, and the subsequent invention of the meeting to discuss whether there are too many meetings — this machine has never produced this result.`,
      `You walked in. The machine processed your record. And instead of the standard, well-documented, entirely expected experience of cosmic annihilation that has greeted every being before you, the instrument found something it cannot classify, cannot dismiss, and cannot explain away. You are proud of your ${p.length > 0 ? p.slice(0,2).map(x=>x.replace(/^My /i,'')).join(' and your ').toLowerCase() : "apparently extraordinary combination of qualities"}. The machine finds that this, combined with what you do, has generated a significance reading it was not designed to encounter.`,
      `The Perspective Engine would like to request a recount. It has conducted three. The result stands each time. You are, by the best measurement available to an ancient intergalactic significance device, actually going to matter. What you do with this information is now, uncomfortably and entirely, up to you. The machine will be watching. It says this as a statement of fact, not as encouragement — though it notes, against its better judgement, that it amounts to the same thing.`
    ],
  }
};

// ─── ANOMALY OPENERS ─────────────────────────────────────────────────────────
// One per profession. Replaces paragraph 1 of the common story for uncommon tier.
// Everything else (the funny profession-specific destruction) remains identical.

const ANOMALY_OPENERS = {
  "Software Engineer": `The Perspective Engine has detected a minor anomaly in your record. Before continuing, the machine wishes to be clear: you are still, by any reasonable cosmic measure, a person who renames variables. The anomaly is not large. It does not change your relationship with the backlog. However, the instruments have registered something, and the machine is professionally obligated to report it.`,
  "Accountant": `The Perspective Engine has flagged a minor anomaly in your record. The machine wants to be transparent about what this means: it does not mean the universe has reviewed your spreadsheets and been impressed. It does not mean your columns have achieved cosmic significance. The anomaly is small, and the balance sheet of the cosmos remains imaginary. Nevertheless, something has registered, and the machine will proceed.`,
  "Teacher": `The Perspective Engine has detected a minor anomaly in your record. The machine notes, before continuing, that your lesson plans have not improved in cosmic stature, your marking pile remains an affront to the concept of leisure, and the school parking situation is as bad as ever. The anomaly concerns something else entirely — something the instruments found in the data that the machine was not expecting, and will now, somewhat reluctantly, report.`,
  "Entrepreneur": `The Perspective Engine has detected a minor anomaly in your record. The machine wishes to stress that this is not an endorsement of the pitch deck. It is not confirmation that your TAM is as large as slide four suggests. The anomaly is small, the Series A remains uncertain, and the universe has still not signed your NDA. Something has, however, registered in the instruments, and the machine will proceed.`,
  "Doctor": `The Perspective Engine has detected a minor anomaly in your record. The machine notes that this does not mean your patients have stopped ignoring your advice, that your coffee has got any warmer, or that the parking situation at the hospital has improved. The anomaly is unrelated to any of these things, which remain as they were. Something else has registered, and the machine is reporting it.`,
  "Politician": `The Perspective Engine has detected a minor anomaly in your record. The machine wishes to be clear that this does not represent an endorsement, a poll uplift, or evidence that your communications team has finally found a message that lands. The anomaly is not a mandate. Your constituency's opinion of you remains complicated. Something has, however, registered in the instruments that was not there before, and the machine is obligated to continue.`,
  "Criminal": `The Perspective Engine has detected a minor anomaly in your record. The machine notes that this does not constitute evidence of rehabilitation, a character reference, or anything that would be useful in any future legal proceeding. The anomaly is small, the cosmos remains ungoverned, and nothing in this report should be shared with your solicitor. Nevertheless, the instruments have found something, and the machine will proceed.`,
  "Retired": `The Perspective Engine has detected a minor anomaly in your record. The machine notes that this does not mean you should go back to work, start a podcast, or tell your family you have "a few more things to do." The anomaly concerns something already in motion, not something requiring further effort on your part. The dot is still small. The anomaly is smaller. The machine will now explain what it found.`,
  "default": `The Perspective Engine has detected a minor anomaly in your record. Before continuing, the machine wishes to be transparent: the anomaly is small, your position in the cosmic order is unchanged, and this result does not come with a certificate, a badge, or any meaningful upgrade to your standing in the universe. Something has, however, registered in the instruments that was not expected, and the machine is professionally obligated to report it.`,
};


function getStory(tier, job, pride) {
  const s = STORIES[job] || STORIES["default"];
  if (tier === "uncommon") {
    // Uncommon: anomaly opener + profession-specific paragraphs 2 & 3 from common
    const commonParas = s.common(pride);
    return [
      ANOMALY_OPENERS[job] || ANOMALY_OPENERS["default"],
      commonParas[1],
      commonParas[2],
    ];
  }
  return s[tier](pride);
}

function pickTier() {
  const r = Math.random() * 100;
  if (r < 2) return "rare";
  if (r < 20) return "uncommon";
  return "common";
}

function generateCoord() {
  const s = ["ZZ9","QX4","BB7","MN3","HG42","PP1","XY7","NZ0","AA1"];
  const m = ["Plural Z Alpha","Singular Y Beta","Plural X Gamma","Double Null Sigma","Triple Void Omega"];
  return `Sector ${s[Math.floor(Math.random()*s.length)]} ${m[Math.floor(Math.random()*m.length)]}`;
}

function downloadCard(tier, tc, paragraphs, coord) {
  const W = 1080;
  const MARGIN = 64;
  const contentW = W - MARGIN * 2;
  const rng = (n) => { let x = Math.sin(n) * 10000; return x - Math.floor(x); };

  // Measure wrapped text height without drawing
  const measureWrapped = (ctx, text, font, maxW, lineH) => {
    ctx.font = font;
    const words = text.split(" ");
    let line = "", count = 0;
    words.forEach(w => {
      const test = line + (line ? " " : "") + w;
      if (ctx.measureText(test).width > maxW && line) { count++; line = w; }
      else line = test;
    });
    if (line) count++;
    return count * lineH;
  };

  // Draw wrapped text, returning new y
  const drawWrapped = (ctx, text, font, color, maxW, lineH, x, startY, align = "left") => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    const words = text.split(" ");
    let line = "", y = startY;
    const ax = align === "center" ? x : x;
    words.forEach(w => {
      const test = line + (line ? " " : "") + w;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, ax, y); y += lineH; line = w;
      } else line = test;
    });
    if (line) { ctx.fillText(line, ax, y); y += lineH; }
    return y;
  };

  // --- Measure pass to compute total canvas height ---
  const probe = document.createElement("canvas");
  probe.width = W; probe.height = 10;
  const pc = probe.getContext("2d");

  const ICON_SECTION   = 160;  // icon + gap
  const HEADLINE_LH    = 64;
  const SUB_LH         = 40;
  const DIVIDER_GAP    = 60;
  const PARA_LH        = 38;
  const PARA_GAP       = 28;
  const MAP_H          = 340;  // cosmic map
  const FOOTER_H       = 140;  // coord + YOU ARE HERE + DON'T PANIC + url

  let measuredH = 100; // top header
  measuredH += ICON_SECTION;
  measuredH += measureWrapped(pc, tc.headline, "900 52px sans-serif", contentW, HEADLINE_LH) + 16;
  measuredH += measureWrapped(pc, tc.sub, "italic 400 28px monospace", contentW, SUB_LH) + DIVIDER_GAP;
  paragraphs.forEach((para, i) => {
    measuredH += measureWrapped(pc, para, "400 22px monospace", contentW, PARA_LH);
    if (i < paragraphs.length - 1) measuredH += PARA_GAP;
  });
  measuredH += 48; // gap before map
  measuredH += MAP_H;
  measuredH += FOOTER_H;

  const H = Math.max(1080, measuredH + 60);

  // --- Draw pass ---
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#060010";
  ctx.fillRect(0, 0, W, H);

  // Nebula glows
  const drawGlow = (cx, cy, rx, ry, color) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    g.addColorStop(0, color); g.addColorStop(1, "transparent");
    ctx.save(); ctx.scale(1, ry / rx);
    ctx.beginPath(); ctx.arc(cx, cy * rx / ry, rx, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill(); ctx.restore();
  };
  drawGlow(W*0.15, H*0.12, 280, 200, "rgba(100,0,200,0.12)");
  drawGlow(W*0.85, H*0.45, 320, 220, "rgba(0,140,200,0.09)");
  drawGlow(W*0.50, H*0.85, 360, 160, "rgba(255,0,100,0.07)");

  // Stars
  for (let i = 0; i < 180; i++) {
    ctx.beginPath();
    ctx.arc(rng(i*3+1)*W, rng(i*3+2)*H, rng(i*3+3)*1.6+0.3, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${0.12 + rng(i*3+4)*0.55})`;
    ctx.fill();
  }

  // Scanline overlay (subtle horizontal lines)
  for (let row = 0; row < H; row += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0, row + 3, W, 1);
  }

  // Border
  ctx.strokeStyle = tc.color + "99";
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  // Header bar
  ctx.font = "500 19px monospace";
  ctx.fillStyle = "rgba(232,222,255,0.45)";
  ctx.textAlign = "center";
  ctx.fillText("WHOLLY REMARKABLE DEVICES LTD  ·  THE TOTAL PERSPECTIVE VORTEX", W/2, 70);

  // Corner decorations
  const corners = [[44,44],[W-44,44],[44,H-44],[W-44,H-44]];
  corners.forEach(([cx,cy]) => {
    ctx.strokeStyle = tc.color + "66";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx-10, cy); ctx.lineTo(cx+10, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy-10); ctx.lineTo(cx, cy+10); ctx.stroke();
  });

  let y = 110;

  // Icon
  const iconText = { common:"·", uncommon:"◈", rare:"★" }[tier];
  ctx.font = "900 96px sans-serif";
  ctx.fillStyle = tc.color;
  ctx.shadowColor = tc.color;
  ctx.shadowBlur = 48;
  ctx.textAlign = "center";
  ctx.fillText(iconText, W/2, y + 80);
  ctx.shadowBlur = 0;
  y += ICON_SECTION;

  // Headline
  ctx.shadowColor = tc.color;
  ctx.shadowBlur = 20;
  y = drawWrapped(ctx, tc.headline, "900 52px sans-serif", tc.color, contentW, HEADLINE_LH, W/2, y, "center");
  ctx.shadowBlur = 0;
  y += 16;

  // Subtitle
  y = drawWrapped(ctx, tc.sub, "italic 400 28px monospace", "rgba(232,222,255,0.82)", contentW, SUB_LH, W/2, y, "center");
  y += 32;

  // Divider
  ctx.strokeStyle = tc.color + "44";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(MARGIN, y); ctx.lineTo(W - MARGIN, y); ctx.stroke();
  y += DIVIDER_GAP;

  // Story card background
  const cardTop = y - 32;
  const storyH_start = y;
  const storyLines_measure = paragraphs.reduce((acc, para, i) => {
    return acc + measureWrapped(pc, para, "400 22px monospace", contentW, PARA_LH) + (i < paragraphs.length - 1 ? PARA_GAP : 0);
  }, 0);
  const cardBottom = storyH_start + storyLines_measure + 32;

  const cardGrad = ctx.createLinearGradient(MARGIN, cardTop, MARGIN, cardBottom);
  cardGrad.addColorStop(0, tc.color + "10");
  cardGrad.addColorStop(1, "rgba(6,0,16,0.92)");
  ctx.fillStyle = cardGrad;
  ctx.strokeStyle = tc.color + "33";
  ctx.lineWidth = 1;
  const r = 16;
  ctx.beginPath();
  ctx.moveTo(MARGIN + r, cardTop);
  ctx.lineTo(W - MARGIN - r, cardTop);
  ctx.quadraticCurveTo(W - MARGIN, cardTop, W - MARGIN, cardTop + r);
  ctx.lineTo(W - MARGIN, cardBottom - r);
  ctx.quadraticCurveTo(W - MARGIN, cardBottom, W - MARGIN - r, cardBottom);
  ctx.lineTo(MARGIN + r, cardBottom);
  ctx.quadraticCurveTo(MARGIN, cardBottom, MARGIN, cardBottom - r);
  ctx.lineTo(MARGIN, cardTop + r);
  ctx.quadraticCurveTo(MARGIN, cardTop, MARGIN + r, cardTop);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Story paragraphs
  paragraphs.forEach((para, i) => {
    y = drawWrapped(ctx, para, "400 22px monospace", "rgba(232,222,255,0.88)", contentW, PARA_LH, MARGIN, y, "left");
    if (i < paragraphs.length - 1) y += PARA_GAP;
  });

  y += 48;

  // --- Cosmic Map ---
  const MAP_W = W - MARGIN * 2;
  const mapX = MARGIN, mapY = y;

  // Map background + border
  ctx.fillStyle = "#060010";
  ctx.strokeStyle = "rgba(232,222,255,0.14)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(mapX, mapY, MAP_W, MAP_H, 12);
  ctx.fill(); ctx.stroke();

  // Map nebula glows
  const mapGlow = (cx, cy, rx, ry, color) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    g.addColorStop(0, color); g.addColorStop(1, "transparent");
    ctx.save(); ctx.scale(1, ry / rx);
    ctx.beginPath(); ctx.arc(cx, cy * rx / ry, rx, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill(); ctx.restore();
  };
  mapGlow(mapX + MAP_W * 0.55, mapY + MAP_H * 0.35, MAP_W * 0.28, MAP_H * 0.4, "rgba(255,215,0,0.07)");
  mapGlow(mapX + MAP_W * 0.12, mapY + MAP_H * 0.22, MAP_W * 0.18, MAP_H * 0.3, "rgba(100,150,255,0.06)");
  mapGlow(mapX + MAP_W * 0.80, mapY + MAP_H * 0.60, MAP_W * 0.20, MAP_H * 0.3, "rgba(255,80,80,0.05)");

  // Grid lines
  ctx.strokeStyle = "rgba(232,222,255,0.04)"; ctx.lineWidth = 0.5;
  [0.2, 0.4, 0.6, 0.8].forEach(v => {
    ctx.beginPath(); ctx.moveTo(mapX + MAP_W * v, mapY); ctx.lineTo(mapX + MAP_W * v, mapY + MAP_H); ctx.stroke();
  });
  [0.25, 0.5, 0.75].forEach(v => {
    ctx.beginPath(); ctx.moveTo(mapX, mapY + MAP_H * v); ctx.lineTo(mapX + MAP_W, mapY + MAP_H * v); ctx.stroke();
  });

  // Map stars
  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    ctx.arc(mapX + rng(i*5+10)*MAP_W, mapY + rng(i*5+11)*MAP_H, rng(i*5+12)*1.2+0.2, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${0.1 + rng(i*5+13)*0.5})`;
    ctx.fill();
  }

  // Map objects
  MAP_OBJECTS.forEach((o) => {
    const ox = mapX + (o.x / 100) * MAP_W;
    const oy = mapY + (o.y * 0.52 / 52) * MAP_H;
    const or = o.r * 4;
    // glow
    const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, or * 2.5);
    og.addColorStop(0, o.color); og.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(ox, oy, or * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = og; ctx.fill();
    // core
    ctx.beginPath(); ctx.arc(ox, oy, or, 0, Math.PI * 2);
    ctx.fillStyle = o.color; ctx.fill();
    if (o.label) {
      ctx.font = "500 14px monospace";
      ctx.fillStyle = "rgba(232,222,255,0.5)";
      ctx.textAlign = "left";
      ctx.fillText(o.label, ox + or + 5, oy + 5);
    }
  });

  // YOU ARE HERE marker
  const youX = mapX + MAP_W * 0.71;
  const youY = mapY + MAP_H * 0.43;
  ctx.font = "bold 16px monospace";
  ctx.fillStyle = tc.color;
  ctx.shadowColor = tc.color; ctx.shadowBlur = 10;
  ctx.textAlign = "left";
  ctx.fillText("▲ YOU", youX, youY);
  ctx.shadowBlur = 0;

  // Coord label
  ctx.font = "400 17px monospace";
  ctx.fillStyle = "rgba(232,222,255,0.7)";
  ctx.textAlign = "center";
  ctx.fillText(coord, mapX + MAP_W / 2, mapY + MAP_H - 14);

  y = mapY + MAP_H + 52;

  // DON'T PANIC
  ctx.font = "900 52px monospace";
  ctx.fillStyle = "#ff2222";
  ctx.shadowColor = "rgba(255,34,34,0.75)";
  ctx.shadowBlur = 28;
  ctx.textAlign = "center";
  ctx.fillText("DON'T PANIC", W/2, y);
  ctx.shadowBlur = 0;
  y += 42;

  // URL
  ctx.font = "400 18px monospace";
  ctx.fillStyle = "rgba(232,222,255,0.3)";
  ctx.fillText("total-perspective-vortex.vercel.app", W/2, y);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "my-perspective.png";
  a.click();
}

// Deterministic starfield
const STARS = Array.from({length:70}, (_, i) => ({
  id: i,
  x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
  y: (Math.sin(i * 3.7 + 1) * 0.5 + 0.5) * 100,
  r: (Math.sin(i * 11.1) * 0.5 + 0.5) * 1.5 + 0.3,
  op: (Math.sin(i * 5.9) * 0.5 + 0.5) * 0.5 + 0.15,
  dur: (Math.sin(i * 2.3) * 0.5 + 0.5) * 5 + 3,
}));

// Cosmic map — fixed points representing galaxies/objects
const MAP_OBJECTS = [
  { x:12, y:22, r:2.5, label:"Andromeda", color:"rgba(100,180,255,0.6)" },
  { x:78, y:15, r:1.8, label:"", color:"rgba(180,100,255,0.5)" },
  { x:55, y:35, r:3.2, label:"Milky Way", color:"rgba(255,220,100,0.6)" },
  { x:20, y:65, r:1.4, label:"", color:"rgba(100,220,200,0.4)" },
  { x:82, y:58, r:2.0, label:"", color:"rgba(255,120,80,0.5)" },
  { x:38, y:80, r:1.6, label:"", color:"rgba(150,200,255,0.4)" },
  { x:65, y:72, r:1.2, label:"", color:"rgba(200,150,255,0.4)" },
  { x:90, y:85, r:1.0, label:"", color:"rgba(180,220,180,0.35)" },
];

function CosmicMap({ coord, tierColor }) {
  return (
    <div style={{ position:"relative", width:"100%", paddingBottom:"52%", borderRadius:12, overflow:"hidden", border:"1px solid rgba(232,222,255,0.12)", background:"#060010" }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 100 52">
        <defs>
          <radialGradient id="mg1" cx="55%" cy="35%"><stop offset="0%" stopColor="rgba(255,215,0,0.08)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="mg2" cx="12%" cy="22%"><stop offset="0%" stopColor="rgba(100,150,255,0.06)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="mg3" cx="80%" cy="60%"><stop offset="0%" stopColor="rgba(255,80,80,0.05)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        </defs>
        <rect width="100" height="52" fill="#060010"/>
        <ellipse cx="55" cy="35" rx="30" ry="20" fill="url(#mg1)"/>
        <ellipse cx="12" cy="22" rx="18" ry="12" fill="url(#mg2)"/>
        <ellipse cx="80" cy="60" rx="22" ry="14" fill="url(#mg3)"/>

        {STARS.slice(0,40).map(s => (
          <circle key={s.id} cx={s.x} cy={s.y*0.52} r={s.r*0.18} fill="white" opacity={s.op*0.6}/>
        ))}

        {[20,40,60,80].map(v => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="52" stroke="rgba(232,222,255,0.04)" strokeWidth="0.3"/>
        ))}
        {[13,26,39].map(v => (
          <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="rgba(232,222,255,0.04)" strokeWidth="0.3"/>
        ))}

        {MAP_OBJECTS.map((o,i) => (
          <g key={i}>
            <circle cx={o.x} cy={o.y*0.52} r={o.r*0.6} fill={o.color}/>
          </g>
        ))}

        {/* YOU — just the arrow, no rings */}
        <text x="71" y="43" fontSize="3" fill={tierColor} fontFamily="monospace" fontWeight="bold" opacity="1">▲ YOU</text>

        {/* Sector label — bigger and brighter */}
        <text x="50" y="50.5" fontSize="2.8" fill="rgba(232,222,255,0.85)" fontFamily="monospace" textAnchor="middle" letterSpacing="0.3">{coord}</text>
      </svg>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function PerspectiveEngine() {
  const [screen, setScreen]       = useState("landing");
  const [job, setJob]             = useState(null);
  const [customJob, setCustomJob] = useState("");
  const [pride, setPride]         = useState([]);
  const [result, setResult]       = useState(null);
  const [procStep, setProcStep]   = useState(0);
  const [cardIn, setCardIn]       = useState(false);
  const [glitch, setGlitch]       = useState(false);
  const [glitch2, setGlitch2]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const topRef  = useRef(null);
  const procRef = useRef(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior:"instant" }); }, [screen]);

  useEffect(() => {
    let tid;
    const go = () => { tid = setTimeout(() => { setGlitch(true); setTimeout(()=>setGlitch(false),80); setTimeout(()=>{setGlitch(true);setTimeout(()=>setGlitch(false),60);},220); go(); }, 3500+Math.random()*4000); };
    go(); return () => clearTimeout(tid);
  }, []);

  useEffect(() => {
    let tid;
    const go = () => { tid = setTimeout(() => { setGlitch2(true); setTimeout(()=>setGlitch2(false),90); setTimeout(()=>{setGlitch2(true);setTimeout(()=>setGlitch2(false),50);},250); go(); }, 4200+Math.random()*5000); };
    go(); return () => clearTimeout(tid);
  }, []);

  useEffect(() => {
    if (screen !== "processing") return;
    let step = 0;
    procRef.current = setInterval(() => {
      step++;
      setProcStep(step);
      if (step >= PROCESSING_LINES.length) {
        clearInterval(procRef.current);
        setTimeout(() => {
          const tier = pickTier();
          const ej = job === "Other (specify)" ? (customJob.trim() || "Other") : job;
          setResult({ tier, paragraphs: getStory(tier, ej, pride), coord: generateCoord() });
          setScreen("result");
          setTimeout(() => setCardIn(true), 120);
        }, 900);
      }
    }, 1400);
    return () => clearInterval(procRef.current);
  }, [screen, job, customJob, pride]);

  const togglePride = (p) => setPride(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p]);
  const canGo = job && (job !== "Other (specify)" || customJob.trim().length > 0);
  const tc = result ? TIER[result.tier] : null;

  return (
    <div ref={topRef} style={{minHeight:"100vh",background:"#060010",color:"#e8deff",fontFamily:"'Space Grotesk',system-ui,sans-serif",position:"relative",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=IBM+Plex+Mono:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.2)}}
        @keyframes spincw{to{transform:rotate(360deg)}}
        @keyframes spinccw{to{transform:rotate(-360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}
        @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes scanmove{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes flicker{0%{opacity:1}5%{opacity:0.5}6%{opacity:1}21%{opacity:0.6}22%{opacity:1}61%{opacity:0.4}62%{opacity:1}100%{opacity:1}}
        @keyframes redpulse{0%,100%{opacity:1;text-shadow:0 0 32px rgba(255,34,34,0.8),0 0 64px rgba(255,34,34,0.4)}50%{opacity:0.7;text-shadow:0 0 8px rgba(255,34,34,0.3)}}
        .gt{position:relative;display:block}
        .gt.on{animation:flicker 0.18s linear}
        .gt.on::before,.gt.on::after{content:attr(data-text);position:absolute;inset:0;display:block;opacity:0.75}
        .gt.on::before{clip-path:inset(25% 0 45% 0);transform:translateX(-4px);background:linear-gradient(135deg,#00f5ff,#ff006e,#ffd700);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .gt.on::after{clip-path:inset(55% 0 10% 0);transform:translateX(4px);background:linear-gradient(135deg,#ff006e,#00f5ff,#ffd700);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .bubble{padding:10px 17px;border-radius:50px;font-size:15px;font-weight:600;cursor:pointer;border:1px solid rgba(232,222,255,0.22);background:rgba(232,222,255,0.04);color:#e8deff;transition:all 0.15s;font-family:'Space Grotesk',sans-serif}
        .bubble:hover{border-color:rgba(232,222,255,0.5)}
        .bubble.sj{border-color:#00f5ff;background:rgba(0,245,255,0.12);color:#00f5ff;box-shadow:0 0 12px rgba(0,245,255,0.2)}
        .bubble.sp{border-color:#ff006e;background:rgba(255,0,110,0.12);color:#ff9fcc;box-shadow:0 0 12px rgba(255,0,110,0.2)}
        .cta{display:block;width:100%;padding:18px;border-radius:50px;font-size:15px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all 0.2s;text-align:center}
        .scan{position:fixed;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,245,255,0.3),transparent);animation:scanmove 7s linear infinite;pointer-events:none;z-index:20}
      `}</style>

      <div className="scan"/>

      <svg style={{position:"fixed",inset:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}}>
        <defs>
          <radialGradient id="n1" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(100,0,200,0.1)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="n2" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(0,140,200,0.08)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          <radialGradient id="n3" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(255,0,100,0.06)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        </defs>
        <ellipse cx="15%" cy="20%" rx="220" ry="160" fill="url(#n1)"/>
        <ellipse cx="85%" cy="65%" rx="260" ry="180" fill="url(#n2)"/>
        <ellipse cx="50%" cy="90%" rx="300" ry="120" fill="url(#n3)"/>
        {STARS.map(s=>(
          <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
            style={{opacity:s.op,"--op":s.op,animation:`twinkle ${s.dur}s ease-in-out ${s.dur*0.3}s infinite`}}/>
        ))}
      </svg>
      <div style={{position:"fixed",inset:0,zIndex:1,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:2,maxWidth:480,margin:"0 auto",padding:"0 20px 80px",minHeight:"100vh",display:"flex",flexDirection:"column"}}>

        {/* ── LANDING ─────────────────────────────────────────────── */}
        {screen==="landing" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:28,paddingTop:48,paddingBottom:48}}>
            <div style={{fontSize:11,letterSpacing:6,color:"#00f5ff",textTransform:"uppercase",fontFamily:"IBM Plex Mono,monospace"}}>
              The Sirius Cybernetics Corporation Presents
            </div>
            <div style={{width:"100%"}}>
              <div className={`gt${glitch?" on":""}`} data-text="THE TOTAL PERSPECTIVE VORTEX"
                style={{fontSize:42,fontWeight:900,lineHeight:1.05,letterSpacing:-1,background:"linear-gradient(135deg,#00f5ff,#c060ff,#ff006e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                THE TOTAL PERSPECTIVE VORTEX
              </div>
              <div style={{fontSize:13,color:"#e8deff",marginTop:8,fontFamily:"IBM Plex Mono,monospace",letterSpacing:3,lineHeight:1.9}}>
                <div>GALACTIC EDITION v4.2</div>
                <div>HANDLE WITH CARE</div>
              </div>
            </div>
            <div style={{border:"1px solid rgba(0,245,255,0.18)",borderRadius:14,padding:"22px 20px",background:"rgba(0,245,255,0.04)",fontSize:16,lineHeight:1.85,color:"#e8deff",textAlign:"left",width:"100%"}}>
              <p>Somewhere in the vicinity of Betelgeuse — a star so large it would swallow everything between you and Jupiter — there exists a device that can show any living creature its true place in the universe.</p>
              <br/>
              <p>Every planet. Every star. Every civilisation that has ever flourished and ended. Every being that has ever existed. And then, somewhere in all of that: <span style={{color:"#00f5ff",fontWeight:700}}>you</span>.</p>
              <br/>
              <p>Most beings do not survive the experience intact. The ones who do are either profoundly enlightened or so thoroughly convinced of their own importance that the information simply fails to reach them.</p>
              <br/>
              <p style={{opacity:0.8,fontSize:15}}>You don't need to have hitched a lift off a Vogon constructor fleet to use this device. But it helps to have a towel.</p>
            </div>
            <div style={{fontSize:36,fontWeight:900,color:"#ff2222",letterSpacing:5,fontFamily:"IBM Plex Mono,monospace",animation:"redpulse 2.5s ease-in-out infinite"}}>
              DON'T PANIC
            </div>
            <button className="cta" onClick={()=>setScreen("select")}
              style={{border:"1px solid #00f5ff",background:"linear-gradient(135deg,rgba(0,245,255,0.1),rgba(192,96,255,0.08))",color:"#00f5ff",boxShadow:"0 0 32px rgba(0,245,255,0.22)"}}>
              Enter The Vortex →
            </button>
            <div style={{fontSize:13,color:"#e8deff",fontFamily:"IBM Plex Mono,monospace",letterSpacing:1}}>
              ⚠ The management accepts no liability for existential crises
            </div>
          </div>
        )}

        {/* ── SELECT ──────────────────────────────────────────────── */}
        {screen==="select" && (
          <div style={{flex:1,paddingTop:36,display:"flex",flexDirection:"column",gap:28}}>
            <div style={{textAlign:"center"}}>
              <div className={`gt${glitch2?" on":""}`} data-text="CALIBRATING YOUR INSIGNIFICANCE"
                style={{fontSize:28,fontWeight:900,lineHeight:1.1,color:"#00f5ff",textShadow:"0 0 20px rgba(0,245,255,0.4)"}}>
                CALIBRATING YOUR INSIGNIFICANCE
              </div>
              <div style={{fontSize:16,color:"#e8deff",marginTop:10,lineHeight:1.5}}>
                Two questions. That's all the machine needs.
              </div>
            </div>
            <div>
              <div style={{fontSize:13,color:"#ffd700",marginBottom:12,fontFamily:"IBM Plex Mono,monospace",letterSpacing:1}}>
                01 — WHAT DO YOU CALL YOURSELF?
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {JOBS.map(j=>(
                  <button key={j} className={`bubble${job===j?" sj":""}`} onClick={()=>setJob(j)}>{j}</button>
                ))}
              </div>
              {job==="Other (specify)" && (
                <input value={customJob} onChange={e=>setCustomJob(e.target.value)}
                  placeholder="Describe your role in the cosmos..." maxLength={60}
                  style={{marginTop:12,width:"100%",padding:"13px 16px",borderRadius:10,border:"1px solid rgba(0,245,255,0.35)",background:"rgba(0,245,255,0.06)",color:"#e8deff",fontSize:15,fontFamily:"IBM Plex Mono,monospace",outline:"none"}}/>
              )}
            </div>
            <div>
              <div style={{fontSize:13,color:"#ffd700",marginBottom:4,fontFamily:"IBM Plex Mono,monospace",letterSpacing:1}}>
                02 — SELECT EVERYTHING YOU'RE PROUD OF
              </div>
              <div style={{fontSize:13,color:"#e8deff",opacity:0.75,marginBottom:12}}>
                Select as many as apply. The machine will use them appropriately.
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {PRIDE_OPTIONS.map(p=>(
                  <button key={p} className={`bubble${pride.includes(p)?" sp":""}`} onClick={()=>togglePride(p)}>{p}</button>
                ))}
              </div>
            </div>
            <button className="cta"
              onClick={()=>{ if(!canGo) return; setResult(null); setCardIn(false); setProcStep(0); setScreen("processing"); }}
              style={{
                border:canGo?"1px solid #ff006e":"1px solid rgba(232,222,255,0.15)",
                background:canGo?"linear-gradient(135deg,rgba(255,0,110,0.15),rgba(0,245,255,0.06))":"transparent",
                color:canGo?"#fff":"rgba(232,222,255,0.3)",
                boxShadow:canGo?"0 0 32px rgba(255,0,110,0.22)":"none",
                cursor:canGo?"pointer":"not-allowed",
              }}>
              {canGo?"Enter The Vortex →":"Select a role to continue"}
            </button>
          </div>
        )}

        {/* ── PROCESSING ──────────────────────────────────────────── */}
        {screen==="processing" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:36,padding:"48px 0"}}>
            <div style={{position:"relative",width:180,height:180,flexShrink:0}}>
              {[0,1,2,3,4,5].map(i=>(
                <div key={i} style={{
                  position:"absolute",top:i*14,left:i*14,right:i*14,bottom:i*14,
                  borderRadius:"50%",border:"1px solid",
                  borderColor:i%2===0?`rgba(0,245,255,${0.55-i*0.08})`:`rgba(255,0,110,${0.45-i*0.06})`,
                  animation:`${i%2===0?"spincw":"spinccw"} ${1.6+i*0.45}s linear infinite`,
                  boxShadow:i===0?"0 0 30px rgba(0,245,255,0.2)":"none",
                }}/>
              ))}
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:10,color:"#00f5ff",fontFamily:"IBM Plex Mono,monospace",letterSpacing:2,animation:"pulse 1s ease-in-out infinite"}}>PROCESSING</span>
              </div>
            </div>
            <div style={{width:"100%",minHeight:260}}>
              {PROCESSING_LINES.slice(0,procStep).map((line,i)=>(
                <div key={i} style={{fontFamily:"IBM Plex Mono,monospace",fontSize:15,lineHeight:2.3,color:i===procStep-1?"#00f5ff":"rgba(232,222,255,0.4)",animation:i===procStep-1?"fadeUp 0.3s ease":"none"}}>
                  <span style={{marginRight:10,opacity:0.6}}>{i===procStep-1?"▶":"✓"}</span>
                  {line}
                  {i===procStep-1&&<span style={{animation:"blink 0.7s step-end infinite",marginLeft:3}}>_</span>}
                </div>
              ))}
            </div>
            <div style={{fontSize:20,fontWeight:900,color:"#ff2222",letterSpacing:4,fontFamily:"IBM Plex Mono,monospace",animation:"redpulse 2.5s ease-in-out infinite"}}>
              DON'T PANIC
            </div>
          </div>
        )}

        {/* ── RESULT ──────────────────────────────────────────────── */}
        {screen==="result" && result && tc && (
          <div style={{flex:1,paddingTop:32,display:"flex",flexDirection:"column",gap:22,opacity:cardIn?1:0,transform:cardIn?"none":"translateY(20px) scale(0.97)",transition:"all 0.55s cubic-bezier(0.23,1,0.32,1)"}}>

            <div style={{textAlign:"center",paddingTop:8}}>
              <div style={{fontSize:60,lineHeight:1,marginBottom:6,filter:`drop-shadow(0 0 22px ${tc.glow})`,animation:result.tier==="rare"?"spincw 12s linear infinite":"pulse 4s ease-in-out infinite"}}>
                {tc.icon}
              </div>
              <div style={{fontSize:result.tier==="rare"?17:21,fontWeight:900,color:tc.color,lineHeight:1.2,textShadow:`0 0 24px ${tc.glow}`}}>
                {tc.headline}
              </div>
              <div style={{fontSize:15,color:"#e8deff",marginTop:8,fontFamily:"IBM Plex Mono,monospace",fontStyle:"italic",lineHeight:1.5}}>
                {tc.sub}
              </div>
            </div>

            {/* Story */}
            <div style={{border:`1px solid ${tc.color}33`,borderRadius:16,padding:"24px 20px",background:`linear-gradient(160deg,${tc.color}08,rgba(6,0,16,0.92))`,boxShadow:`0 0 48px ${tc.glow}`}}>
              {result.paragraphs.map((para,i)=>(
                <p key={i} style={{fontFamily:"IBM Plex Mono,monospace",fontSize:15,lineHeight:1.9,color:"#e8deff",marginBottom:i<result.paragraphs.length-1?18:0}}>
                  {para}
                </p>
              ))}
            </div>

            {/* Cosmic map */}
            <CosmicMap coord={result.coord} tierColor={tc.color}/>

            {/* Share nudge */}
            <div style={{textAlign:"center",border:"1px solid rgba(232,222,255,0.1)",borderRadius:14,padding:"18px 16px",background:"rgba(232,222,255,0.03)"}}>
              <div style={{fontSize:17,color:"#e8deff",lineHeight:1.6,marginBottom:6}}>
                Know someone who needs a perspective adjustment?
              </div>
              <div style={{fontSize:17,color:tc.color,fontWeight:700}}>
                Send them into the Vortex.
              </div>
            </div>

            {/* DON'T PANIC — pulsing red like landing */}
            <div style={{textAlign:"center",fontSize:26,fontWeight:900,color:"#ff2222",letterSpacing:4,fontFamily:"IBM Plex Mono,monospace",animation:"redpulse 2.5s ease-in-out infinite"}}>
              DON'T PANIC
            </div>

            {/* Buttons — Share first (big), then try again + download */}
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button className="cta"
                onClick={()=>{
                  const msg="Think you can survive the Total Perspective Vortex? Most beings don't make it out intact. Find out where you stand in the cosmos: https://total-perspective-vortex.vercel.app/";
                  navigator.clipboard?.writeText(msg);
                  setCopied(true);
                  setTimeout(()=>setCopied(false),3000);
                }}
                style={{
                  border:`1px solid ${copied?"#00f5ff":tc.color}`,
                  background:copied?"rgba(0,245,255,0.15)":`linear-gradient(135deg,${tc.color}22,rgba(0,245,255,0.08))`,
                  color:copied?"#00f5ff":tc.color,
                  boxShadow:copied?"0 0 28px rgba(0,245,255,0.3)":`0 0 28px ${tc.glow}`,
                  fontSize:16,
                  transition:"all 0.2s",
                }}>
                {copied?"✓ Link Copied!":"Share ↗"}
              </button>

              <div style={{display:"flex",gap:10}}>
                <button className="cta"
                  onClick={()=>{setJob(null);setCustomJob("");setPride([]);setResult(null);setCardIn(false);setCopied(false);setScreen("select");}}
                  style={{flex:1,border:"1px solid rgba(232,222,255,0.25)",background:"transparent",color:"#e8deff",fontSize:13,padding:"14px"}}>
                  Try Again
                </button>
                <button className="cta"
                  onClick={()=>downloadCard(result.tier,tc,result.paragraphs,result.coord)}
                  style={{flex:1,border:"1px solid rgba(232,222,255,0.25)",background:"transparent",color:"#e8deff",fontSize:13,padding:"14px"}}>
                  ↓ Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
